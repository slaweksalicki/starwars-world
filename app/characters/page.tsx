"use client";
import getCharacters from "../lib/getCharacters";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const Characters = async () => {
  const charactersData = await getCharacters();

  const characters: any[] = charactersData;

  return (
    <>
      <h2 className={styles.heading}>Characters</h2>

      {characters.map((character: Character, i: number) => {
        const getId = character.url.split("/").filter(Boolean).pop();
        return (
          <Link key={i} href={`/characters/${getId}`}>
            <div className={styles.item}>
              <Image
                className={styles.img}
                src={`/img/characters/${getId}.jpg`}
                width={60}
                height={80}
                alt={character.name}
              />
              {character.name}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Characters;

type Character = {
  name: string;
  url: string;
};
