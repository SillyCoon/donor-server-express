import { WellKnownRolesOptions, OptionEntityMap } from './../entity/business/WellKnownRolesOptions';
import { Registration } from './../entity/database/registration';
import { Citizenship } from './../entity/database/citizenship';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express-serve-static-core';
import { Weight } from '../entity/database/weight';

class BasicRoleOptionsController {

    /**
     * Возвращает текстовые поля в зависимости от переданного условия:
     * weight,
     * citizen,
     * resident
     * для ролей, которые выбираются при регистрации
     * @param req - текстовое описание опции
     * @param res 
     */
    public static async getOptions(req: Request, res: Response) {
        
        let repositoryType = OptionEntityMap.get(req.params.role as WellKnownRolesOptions);
        if (!repositoryType) {
            res.status(404).send('No such option');
            return;
        }

        const optionsRepository = getRepository(repositoryType);
        const options = await optionsRepository.find({ select: ['id', 'text'] });
        res.send(options);
    }

    /**
     * Возвращает текстовые поля для донорской информации при регистрации (вес, гражданство, регистрация в СПб, мб потом еще какие)
     * @param req 
     * @param res 
     */
    public static async getRegistrationOptions(req: Request, res: Response) {
        let result = {};

        for (var [option, entity] of OptionEntityMap.entries()) {
            const repository = getRepository(entity);
            const options = await repository.find({ select: ['id', 'text'] });
            result[option] = options;
        }
        res.send(result);
    }

}

export default BasicRoleOptionsController;