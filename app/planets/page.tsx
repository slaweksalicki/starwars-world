"use client";
import getPlanets from "../lib/getPlanets";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

const Planets = async () => {
  const planetsData = await getPlanets();

  const planets: any[] = planetsData;

  return (
    <>
      <h2 className={styles.heading}>Planets</h2>

      {planets.map((planet: Planet, i: number) => {
        const getImageId = planet.url.split("/").filter(Boolean).pop();

        const imgSrc =
          typeof getImageId === "string" && parseInt(getImageId) <= 21
            ? `/img/planets/${getImageId}.jpg`
            : `/img/placeholder.jpg`;

        return (
          <Link key={i} href={`/planets/${getImageId}`}>
            <div className={styles.item}>
              <Image
                className={styles.img}
                src={imgSrc}
                width={80}
                height={80}
                alt={planet.name}
                placeholder="blur"
                blurDataURL="/img/placeholder.jpg"
              />
              {planet.name}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Planets;

type Planet = {
  name: string;
  url: string;
};
