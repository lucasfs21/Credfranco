export interface ICommission {
    id: number,
    user_id: number,
    total_sales: string,
    commission_percentage: string,
    commission_value: string,
    reference_month: number,
    user: {
        id: number,
        name: string,
        email: string,
        role_id: number,
    }
}