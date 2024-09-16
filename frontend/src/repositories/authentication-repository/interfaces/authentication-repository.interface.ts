import { ILogin } from "../../../interfaces/login.interface";
import { ILoginParams } from "./login-params.interface";

export interface IAuthenticationRepository {
    login(params: ILoginParams): Promise<ILogin>
    logout(): Promise<any>
}