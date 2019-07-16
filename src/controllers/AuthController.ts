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

class AuthController {

    // Только мейл и пароль для получения id и удобства дальнейшей работы
    static basicRegistration = async (req: Request, res: Response) => {
        const user = req.body as BaseUser;
        const userRepository = getRepository(User);

        const creatingUser: User = new User();
        creatingUser.email = user.email;
        creatingUser.password = user.password;
        creatingUser.hashPassword();

        try{
            await userRepository.save(creatingUser);
        }
        catch (error) {
            res.status(409).send('Email is already in use');
        }

        const token = jwt.sign(
            { userId: user.id, username: user.email, roles: [] },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        //Send the jwt in the response
        res.send(token);
    }

    static registration = async (req: Request, res: Response) => {
        let donor: Donor = req.body as Donor;
        const donorRepository = getRepository(Donorinfo);

        // Добавляем информацию о доноре
        const donorInfo: Donorinfo = {
            firstName: donor.firstName,
            lastName: donor.lastName,
            patronymic: donor.patronymic ? donor.patronymic : null,
            phone: donor.phone,
            vk: donor.vk,
            weightId: donor.hasWeight ? 1 : 0,
            citizenshipId: donor.hasCitizenship ? 1 : 0,
            registrationId: donor.hasRegistration ? 1 : 0
        }

        // Добавляем пользователя и его роли
        const user: User = new User();

        user.password = donor.password;
        user.email = donor.email;
        const roles = UserHelper.getRolesFromDonorInfo(donor); 


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

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }

        console.log({ userId: user.id, username: user.email, roles: UserHelper.rolesToArrayOfRoleIds(user.roles) });
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