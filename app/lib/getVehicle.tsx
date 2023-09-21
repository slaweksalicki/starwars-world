export default async function getVehicle(id: string) {
  const res = await fetch(`https://swapi.dev/api/vehicles/${id}`);

  if (!res.ok) throw new Error("Data fetch failed!");

  return res.json();
}
