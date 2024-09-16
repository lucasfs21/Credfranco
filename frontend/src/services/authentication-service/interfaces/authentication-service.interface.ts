import { ILogin } from "../../../interfaces/login.interface";
import { ILoginParams } from "../../../repositories/authentication-repository/interfaces/login-params.interface";

export interface IAuthenticationService {
    login(params: ILoginParams): Promise<ILogin>
    logout(): Promise<any>
}