import { UserRole } from './../entity/database/user-role';
import { BaseUser } from './../entity/business/BUser';
import { Donorinfo } from './../entity/database/donorinfo';
import { User } from '../entity/database/user';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import config from "../config/config";
import { UserHelper } from '../helpers/user-helper';
import { Donor } from '../entity/business/Donor';
import { WellKnownRoles } from '../entity/business/WellKnownRoles';

class AuthController {

    // Только мейл и пароль для получения id и удобства дальнейшей работы
    static basicRegistration = async (req: Request, res: Response) => {
        const user = req.body as BaseUser;
        const userRepository = getRepository(User);

        const creatingUser: User = new User();
        creatingUser.email = user.email;
        creatingUser.password = user.password;
        creatingUser.hashPassword();

        try {
            await userRepository.save(creatingUser);
        }
        catch (error) {
            res.status(409).send('Email is already in use');
            return;
        }

        await userRepository.findOne({ where: { email: user.email }, select: ['email', 'id'] }).then(async (user) => {

            await getRepository(UserRole).save({ userId: user.id, roleId: WellKnownRoles.basic });

            const token = jwt.sign(
                { userId: user.id, username: user.email, roles: WellKnownRoles.basic },
                config.jwtSecret,
                { expiresIn: "7d" }
            );
            res.send(token);
        });
    }

    static registration = async (req: Request, res: Response) => {
        const donor: Donor = req.body as Donor;
        const token: any = jwt.decode(<string>req.headers.authorization.split(' ')[1]);

        const userId: number = +token['userId'];

        // Проверяем, зарегистрирован ли пользователь
        if (await getRepository(Donorinfo).findOne(userId)) {
            console.log(userId + ' are already registred');
            res.status(409).send('You are already registred');
            return;
        }

        // Добавляем информацию о доноре
        const donorInfo: Donorinfo = {
            id: {
                id: userId
            } as User,
            firstName: donor.firstName,
            lastName: donor.lastName,
            patronymic: donor.patronymic ? donor.patronymic : null,
            phone: donor.phone,
            vk: donor.vk,
            weightId: donor.hasWeight ? 1 : 0,
            citizenshipId: donor.hasCitizenship ? 1 : 0,
            registrationId: donor.hasRegistration ? 1 : 0
        }
        const donorRepository = getRepository(Donorinfo);

        await donorRepository.save(donorInfo);

        // Добавляем пользователю роли
        const rolesWithUserId: UserRole[] = UserHelper.getRolesFromDonorInfo(donor).map(role => {
            return {
                roleId: role,
                userId: userId
            } as UserRole
        });
        const userRoleRepository = getRepository(UserRole);
        await userRoleRepository.save(rolesWithUserId);

        // Удаляем роль basic, чтобы можно было получить доступ к остальному функционалу
        await userRoleRepository.delete({ userId: userId, roleId: WellKnownRoles.basic });
        res.send('Success!');
    }

    static login = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send();
        }
        //Get user from database
        const userRepository = getRepository(User);
        let user: any;
        try {
            user = await userRepository.createQueryBuilder('user')
                .leftJoinAndMapMany('user.roles', 'user.userRoles', "userRole")
                .select(['user.id', 'user.password', 'user.email', 'userRole.roleId'])
                .where('user.email = :email', { email })
                .getOne();
        } catch (error) {
            res.status(401).send();
        }

        if (!user) {
            res.status(404).send();
            return;
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }
        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.email, roles: UserHelper.rolesToArrayOfRoleIds(user.roles) },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        //Send the jwt in the response
        res.send(token);
    };

    static changePassword = async (req: Request, res: Response) => {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        //Get user from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send();
            return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        //Hash the new password and save
        user.hashPassword();
        userRepository.save(user);

        res.status(204).send();
    };
}
export default AuthController;