import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MeusDados from "./MeusDados";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function PaginaDePerfilServer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex items-center justify-center p-8 md:p-12 bg-gray-50">
        <p className="text-gray-600 text-center">Nenhum dado pessoal disponível</p>
      </div>
    );
  }

  const personalData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!personalData) {
    return (
      <div className="flex items-center justify-center p-8 md:p-12 bg-gray-50">
        <p className="text-gray-600 text-center">Nenhum dado pessoal disponível</p>
      </div>
    );
  }

  return (
    <MeusDados
      data={{
        id: personalData.id,
        name: personalData.name,
        email: personalData.email,
        cep: personalData.cep ?? undefined,
        rua: personalData.rua ?? undefined,
        bairro: personalData.bairro ?? undefined,
        cidade: personalData.cidade ?? undefined,
        uf: personalData.uf ?? undefined,
        phone: personalData.phone ?? undefined,
        cpf: personalData.cpf ?? undefined,
      }}
    />
  );
}
