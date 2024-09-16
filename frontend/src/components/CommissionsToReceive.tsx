"use client"
import { useEffect, useState } from "react";
import { CommissionService } from "../services/commission-service"
import ChartOne from "./Charts/ChartOne";
import Loader from "./common/Loader";

const CommissionToReceiveComponent = () => {
    const [commissions, setCommissions] = useState<Array<number> | []>([]);

    const getCommisionsToReceive = async () => {
        const commissionServiceInstance = new CommissionService();

        try {
            const response = await commissionServiceInstance.getCommissionsToReceive();

            if (response.length) {
                let updatedCommissions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

                response.map((commission) => {
                    updatedCommissions[commission.reference_month - 1] = Number(commission.commission_value)
                })

                setCommissions(updatedCommissions)
            }

        } catch (error) {
            console.error("Erro:", error);
        }
    };

    useEffect(() => {
        getCommisionsToReceive();
    }, []);

    if (!commissions.length) {
        return (<Loader />)
    }

    return (
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

            <ChartOne data={commissions} />
        </div >
    );

};

export default CommissionToReceiveComponent;
