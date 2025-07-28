PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_people` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`height` integer,
	`mass` integer NOT NULL,
	`gender` text
);
--> statement-breakpoint
INSERT INTO `__new_people`("id", "name", "height", "mass", "gender") SELECT "id", "name", "height", "mass", "gender" FROM `people`;--> statement-breakpoint
DROP TABLE `people`;--> statement-breakpoint
ALTER TABLE `__new_people` RENAME TO `people`;--> statement-breakpoint
PRAGMA foreign_keys=ON;