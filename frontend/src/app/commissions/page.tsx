import React from "react";
import WithAuthProtection from "../../components/WithAuthProtection"
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Commission from "../../components/Commissions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


export const metadata = {
    title: "Credfranco | Commissions",
    description: "Aplicação teste prático para a Credfranco | Commissions",
};

const ComissionsToReceive: React.FC = () => {
    return (
        <WithAuthProtection>
            <DefaultLayout>
                <Breadcrumb pageName="Commissions" />
                <div className="flex flex-col gap-10">
                    <Commission />
                </div>
            </DefaultLayout>
        </WithAuthProtection>
    );
};

export default ComissionsToReceive;
