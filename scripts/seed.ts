import { db } from "../src/db";
import { people, starships, planets, species, vehicles } from "../src/db/schema";
import { fetch } from "undici";

const BATCH_SIZE = 10;

async function fetchFromSWAPI(endpoint: string) {
  let results = [];
  let url = `https://swapi.dev/api/${endpoint}/`;

  while (url) {
    const response = await fetch(url, {
      dispatcher: new (require("undici").Agent)({
        connect: {
          rejectUnauthorized: false,
        },
      }),
    });
    const data = await response.json() as { results: any[]; next: string | null };
    results.push(...data.results);
    url = data.next;
  }

  return results;
}

async function main() {
  console.log("Seeding database...");

  await db.delete(people);
  await db.delete(starships);
  await db.delete(planets);
  await db.delete(species);
  await db.delete(vehicles);

  const [peopleData, starshipsData, planetsData, speciesData, vehiclesData] = await Promise.all([
    fetchFromSWAPI("people"),
    fetchFromSWAPI("starships"),
    fetchFromSWAPI("planets"),
    fetchFromSWAPI("species"),
    fetchFromSWAPI("vehicles"),
  ]);

  for (let i = 0; i < peopleData.length; i += BATCH_SIZE) {
    const batch = peopleData.slice(i, i + BATCH_SIZE);
    await db.insert(people).values(
      batch.map((p: any, index: number) => ({
        id: i + index + 1,
        name: p.name,
        height: parseInt(p.height) || 0,
        mass: parseInt(p.mass) || 0,
        gender: p.gender,
      }))
    );
  }

  for (let i = 0; i < starshipsData.length; i += BATCH_SIZE) {
    const batch = starshipsData.slice(i, i + BATCH_SIZE);
    await db.insert(starships).values(
      batch.map((s: any, index: number) => ({
        id: i + index + 1,
        name: s.name,
        crew: parseInt(s.crew) || 0,
        model: s.model,
        manufacturer: s.manufacturer,
      }))
    );
  }

  for (let i = 0; i < planetsData.length; i += BATCH_SIZE) {
    const batch = planetsData.slice(i, i + BATCH_SIZE);
    await db.insert(planets).values(
      batch.map((p: any, index: number) => ({
        id: i + index + 1,
        name: p.name,
        population: parseInt(p.population) || 0,
      }))
    );
  }

  for (let i = 0; i < speciesData.length; i += BATCH_SIZE) {
    const batch = speciesData.slice(i, i + BATCH_SIZE);
    await db.insert(species).values(
      batch.map((s: any, index: number) => ({
        id: i + index + 1,
        name: s.name,
        language: s.language,
      }))
    );
  }

  for (let i = 0; i < vehiclesData.length; i += BATCH_SIZE) {
    const batch = vehiclesData.slice(i, i + BATCH_SIZE);
    await db.insert(vehicles).values(
      batch.map((v: any, index: number) => ({
        id: i + index + 1,
        name: v.name,
        model: v.model,
        manufacturer: v.manufacturer,
      }))
    );
  }

  console.log("Database seeded successfully!");
}

main(); 