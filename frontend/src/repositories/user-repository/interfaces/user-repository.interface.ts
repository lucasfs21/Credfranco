import { IUser } from "../../../interfaces/user.interface";

export interface IUserRepository {
    getUsers(): Promise<Array<IUser>>
}