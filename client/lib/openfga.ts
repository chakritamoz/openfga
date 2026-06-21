import { CredentialsMethod, OpenFgaClient } from "@openfga/sdk";

export const openFga = new OpenFgaClient({
  apiUrl: process.env.FGA_API_URL ?? "http://localhost:8080",
  storeId: process.env.FGA_STORE_ID,
  authorizationModelId: process.env.FGA_MODEL_ID,
  credentials: process.env.FGA_API_TOKEN
    ? {
        method: CredentialsMethod.ApiToken,
        config: { token: process.env.FGA_API_TOKEN },
      }
    : undefined,
});

export async function canUser(userId: string, relation: string, object: string) {
  const { allowed } = await openFga.check({
    user: `user:${userId}`,
    relation,
    object,
  });

  return allowed;
}
