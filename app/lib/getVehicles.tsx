export default async function getVehicles() {
  let allVehicles: Vehicle[] = [];
  let nextPage: string | null = "https://swapi.dev/api/vehicles/";

  try {
    while (nextPage) {
      const res = await fetch(nextPage);

      if (!res.ok) {
        throw new Error("Data fetch failed!");
      }

      const data: VehicleList = await res.json();
      allVehicles = allVehicles.concat(data.results);
      nextPage = data.next;
    }

    return allVehicles;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type Vehicle = {
  name: string;
  vehicle_class: string | undefined;
  pilots: string;
};

type VehicleList = {
  results: Vehicle[];
  next: string | null;
};
