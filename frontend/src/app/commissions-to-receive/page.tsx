import React from "react";
import WithAuthProtection from "../../components/WithAuthProtection"
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import CommissionToReceiveComponent from "../../components/CommissionsToReceive";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata = {
    title: "Credfranco | Commissions To Receive",
    description: "Aplicação teste prático para a Credfranco | Commissions To Receive",
};

const ComissionsToReceive: React.FC = () => {
    return (
        <WithAuthProtection>
            <DefaultLayout>
                <Breadcrumb pageName="Commissions To Receive" />
                    <CommissionToReceiveComponent />
            </DefaultLayout>
        </WithAuthProtection>
    );
};

export default ComissionsToReceive;
