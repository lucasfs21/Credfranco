import React from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import SignInForm from "@/components/SigninForm";
import WithoutAuthProtection from "../../../components/WithoutAuthProtection"

export const metadata = {
  title: "Credfranco | Signin",
  description: "Aplicação teste prático para a Credfranco | Signin",
};

const SignIn: React.FC = () => {
  return (
    <WithoutAuthProtection>
      <div className="flex">
        <div className="relative flex flex-1 flex-col">
          <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
              <div className="flex items-center gap-3 2xsm:gap-7">
                <ul className="flex items-center gap-2 2xsm:gap-4">
                  <DarkModeSwitcher />
                </ul>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Breadcrumb pageName="Sign In" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-wrap items-center">
                <div className="hidden w-full xl:block xl:w-1/2">
                  <div className="px-26 py-17.5 text-center">
                    <span className="mb-5.5 inline-block">
                      <Image
                        className="dark:block"
                        src={"/images/logo/credfranco2.png"}
                        alt="Logo"
                        width={180}
                        height={52}
                      />
                    </span>
                    <p className="2xl:px-20">
                      A Melhor Promotora de Crédito do Brasil
                    </p>
                    <span className="mt-5 inline-block">
                      <Image
                        src={"/images/logo/credfranco.png"}
                        alt="profile cover"
                        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                        width={970}
                        height={260}
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </span>
                  </div>
                </div>

                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                  <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                      Faça o login na Credfranco
                    </h2>
                    <SignInForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithoutAuthProtection>
  );
};

export default SignIn;
