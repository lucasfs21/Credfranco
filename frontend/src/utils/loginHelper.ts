import { AuthenticationService } from '../services/authentication-service';

export async function loginUser(email: string, password: string) {
    const authenticationServiceInstance = new AuthenticationService();

    try {
        const response = await authenticationServiceInstance.login({
            email,
            password,
        });
        return { success: true, data: response };
    } catch (error: any) {
        console.error('Erro ao fazer login:', error);
        return { success: false, error: error.message };
    }
}
