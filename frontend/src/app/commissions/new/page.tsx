import React from "react";
import WithAuthProtection from "../../../components/WithAuthProtection";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CommissionForm from "../../../components/CommissionForm";

export const metadata = {
    title: "Credfranco | Commissions New",
    description: "Aplicação teste prático para a Credfranco | New Commission",
};



const CommissionNew: React.FC = () => {
    return (
        <>
            <WithAuthProtection>
                <DefaultLayout>
                    <Breadcrumb pageName="New Commission" />
                    <div className="flex flex-col gap-10">
                        <CommissionForm action="new"/>
                    </div>
                </DefaultLayout>
            </WithAuthProtection>
        </>

    );
};


export default CommissionNew;