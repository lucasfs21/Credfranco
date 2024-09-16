import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WithAuthProtection from "@/components/WithAuthProtection";
import PageRedirect from "@/components/PageRedirect";

export const metadata: Metadata = {
  title: "Credfranco",
  description: "Aplicação teste prático para a Credfranco",
};

export default function Home() {
  return (
    <WithAuthProtection>
      <DefaultLayout>
        <PageRedirect />
      </DefaultLayout>
    </WithAuthProtection>
  );
}
