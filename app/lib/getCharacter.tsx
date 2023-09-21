export default async function getCharacter(id: string) {
  const res = await fetch(`https://swapi.dev/api/people/${id}`);

  if (!res.ok) throw new Error("Data fetch failed!");

  return res.json();
}
