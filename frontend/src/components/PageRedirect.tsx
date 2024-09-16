'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from "@/components/common/Loader";
import { IUser } from '../interfaces/user.interface';
import { RolesEnum } from "../enums/roles-enum"


const PageRedirect = () => {
    const router = useRouter()
    const userJSON = localStorage.getItem("user") || ""
    const user: IUser | "" = JSON.parse(userJSON)

    useEffect(() => {
        if (user && user.role_id === RolesEnum.Financial) {
            router.push("/commissions")
        } else {
            router.push("/commissions-to-receive")
        }
    }, []);

    return <Loader />;
};

export default PageRedirect;
