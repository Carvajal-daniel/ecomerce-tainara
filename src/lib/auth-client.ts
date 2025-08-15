import "dotenv/config"

import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "https://ecomercetainara.vercel.app//api/auth",
})