export type AppErrorCode =
  | "TOKEN_MISSING"
  | "TOKEN_EXPIRED"
  | "INVALID_API_KEY"
  | "INSUFFICIENT_BALANCE"
  | "STAMP_MISSING"
  | "STAMP_INVALID"
  | "UNKNOWN";

export function mapError(err: unknown): AppErrorCode {
  if (!err || typeof err !== "object") return "UNKNOWN";

  const parsedError = err as { message?: unknown };

  if (typeof parsedError.message !== "string") return "UNKNOWN";

  switch (parsedError.message) {
    case "Invalid or expired identity token":
      return "TOKEN_EXPIRED";
    case "Invalid api_key":
      return "INVALID_API_KEY";
    case "Insufficient balance":
      return "INSUFFICIENT_BALANCE";
    default:
      return "UNKNOWN";
  }
}
