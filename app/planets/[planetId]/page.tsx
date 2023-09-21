"use client";
import getCharacter from "@/app/lib/getCharacter";
import getPlanet from "@/app/lib/getPlanet";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const PlanetPage = async ({ params }: { params: { planetId: string } }) => {
  const planetData = await getPlanet(
    `https://swapi.dev/api/planets/${params.planetId}`
  );

  const planetCharacters = planetData.residents;

  const getPlanetCharactersPromises = planetCharacters.map(
    async (character: string) => {
      const characterId: string = (
        character.split("/").filter(Boolean).pop() || ""
      ).toString();
      const characterData = await getCharacter(characterId);

      return { name: characterData.name, id: characterId };
    }
  );

  const planetLinks = await Promise.all(getPlanetCharactersPromises);

  const imgSrc =
    typeof params.planetId === "string" && parseInt(params.planetId) <= 21
      ? `/img/planets/${params.planetId}.jpg`
      : `/img/placeholder.jpg`;

  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.img}
        src={imgSrc}
        width={200}
        height={200}
        alt={planetData.name}
      />
      <div className={styles.info}>
        <h2 className={styles.heading}>Name: {planetData.name}</h2>
        <p>Population: {planetData.population}</p>
        <p>
          Connected characters:
          {planetCharacters.length > 0 ? (
            <ul>
              {planetLinks.map((character) => (
                <li key={character.id}>
                  <Link href={`/characters/${character.id}`}>
                    {character.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            " none"
          )}
        </p>
      </div>
    </div>
  );
};

export default PlanetPage;
