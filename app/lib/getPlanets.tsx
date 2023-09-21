export default async function getPlanets() {
  let allPlanets: Planet[] = [];
  let nextPage: string | null = "https://swapi.dev/api/planets/";

  try {
    while (nextPage) {
      const res = await fetch(nextPage);

      if (!res.ok) {
        throw new Error("Data fetch failed!");
      }

      const data: PlanetList = await res.json();
      allPlanets = allPlanets.concat(data.results);
      nextPage = data.next;
    }

    return allPlanets;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type Planet = {
  name: string;
  population: string | undefined;
  residents: string;
};

type PlanetList = {
  results: Planet[];
  next: string | null;
};
