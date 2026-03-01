import z from "zod"

const isProduction = process.env.NODE_ENV === "production"

const envSchema = z.object({
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.string().url(),
  FRONTEND_URL: isProduction
    ? z.string().url()
    : z.string().url().optional(),
})

export const env = envSchema.parse(process.env)