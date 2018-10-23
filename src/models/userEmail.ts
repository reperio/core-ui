import User from "./user";

export default class UserEmail {
    id: string;
    userId: string;
    user: User;
    email: string;
    emailVerified: boolean;
    deleted: boolean;
    primary: boolean;
}