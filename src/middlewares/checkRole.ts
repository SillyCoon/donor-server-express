import { User } from '../entity/database/user';
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { UserHelper } from '../helpers/user-helper';

export const checkRole = (neededRoles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;

        //Get user role from the database
        const userRepository = getRepository(User);
        let user: any;
        try {
            user = await userRepository.createQueryBuilder('user')
                .leftJoinAndMapMany('user.roles', 'user.userRoles', "userRole")
                .select(['user.id', 'user.email', 'userRole.roleId'])
                .where('user.id = :id', { id })
                .getOne()
        } catch (id) {
            res.status(401).send();
        }

        const userRoles = UserHelper.rolesToArrayOfRoleIds(user.roles);
        //Check if array of authorized roles includes the user's role
        if (neededRoles.find(neededRole => userRoles.includes(neededRole))) {
            next();
        }
        else res.status(401).send();
    };
};