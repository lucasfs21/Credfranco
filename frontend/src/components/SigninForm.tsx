"use client";

import React, { useState } from "react";
import { AuthenticationService } from "@/services/authentication-service";
import { useRouter } from 'next/navigation';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const authenticationServiceInstance = new AuthenticationService();

    try {
      const response = await authenticationServiceInstance.login({ email, password });
      if (response.token && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user))
        localStorage.setItem("token", JSON.stringify(response.token))
        router.push('/')
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Senha
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
      <div className="mb-5">
        <input
          type="submit"
          value="Sign In"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
      </div>
    </form>
  );
};

export default SignInForm;
