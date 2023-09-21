export default async function getCharacters() {
  let allCharacters: Character[] = [];
  let nextPage: string | null = "https://swapi.dev/api/people/";

  try {
    while (nextPage) {
      const res = await fetch(nextPage);

      if (!res.ok) {
        throw new Error("Data fetch failed!");
      }

      const data: CharacterList = await res.json();
      allCharacters = allCharacters.concat(data.results);
      nextPage = data.next;
    }

    return allCharacters;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type Character = {
  name: string;
  species: string | undefined;
  vehicles: string;
};

type CharacterList = {
  results: Character[];
  next: string | null;
};
