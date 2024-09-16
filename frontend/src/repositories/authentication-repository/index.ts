import { AxiosResponse } from "axios";
import { ILogin } from "../../interfaces/login.interface";
import APIRepository from "../api-repository";
import { IAuthenticationRepository } from "./interfaces/authentication-repository.interface";
import { ILoginParams } from "./interfaces/login-params.interface";


enum ENDPOINTS {
    LOGIN = "/login",
    LOGOUT = "/logout"
}
export class AuthenticationRepository
    extends APIRepository
    implements IAuthenticationRepository {

    public async login(params: ILoginParams): Promise<ILogin> {
        const response: AxiosResponse<ILogin> = await this.post<ILogin>(ENDPOINTS.LOGIN, params)
        const login: ILogin = response.data

        return login
    }

    public async logout(): Promise<any> {
        await this.post(ENDPOINTS.LOGOUT)
    }
}