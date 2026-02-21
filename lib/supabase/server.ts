type FilterValue = string | number | boolean;

function getRequiredEnv(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }
  return value;
}

const supabaseUrl = getRequiredEnv("SUPABASE_URL");
const supabaseServiceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

function createUrl(path: string, params?: URLSearchParams) {
  const base = supabaseUrl.replace(/\/+$/, "");
  const query = params?.toString();
  return `${base}/rest/v1/${path}${query ? `?${query}` : ""}`;
}

function createHeaders(extra?: Record<string, string>) {
  return {
    apikey: supabaseServiceRoleKey,
    Authorization: `Bearer ${supabaseServiceRoleKey}`,
    "Content-Type": "application/json",
    ...extra
  };
}

export function eqFilter(column: string, value: FilterValue): [string, string] {
  return [column, `eq.${value}`];
}

export async function selectRows<T>(table: string, options?: { params?: URLSearchParams; count?: boolean }): Promise<T[]> {
  const params = options?.params ?? new URLSearchParams();
  if (!params.has("select")) {
    params.set("select", "*");
  }

  const response = await fetch(createUrl(table, params), {
    method: "GET",
    headers: createHeaders(options?.count ? { Prefer: "count=exact" } : undefined),
    cache: "no-store"
  });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as T[];
  return data;
}

export async function countRows(table: string, options?: { params?: URLSearchParams }): Promise<number> {
  const params = options?.params ?? new URLSearchParams();
  params.set("select", "id");

  const response = await fetch(createUrl(table, params), {
    method: "HEAD",
    headers: createHeaders({ Prefer: "count=exact" }),
    cache: "no-store"
  });

  if (!response.ok) {
    return 0;
  }

  const contentRange = response.headers.get("content-range");
  const total = contentRange?.split("/")[1];
  const parsed = total ? Number(total) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function insertRow(table: string, payload: Record<string, unknown>): Promise<void> {
  const response = await fetch(createUrl(table), {
    method: "POST",
    headers: createHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to insert row.");
  }
}

export async function updateRows(
  table: string,
  payload: Record<string, unknown>,
  filters: Array<[string, string]>
): Promise<void> {
  const params = new URLSearchParams();
  for (const [column, value] of filters) {
    params.set(column, value);
  }

  const response = await fetch(createUrl(table, params), {
    method: "PATCH",
    headers: createHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to update row.");
  }
}

export async function deleteRows(table: string, filters: Array<[string, string]>): Promise<void> {
  const params = new URLSearchParams();
  for (const [column, value] of filters) {
    params.set(column, value);
  }

  const response = await fetch(createUrl(table, params), {
    method: "DELETE",
    headers: createHeaders({ Prefer: "return=minimal" }),
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to delete row.");
  }
}
