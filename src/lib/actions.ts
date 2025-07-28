"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { people, starships } from "@/db/schema";
import { eq } from "drizzle-orm";

// People Actions
export async function createPerson(data: {
  name: string;
  height?: number;
  mass: number;
  gender?: string;
}) {
  await db.insert(people).values({
    name: data.name,
    height: data.height || null,
    mass: data.mass,
    gender: data.gender || null,
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

// Starship Actions
export async function createStarship(data: typeof starships.$inferInsert) {
  await db.insert(starships).values(data);
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