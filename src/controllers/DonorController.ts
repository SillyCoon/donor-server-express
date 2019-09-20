import { Donorinfo } from './../entity/database/donorinfo';
import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { Role } from '../entity/database/role';
import { validate } from 'class-validator';

export default class DonorController {


    static async getMyself(req: Request, res: Response) {
        const donorInfoRepository = getRepository(Donorinfo);

        const errors = await validate(Role);

        if (!errors.length) {
            res.status(400).send(errors);
        }

    }

}