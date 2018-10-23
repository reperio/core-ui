import User from "./user";
import Role from "./role";

export default class UserRole {
    userId: string;
    roleId: string;
    user: User;
    role: Role;
}