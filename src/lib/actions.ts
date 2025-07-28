"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { people, starships } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createPerson(data: {
  name: string;
  mass: number;
}) {
  await db.insert(people).values({
    name: data.name,
    mass: data.mass,
  });
  revalidatePath("/");
}

export async function updatePerson(id: number, data: Partial<typeof people.$inferInsert>) {
  await db.update(people).set(data).where(eq(people.id, id));
  revalidatePath("/");
}

export async function deletePerson(id: number) {
  await db.delete(people).where(eq(people.id, id));
  revalidatePath("/");
}

export async function createStarship(data: {
  name: string;
  crew: number;
  model: string;
  manufacturer: string;
}) {
  await db.insert(starships).values({
    name: data.name,
    crew: data.crew,
    model: data.model,
    manufacturer: data.manufacturer,
  });
  revalidatePath("/");
}

export async function updateStarship(id: number, data: Partial<typeof starships.$inferInsert>) {
  await db.update(starships).set(data).where(eq(starships.id, id));
  revalidatePath("/");
}

export async function deleteStarship(id: number) {
  await db.delete(starships).where(eq(starships.id, id));
  revalidatePath("/");
} 