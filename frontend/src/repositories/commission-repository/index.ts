import { AxiosResponse } from "axios";
import APIRepository from "../api-repository";
import { ICommissionRepository } from "./interfaces/commission-repository.interface";
import { IGetCommissionsByMonth } from "./interfaces/get-commissions-by-month.interface";
import { ICommission } from "../../interfaces/commission.interface";
import { ICreateCommission } from "./interfaces/create-commission.interface";
import { IDeleteCommission } from "./interfaces/delete-commission.interface";
import { IUpdateCommission } from "./interfaces/update-commission.interface";


enum ENDPOINTS {
    COMMISSIONS = "/commissions",
    COMMISSIONS_TO_RECEIVE = "/commissions-to-receive"
}
export class CommissionRepository
    extends APIRepository
    implements ICommissionRepository {

    public async getCommissionsByMonth(params: IGetCommissionsByMonth): Promise<Array<ICommission>> {
        const response: AxiosResponse<Array<ICommission>> = await this.get<Array<ICommission>>(ENDPOINTS.COMMISSIONS, { params })
        const commissions: Array<ICommission> = response.data

        return commissions
    }

    public async createCommission(params: ICreateCommission): Promise<void> {
        await this.post(ENDPOINTS.COMMISSIONS, params)
    }

    public async updateCommission(params: IUpdateCommission): Promise<void> {
        const { id, user_id, total_sales, reference_month } = params
        await this.put(`${ENDPOINTS.COMMISSIONS}/${id}`, { user_id, total_sales, reference_month })
    }

    public async deleteCommission(params: IDeleteCommission): Promise<void> {
        const { id } = params
        await this.delete(`${ENDPOINTS.COMMISSIONS}/${id}`)
    }

    public async getCommissionsToReceive(): Promise<Array<ICommission>> {
        const response: AxiosResponse<Array<ICommission>> = await this.get<Array<ICommission>>(ENDPOINTS.COMMISSIONS_TO_RECEIVE)
        const commissions: Array<ICommission> = response.data

        return commissions
    }
}