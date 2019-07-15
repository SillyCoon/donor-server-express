import { WellKnownRoles } from './../entity/business/WellKnownRoles';
import { Donor } from '../entity/business/Donor';

export class UserHelper {
    public static rolesToArrayOfRoleIds(roles: [any]) {
        return roles.map(role => role.roleId);
    }

    public static getRolesFromDonorInfo(donorInfo: Donor) {
        let roles: WellKnownRoles[];
        
        donorInfo.hasWeight ? roles.push(WellKnownRoles.weight) : null;
        donorInfo.hasBudget ? roles.push(WellKnownRoles.budget): null; // etc
    }
}