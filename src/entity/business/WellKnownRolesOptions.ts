import { Citizenship } from './../database/citizenship';
import { Weight } from './../database/weight';
import { Registration } from '../database/registration';

export enum WellKnownRolesOptions {
    citizen = 'citizen',
    weight = 'weight',
    resident = 'resident'
}

export const OptionEntityMap: Map<WellKnownRolesOptions, any> = new Map([
    [WellKnownRolesOptions.weight, Weight],
    [WellKnownRolesOptions.citizen, Citizenship],
    [WellKnownRolesOptions.resident, Registration]
]);