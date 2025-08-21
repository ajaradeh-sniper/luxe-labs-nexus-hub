export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP ${res.status}: ${res.statusText}`);
  }
  
  return res.json();
}

export async function apiFormData<T>(url: string, formData: FormData): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    body: formData
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP ${res.status}: ${res.statusText}`);
  }
  
  return res.json();
}