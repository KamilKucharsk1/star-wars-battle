CREATE TABLE `people` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`height` integer NOT NULL,
	`mass` integer NOT NULL,
	`gender` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `planets` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`population` integer
);
--> statement-breakpoint
CREATE TABLE `species` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`language` text
);
--> statement-breakpoint
CREATE TABLE `starships` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`crew` integer NOT NULL,
	`model` text NOT NULL,
	`manufacturer` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`model` text,
	`manufacturer` text
);
