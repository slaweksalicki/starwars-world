"use client";
import getVehicles from "../lib/getVehicles";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const Vehicles = async () => {
  const vehiclesData = await getVehicles();

  const vehicles: any[] = vehiclesData;

  return (
    <>
      <h2 className={styles.heading}>Vehicles</h2>

      {vehicles.map((vehicle: Vehicle, i: number) => {
        const getImageId = vehicle.url.split("/").filter(Boolean).pop();

        const imgSrc =
          typeof getImageId === "string" && parseInt(getImageId) <= 42
            ? `/img/vehicles/${getImageId}.jpg`
            : `/img/placeholder.jpg`;

        return (
          <Link key={i} href={`/vehicles/${getImageId}`}>
            <div className={styles.item}>
              <Image
                className={styles.img}
                src={imgSrc}
                width={60}
                height={80}
                alt={vehicle.name}
              />
              {vehicle.name}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Vehicles;

type Vehicle = {
  name: string;
  url: string;
};
