import { AuthenticationRepository } from "../../repositories/authentication-repository";
import { ILoginParams } from "./interfaces/login-params.interface";
import { ILogin } from "../../interfaces/login.interface";
import { IAuthenticationService } from "./interfaces/authentication-service.interface";

export class AuthenticationService implements IAuthenticationService {
    private _authenticationRepositoryInstance: AuthenticationRepository

    constructor() {
        this._authenticationRepositoryInstance = new AuthenticationRepository()
    }

    public async login(params: ILoginParams): Promise<ILogin> {
        const data = await this._authenticationRepositoryInstance.login(params)

        return data
    }

    public async logout(): Promise<any> {
        await this._authenticationRepositoryInstance.logout()
    }
}