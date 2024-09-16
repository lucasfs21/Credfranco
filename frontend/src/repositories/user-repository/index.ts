import { AxiosResponse } from "axios";
import APIRepository from "../api-repository";
import { IUserRepository } from "./interfaces/user-repository.interface";
import { IUser } from "../../interfaces/user.interface";


enum ENDPOINTS {
    COMMERCIAL_USERS = "/users/commercial",
}

export class UserRepository
    extends APIRepository
    implements IUserRepository {


    public async getUsers(): Promise<Array<IUser>> {
        const response: AxiosResponse<Array<IUser>> = await this.get<Array<IUser>>(ENDPOINTS.COMMERCIAL_USERS)
        const users: Array<IUser> = response.data

        return users
    }
}