import { createClient } from "@insforge/sdk";

export const insforge = createClient({
  baseUrl:
    process.env.NEXT_PUBLIC_INSFORGE_URL ||
    "https://pb53sx3y.ap-southeast.insforge.app",
  anonKey:
    process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
    "ik_85539105179cf8cea3aa07af2d7806b0",
});
