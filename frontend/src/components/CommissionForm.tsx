"use client"

import React, { useEffect, useState } from "react";
import { ICommission } from "../interfaces/commission.interface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { UserService } from "../services/user-service";
import { CommissionService } from "../services/commission-service";
import { IUser } from "../interfaces/user.interface";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface CommissionFormProps {
    action: "new" | "edit"
}
const CommissionForm: React.FC<CommissionFormProps> = (props) => {
    const router = useRouter();

    const { action } = props

    const [commission, setCommission] = useState<ICommission | undefined>(undefined);
    const [selectedMonth, setSelectedMonth] = useState<number | "">("");
    const [selectedEmployee, setSelectedEmployee] = useState<number | "">("");
    const [totalSales, setTotalSales] = useState<number>(0);
    const [employees, setEmployees] = useState<Array<IUser> | []>([]);

    const [isEmployeeOptionSelected, setIsEmployeeOptionSelected] = useState<boolean>(false);
    const [isMonthOptionSelected, setIsMonthOptionSelected] = useState<boolean>(false);

    const changeEmployeeTextColor = () => {
        setIsEmployeeOptionSelected(true);
    };

    const changeMonthTextColor = () => {
        setIsMonthOptionSelected(true);
    };



    const months = [
        { label: "JAN", value: 1 },
        { label: "FEB", value: 2 },
        { label: "MAR", value: 3 },
        { label: "APR", value: 4 },
        { label: "MAY", value: 5 },
        { label: "JUN", value: 6 },
        { label: "JUL", value: 7 },
        { label: "AUG", value: 8 },
        { label: "SEP", value: 9 },
        { label: "OCT", value: 10 },
        { label: "NOV", value: 11 },
        { label: "DEC", value: 12 }
    ];

    const handleSelectedEmployee = (employee: number | "") => {
        setSelectedEmployee(employee);
        changeEmployeeTextColor();
    }

    const handleSelectedMonth = async (referenceMonth: number | "") => {
        setSelectedMonth(referenceMonth);
        changeMonthTextColor();
    }

    const handleGetEmployee = async () => {
        const data = await getUsers()

        if (data) {
            setEmployees(data)
        }
    }

    const getUsers = async () => {
        try {
            const userServiceInstance = new UserService()
            const data = userServiceInstance.getUsers()

            return data
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    const handleCommission = async () => {
        console.log(selectedEmployee)
        console.log(selectedMonth)
        console.log(totalSales)

        if (selectedEmployee && selectedMonth && totalSales) {
            const commissionServiceInstance = new CommissionService()

            if (action === "new") {
                await commissionServiceInstance.createCommission({ user_id: selectedEmployee, total_sales: totalSales, reference_month: selectedMonth })
            } else if (commission) {
                await commissionServiceInstance.updateCommission({ id: commission.id, user_id: commission.user_id, total_sales: totalSales, reference_month: selectedMonth })
                localStorage.removeItem("editCommission")
            }

            router.push('/commissions')
        }
    }

    useEffect(() => {
        handleGetEmployee();
        if (action === "edit") {
            const parsedCommission: ICommission = JSON.parse(localStorage.getItem("editCommission")!);
            setCommission(parsedCommission);
            handleSelectedMonth(parsedCommission.reference_month);
            handleSelectedEmployee(parsedCommission.user.id);
            setTotalSales(Number(parsedCommission.total_sales));
        }
    }, []);

    if (!employees.length) {
        return (<Loader />)
    }

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Commission
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Select Employee
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                                <FontAwesomeIcon icon={faPerson} />
                            </span>
                            <select
                                value={selectedEmployee}
                                onChange={(e) => {
                                    handleSelectedEmployee(Number(e.target.value))
                                }}
                                disabled={action === "edit"}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isEmployeeOptionSelected ? "text-black dark:text-white" : ""
                                    }`}
                            >
                                <option value="" disabled className="text-body dark:text-bodydark">
                                    Select Employee
                                </option>
                                {employees.map((employee: IUser) => (
                                    <option key={employee.id} value={employee.id} className="text-body dark:text-bodydark">
                                        {employee.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Select Month
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </span>
                            <select
                                value={selectedMonth}
                                onChange={(e) => {
                                    handleSelectedMonth(Number(e.target.value))
                                }}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isMonthOptionSelected ? "text-black dark:text-white" : ""
                                    }`}
                            >
                                <option value="" disabled className="text-body dark:text-bodydark">
                                    Select Month
                                </option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value} className="text-body dark:text-bodydark">
                                        {month.label}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Total Sales
                        </label>
                        <input
                            type="number"
                            placeholder="Total Sales"
                            value={totalSales}
                            onChange={(e) => { setTotalSales(Number(e.target.value)) }}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="flex justify-end py-4 px-4" onClick={handleCommission}>
                    <Link
                        href="#"
                        className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        {action === "new" ? "Criar" : "Salvar"}
                    </Link>
                </div>

            </div>
        </>
    );

};

export default CommissionForm;