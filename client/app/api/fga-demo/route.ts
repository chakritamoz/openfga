import { canUser } from "@/lib/openfga";

export async function GET() {
  return Response.json({
    allowed: await canUser("demo", "admin", "group:demo"),
  });
}
