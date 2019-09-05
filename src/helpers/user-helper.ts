import { WellKnownRoles } from './../entity/business/WellKnownRoles';
import { Donor } from '../entity/business/Donor';

export class UserHelper {
    public static rolesToArrayOfRoleIds(roles: [any]) {
        return roles.map(role => role.roleId);
    }

    public static getRolesFromDonorInfo(donorInfo: Donor) {
        let roles: string[] = [];

        donorInfo.hasWeight ? roles.push(WellKnownRoles.weight.toString()) : null;
        donorInfo.hasBudget ? roles.push(WellKnownRoles.budget.toString()) : null;
        donorInfo.hasCitizenship ? roles.push(WellKnownRoles.citizen.toString()) : null;
        donorInfo.hasRegistration ? roles.push(WellKnownRoles.resident.toString()) : null;
        return roles;
    }
}