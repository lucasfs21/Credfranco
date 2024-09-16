export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log("Token encontrado:", token); // Verifique se o token está sendo retornado
    return !!token;
};
