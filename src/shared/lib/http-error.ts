import axios from "axios";

export function normalizeAxiosError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const msg =
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message ??
      "Unknown error";
    return new Error(msg);
  }
  return error instanceof Error ? error : new Error(String(error));
}
