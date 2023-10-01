/**
 * Explore fetch
 */
export async function exploreFetch(url: string) {
  const firstFetch = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application",
    },
  });
  const secondFetch = await firstFetch.json();
  return secondFetch;
}
