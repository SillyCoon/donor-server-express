import { IUserContext } from '../abstract/IUserContext';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class UserContextService implements IUserContext {
    getUserId(): string {
        console.log('Test');
        return 'kek';
    }
}