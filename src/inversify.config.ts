import { UserContextService } from './services/concrete/UserContextService';
import { Container } from 'inversify';
import { TYPES } from './services/types';
import { IUserContext } from './services/abstract/IUserContext';

const container = new Container();

container.bind<IUserContext>(TYPES.UserContext).to(UserContextService);

export { container };