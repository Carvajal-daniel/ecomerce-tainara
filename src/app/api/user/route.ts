// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, phone, cpf, cep, rua, bairro, cidade, uf, numero } = body;

    if (!id) return NextResponse.json({ error: "ID do usuário obrigatório" }, { status: 400 });

    const [updatedUser] = await db
      .update(user)
      .set({ name, email, phone, cpf, cep, rua, bairro, cidade, uf, numero, updatedAt: new Date() })
      .where(eq(user.id, id))
      .returning();

    if (!updatedUser) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

