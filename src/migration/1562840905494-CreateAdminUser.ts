import { UserRole } from '../entity/database/user-role';
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { BaseUser } from '../entity/database/user';

export class CreateAdminUser1562840905494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user: BaseUser = new BaseUser();

        user.id = 1;
        user.email = 'ahtunget@gmail.com';
        user.password = 'donor'

        user.hashPassword();

        let userRole: UserRole = {
            userId: user.id,
            roleId: 'admin' 
        }

        const userRepository = getRepository(BaseUser);
        await userRepository.save(user);

        const userRoleRepository = getRepository(UserRole);
        await userRoleRepository.save(userRole);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
