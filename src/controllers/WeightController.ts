import { getRepository } from 'typeorm';
import { Request, Response } from 'express-serve-static-core';

export class BasicRoleOptionsController {

    private repositoryType: string;

    constructor(type: string) {
        this.repositoryType = type;
    }

    public async getOptions(req: Request, res: Response) {
        const optionsRepository = getRepository(this.repositoryType);
        const options = optionsRepository.find({ select: ['id', 'text'] });
        res.send(options);
    }

}