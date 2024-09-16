import { ICommission } from "../../../interfaces/commission.interface";
import { IGetCommissionsByMonth } from "./get-commissions-by-month.interface";
import { IDeleteCommission } from "./delete-commission.interface";
import { IUpdateCommission } from "./update-commission.interface";
import { ICreateCommission } from "./create-commission.interface";

export interface ICommissionService {
    getCommissionsByMonth(params: IGetCommissionsByMonth): Promise<Array<ICommission>>
    createCommission(params: ICreateCommission): Promise<void>
    updateCommission(params: IUpdateCommission): Promise<void>
    deleteCommission(params: IDeleteCommission): Promise<void>
    getCommissionsToReceive(): Promise<Array<ICommission>>
}