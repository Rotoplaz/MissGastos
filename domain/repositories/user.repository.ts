import { User } from "../entities/user.entity";


export interface UserRepository {
    getUser(): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: Partial<User>): Promise<User>;
}