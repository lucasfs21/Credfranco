"use client"
import { useEffect, useState } from "react";
import { CommissionService } from "../services/commission-service"
import TableThree from "../components/Tables/TableThree";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ICommission } from "../interfaces/commission.interface";
import Loader from "@/components/common/Loader";
import { useRouter } from 'next/navigation';

const Commission = () => {
    const router = useRouter();

    const [commissions, setCommissions] = useState<Array<ICommission> | []>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const [selectedMonth, setSelectedMonth] = useState<number | "">("");
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const changeTextColor = () => {
        setIsOptionSelected(true);
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

    const getCurrentMonth = (): number => {
        const now = new Date();
        return now.getMonth() + 1;
    };

    const sortByTotalSales = (data: Array<ICommission>) => {
        return data.sort((a, b) => parseFloat(b.total_sales) - parseFloat(a.total_sales));
    };

    const handleSelectedMonth = async (referenceMonth: number | "") => {
        setSelectedMonth(referenceMonth);
        changeTextColor();
        await getCommissionsByMonth(referenceMonth);
    }

    const getCommissionsByMonth = async (referenceMonth: number | "") => {
        if (referenceMonth) {
            try {
                setLoading(true)
                const commissionServiceInstance = new CommissionService()
                const data = await commissionServiceInstance.getCommissionsByMonth({ referenceMonth })

                if (data) {
                    setCommissions(sortByTotalSales(data))
                    setLoading(false)
                }
            } catch (error) {
                console.error("Erro:", error);
            }
        }
    }


    const handleDeleteCommission = async (commission: ICommission) => {
        await deleteCommission(commission.id);
        await getCommissionsByMonth(selectedMonth);
    }

    const deleteCommission = async (id: number) => {
        try {
            setLoading(true)
            const commissionServiceInstance = new CommissionService()
            await commissionServiceInstance.deleteCommission({ id })
            setLoading(false)
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    const handleEditCommission = (commission: ICommission) => {
        localStorage.removeItem("editCommission")
        localStorage.setItem("editCommission", JSON.stringify(commission))

        router.push("/commissions/edit")
    }

    useEffect(() => {
        handleSelectedMonth(getCurrentMonth());
    }, []);

    if (loading) {
        return (<Loader />)
    }
    return (
        <>
            <div className="flex flex-wrap justify-end">
                <Link
                    href="/commissions/new"
                    className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Add Commission
                </Link>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Filters
                    </h3>
                </div>
                <div className="flex flex-col grid grid-cols-12 gap-5.5 p-6.5">
                    <div className="col-span-6">
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
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
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
                </div>
            </div >
            <TableThree data={commissions} onDelete={handleDeleteCommission} OnEdit={handleEditCommission} />
        </>
    );

};

export default Commission;
