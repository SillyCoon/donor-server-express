export class UserHelper {
    public static rolesToArrayOfRoleIds(roles: [any]) {
        return roles.map(role => role.roleId);
    }
}