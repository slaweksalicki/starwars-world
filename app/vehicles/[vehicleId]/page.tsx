"use client";
import getCharacter from "@/app/lib/getCharacter";
import getVehicle from "@/app/lib/getVehicle";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const VehiclePage = async ({ params }: { params: { vehicleId: string } }) => {
  const vehicleData = await getVehicle(params.vehicleId);

  const vehicleCharacters = vehicleData.pilots;

  const getVehicleCharactersPromises = vehicleCharacters.map(
    async (character: string) => {
      const characterId: string = (
        character.split("/").filter(Boolean).pop() || ""
      ).toString();
      const characterData = await getCharacter(characterId);

      return { name: characterData.name, id: characterId };
    }
  );

  const vehicleLinks = await Promise.all(getVehicleCharactersPromises);

  const imgSrc =
    typeof params.vehicleId === "string" && parseInt(params.vehicleId) <= 42
      ? `/img/vehicles/${params.vehicleId}.jpg`
      : `/img/placeholder.jpg`;

  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.img}
        src={imgSrc}
        width={150}
        height={200}
        alt={vehicleData.name}
      />
      <div className={styles.info}>
        <h2 className={styles.heading}>Name: {vehicleData.name}</h2>
        <p>Type: {vehicleData.vehicle_class}</p>
        <p>
          Characters:
          {vehicleCharacters.length > 0 ? (
            <ul>
              {vehicleLinks.map((character) => (
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

export default VehiclePage;
