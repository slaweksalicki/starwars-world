export default async function getPlanet(url: string) {
  const res = await fetch(`${url}`);

  if (!res.ok) throw new Error("Data fetch failed!");

  return res.json();
}
