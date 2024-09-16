import { IUser } from "../../../interfaces/user.interface";

export interface IUserService {
    getUsers(): Promise<Array<IUser>>
}