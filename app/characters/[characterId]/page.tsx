"use client";
import getCharacter from "@/app/lib/getCharacter";
import getRace from "@/app/lib/getRaceName";
import getPlanet from "@/app/lib/getPlanet";
import getVehicle from "@/app/lib/getVehicle";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const CharacterPage = async ({
  params,
}: {
  params: { characterId: string };
}) => {
  const characterData = await getCharacter(params.characterId);

  const raceData = await getRace(
    characterData.species.length > 0
      ? characterData.species
      : "https://swapi.dev/api/species/1"
  );

  const raceName = raceData.name;

  const planetName = await getPlanet(characterData.homeworld);
  const planetId = planetName.url.split("/").filter(Boolean).pop();

  const vehicles = characterData.vehicles;

  const getVehiclePromises = vehicles.map(async (vehicle: string) => {
    const vehicleId: string = (
      vehicle.split("/").filter(Boolean).pop() || ""
    ).toString();
    const vehicleData = await getVehicle(vehicleId);

    return { name: vehicleData.name, id: vehicleId };
  });

  const vehicleLinks = await Promise.all(getVehiclePromises);

  return (
    <div className={styles.character}>
      <Image
        className={styles.img}
        src={`/img/characters/${params.characterId}.jpg`}
        width={150}
        height={200}
        alt={characterData.name}
      />
      <div className={styles.info}>
        <h2 className={styles.heading}>Name: {characterData.name}</h2>
        <p>Race: {raceName}</p>
        <p>
          Homeworld:{" "}
          <Link href={`/planets/${planetId}`}>{planetName.name}</Link>
        </p>
        <p>
          Vehicles:
          {vehicles.length > 0 ? (
            <ul>
              {vehicleLinks.map((vehicle) => (
                <li key={vehicle.id}>
                  <Link href={`/vehicles/${vehicle.id}`}>{vehicle.name}</Link>
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

export default CharacterPage;
