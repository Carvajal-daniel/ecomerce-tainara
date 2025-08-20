import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Segredo para segurança
  const secret = "mYP3stdvPP2V4uq9aAnXJrwYoc5CJgp6";
  if (req.query.secret !== secret) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Revalida a página Home
    await res.revalidate("/"); 
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao revalidar" });
  }
}
