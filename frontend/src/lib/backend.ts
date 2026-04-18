export const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? process.env.BACKEND_BASE_URL ?? "http://localhost:8000";

export function backendUrl(path: string): string {
    return new URL(path, backendBaseUrl).toString();
}