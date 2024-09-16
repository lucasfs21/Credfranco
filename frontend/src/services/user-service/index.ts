import { IUser } from "../../interfaces/user.interface"
import { UserRepository } from "../../repositories/user-repository";
import { IUserService } from "./interfaces/user-service.interface"

export class UserService implements IUserService {
    private _userRepositoryInstance: UserRepository

    constructor() {
        this._userRepositoryInstance = new UserRepository()
    }

    public async getUsers(): Promise<Array<IUser>> {
        const data = await this._userRepositoryInstance.getUsers();

        return data
    }
}