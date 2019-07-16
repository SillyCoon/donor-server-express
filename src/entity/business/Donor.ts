import { User } from '../database/user';
import { MaterialAidInfo } from './MaterialAidInfo';

export interface Donor extends User {
    firstName: string;
    lastName: string;
    patronymic?: string;
    password: string;
    phone: string;
    vk: string;
    hasWeight: boolean;
    hasCitizenship: boolean;
    hasBudget: boolean;
    hasRegistration: boolean;
    materialAid?: MaterialAidInfo
}