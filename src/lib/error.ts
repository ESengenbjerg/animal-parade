export type AppErrorCode =
  | "TOKEN_MISSING"
  | "TOKEN_EXPIRED"
  | "INVALID_API_KEY"
  | "INSUFFICIENT_BALANCE"
  | "STAMP_MISSING"
  | "STAMP_INVALID"
  | "UNKNOWN";

export function mapError(err: any): AppErrorCode {
  if (!err) return "UNKNOWN";

  switch (err.message) {
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
