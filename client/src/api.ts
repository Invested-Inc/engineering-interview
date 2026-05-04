import { ApiResponse } from "./types";

const BASE_URL = "/api";

export async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return res.json();
}
