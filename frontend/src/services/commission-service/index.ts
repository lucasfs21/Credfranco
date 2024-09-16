import { ICommission } from "../../interfaces/commission.interface";
import { CommissionRepository } from "../../repositories/commission-repository";
import { ICommissionService } from "./interfaces/commission-service.interface";
import { IGetCommissionsByMonth } from "./interfaces/get-commissions-by-month.interface";
import { IDeleteCommission } from "./interfaces/delete-commission.interface";
import { IUpdateCommission } from "./interfaces/update-commission.interface";
import { ICreateCommission } from "./interfaces/create-commission.interface";

export class CommissionService implements ICommissionService {
    private _commissionRepositoryInstance: CommissionRepository

    constructor() {
        this._commissionRepositoryInstance = new CommissionRepository()
    }

    public async getCommissionsByMonth(params: IGetCommissionsByMonth): Promise<Array<ICommission>> {
        const data = await this._commissionRepositoryInstance.getCommissionsByMonth(params)

        return data
    }

    public async createCommission(params: ICreateCommission): Promise<void> {
        await this._commissionRepositoryInstance.createCommission(params)
    }

    public async updateCommission(params: IUpdateCommission): Promise<void> {
        await this._commissionRepositoryInstance.updateCommission(params)
    }

    public async deleteCommission(params: IDeleteCommission): Promise<void> {
        console.log("To no service")
        await this._commissionRepositoryInstance.deleteCommission(params)
    }

    public async getCommissionsToReceive(): Promise<Array<ICommission>> {
        const data = await this._commissionRepositoryInstance.getCommissionsToReceive()

        return data
    }
}