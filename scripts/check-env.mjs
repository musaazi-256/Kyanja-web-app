import fs from "node:fs";
import path from "node:path";

const envFilePath = path.join(process.cwd(), ".env");
if (fs.existsSync(envFilePath)) {
  const lines = fs.readFileSync(envFilePath, "utf8").split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) {
      continue;
    }
    const [key, ...rest] = line.split("=");
    if (!process.env[key]) {
      const value = rest.join("=").replace(/^['"]|['"]$/g, "");
      process.env[key] = value;
    }
  }
}

const requiredAlways = ["DATABASE_URL", "AUTH_SECRET"];
const requiredProdLike = ["AUTH_URL"]; // or NEXTAUTH_URL if you prefer

const missingAlways = requiredAlways.filter((key) => !process.env[key]);
if (missingAlways.length > 0) {
  console.error(`Missing required environment variables: ${missingAlways.join(", ")}`);
  process.exit(1);
}

const isProdLike = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
if (isProdLike) {
  const hasAuthUrl = Boolean(process.env.AUTH_URL || process.env.NEXTAUTH_URL);
  if (!hasAuthUrl) {
    console.error("Missing AUTH_URL (or NEXTAUTH_URL) for production deployment.");
    process.exit(1);
  }

  const dbUrl = process.env.DATABASE_URL || "";
  if (dbUrl.startsWith("file:")) {
    console.error("DATABASE_URL is using SQLite (file:...) which is not suitable for Vercel production.");
    console.error("Use a hosted Postgres URL (Neon/Supabase/Vercel Postgres) and redeploy.");
    process.exit(1);
  }
}

console.log("Environment check passed.");
