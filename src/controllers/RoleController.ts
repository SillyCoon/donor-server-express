import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { role } from '../entity/db-first/role';
import { validate } from 'class-validator';

export default class RoleController {

    static getRoles = async (req: Request, res: Response) => {
        const roleRepository = getRepository(role);
        const roles = await roleRepository.find({
            select: ["id", "description"]
        });

        res.send(roles);
    };

    static async addRole(req: Request, res: Response) {
        const roleRepository = getRepository(role);

        let newRole: role = { ...req.body }
        roleRepository.insert(newRole);

        const errors = await validate(role);

        if (!errors.length) {
            res.status(400).send(errors);
        }
        else {
            res.send(newRole);
        }

    }

}