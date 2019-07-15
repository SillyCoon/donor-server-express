import { BaseUser } from '../entity/database/user';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import config from "../config/config";
import { UserHelper } from '../helpers/user-helper';
import { Donor } from '../entity/business/Donor';

class AuthController {

    static registration = async(req: Request, res: Response) => {
        let donor: Donor = req.body as Donor;

        
    }

    static login = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send();
        }
        //Get user from database
        const userRepository = getRepository(BaseUser);
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
        const userRepository = getRepository(BaseUser);
        let user: BaseUser;
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