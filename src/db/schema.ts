import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const people = sqliteTable("people", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  mass: integer("mass").notNull(),
});

export const starships = sqliteTable("starships", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  crew: integer("crew").notNull(),
  model: text("model").notNull(),
  manufacturer: text("manufacturer").notNull(),
});

export const planets = sqliteTable("planets", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  population: integer("population"),
});

export const species = sqliteTable("species", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  language: text("language"),
});

export const vehicles = sqliteTable("vehicles", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  model: text("model"),
  manufacturer: text("manufacturer"),
}); 