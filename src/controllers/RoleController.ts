import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { Role } from '../entity/database/role';
import { validate } from 'class-validator';
import { container } from '../inversify.config';
import { IUserContext } from '../services/abstract/IUserContext';
import { TYPES } from '../services/types';

export default class RoleController {

    static getRoles = async (req: Request, res: Response) => {

        const userContext = container.get<IUserContext>(TYPES.UserContext);

        userContext.getUserId();
        const roleRepository = getRepository(Role);
        const roles = await roleRepository.find({
            select: ["id", "description"]
        });
        
        res.send(roles);
    };

    static async addRole(req: Request, res: Response) {
        const roleRepository = getRepository(Role);

        let newRole: Role = { ...req.body }
        roleRepository.insert(newRole);

        const errors = await validate(Role);

        if (!errors.length) {
            res.status(400).send(errors);
        }
        else {
            res.send(newRole);
        }

    }

}