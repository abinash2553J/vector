import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

export const createInsforgeServer = async () => {
  const cookieStore = await cookies();
  return createServerClient({
    baseUrl:
      process.env.NEXT_PUBLIC_INSFORGE_URL ||
      "https://pb53sx3y.ap-southeast.insforge.app",
    anonKey:
      process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
      "ik_85539105179cf8cea3aa07af2d7806b0",
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
    },
  });
};
