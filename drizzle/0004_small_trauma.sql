DROP TABLE "countries";

--> statement-breakpoint
--> statement-breakpoint
ALTER TABLE "players"
ADD COLUMN "country_code" char(2);

--> statement-breakpoint
ALTER TABLE "players"
DROP COLUMN IF EXISTS "country_id";
