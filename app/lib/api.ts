// ==========================
// Fetch API Helper
// ==========================
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    cache: options?.cache ?? "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch ${endpoint}`;

    try {
      const errorData = await res.json();
      errorMessage =
        errorData?.message ||
        errorData?.error ||
        errorMessage;
    } catch {
      // ignore non-JSON error
    }

    throw new Error(errorMessage);
  }

  return (await res.json()) as T;
}

// ==========================
// Image URL Helper
// ==========================
export function getImageUrl(path?: string): string {
  if (!path) {
    return "/images/categories/placeholder.png";
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`
  };
}