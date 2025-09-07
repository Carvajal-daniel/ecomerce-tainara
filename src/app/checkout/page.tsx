import CheckoutItems from "@/components/common/Checkout/checkout";
import HeaderWrapper from "@/components/common/header/HeaderWrapper";
import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
// Agrega esta línea
import { redirect } from "next/navigation";

const Index = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if(!session){
    redirect("/authentication")
  }



  const addres = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!addres) {
    return (
      <div className="flex items-center justify-center p-8 md:p-12 bg-gray-50">
        <p className="text-gray-600 text-center">Nenhum endereço disponível</p>
      </div>
    );
  }

  const userLoggedIn = !!session;

  return (
    <>
      <HeaderWrapper />
      <div className="min-h-screen px-3 md:px-0 pt-3">
        <CheckoutItems UserAddress={addres}  />
      </div>
    </>
  );
};

export default Index;
