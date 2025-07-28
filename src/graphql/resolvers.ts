import { db } from "@/db";
import { people, starships, planets, species, vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { ResolverArgs } from "@/types";

export const resolvers = {
  Query: {
    people: async () => {
      return await db.query.people.findMany();
    },
    person: async (_: unknown, { id }: ResolverArgs) => {
      return await db.query.people.findFirst({ where: eq(people.id, id) });
    },
    starships: async () => {
      return await db.query.starships.findMany();
    },
    starship: async (_: unknown, { id }: ResolverArgs) => {
      return await db.query.starships.findFirst({
        where: eq(starships.id, id),
      });
    },
    planets: async () => {
      return await db.query.planets.findMany();
    },
    planet: async (_: unknown, { id }: ResolverArgs) => {
      return await db.query.planets.findFirst({ where: eq(planets.id, id) });
    },
    species: async () => {
      return await db.query.species.findMany();
    },
    specie: async (_: unknown, { id }: ResolverArgs) => {
      return await db.query.species.findFirst({ where: eq(species.id, id) });
    },
    vehicles: async () => {
      return await db.query.vehicles.findMany();
    },
    vehicle: async (_: unknown, { id }: ResolverArgs) => {
      return await db.query.vehicles.findFirst({ where: eq(vehicles.id, id) });
    },
  },
}; 