/**
 * auth Login Function
 */
interface bodyType {
  name?: string;
  email: string;
  password: string;
  tag?: string;
}
export async function authenticationFn(url: string, body: bodyType) {
  const firstFetch = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const jsonResponse = await firstFetch.json();
  return jsonResponse;
}
