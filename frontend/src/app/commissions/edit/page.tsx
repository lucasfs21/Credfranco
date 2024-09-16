import React from "react";
import WithAuthProtection from "../../../components/WithAuthProtection";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CommissionForm from "../../../components/CommissionForm";

export const metadata = {
    title: "Credfranco | Commissions Edit",
    description: "Aplicação teste prático para a Credfranco | Edit Commission",
};



const CommissionEdit: React.FC = () => {
    return (
        <>
            <WithAuthProtection>
                <DefaultLayout>
                    <Breadcrumb pageName="Edit Commission" />
                    <div className="flex flex-col gap-10">
                        <CommissionForm action="edit"/>
                    </div>
                </DefaultLayout>
            </WithAuthProtection>
        </>

    );
};


export default CommissionEdit;