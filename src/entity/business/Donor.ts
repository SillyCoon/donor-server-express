import { BaseUser } from '../database/user';
import { MaterialAidInfo } from './MaterialAidInfo';

export interface Donor extends BaseUser {
    firstName: string;
    lastName: string;
    patronymic?: string;
    phone: string;
    vk: string;
    hasWeight: boolean;
    hasCitizenship: boolean;
    hasBudget: boolean;
    hasRegistration: boolean;
    materialAid?: MaterialAidInfo
}