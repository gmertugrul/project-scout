import { integer, pgTable } from "drizzle-orm/pg-core";
import { players } from "@/app/db/schema";

export const technicalStats = pgTable("technical_stats", {
  playerId: integer("player_id")
    .references(() => players.id, { onDelete: "cascade" })
    .primaryKey(),
  corners: integer("corners"),
  crossing: integer("crossing"),
  dribbling: integer("dribbling"),
  finishing: integer("finishing"),
  firstTouch: integer("first_touch"),
  freeKickTaking: integer("free_kick_taking"),
  heading: integer("heading"),
  longShots: integer("long_shots"),
  longThrows: integer("long_throws"),
  marking: integer("marking"),
  passing: integer("passing"),
  penaltyTaking: integer("penalty_taking"),
  tackling: integer("tackling"),
  technique: integer("technique"),
});

export const physicalStats = pgTable("physical_stats", {
  playerId: integer("player_id")
    .references(() => players.id, { onDelete: "cascade" })
    .primaryKey(),
  acceleration: integer("acceleration"),
  agility: integer("agility"),
  balance: integer("balance"),
  jumpingReach: integer("jumping_reach"),
  naturalFitness: integer("natural_fitness"),
  pace: integer("pace"),
  stamina: integer("stamina"),
  strength: integer("strength"),
});

export const mentalStats = pgTable("mental_stats", {
  playerId: integer("player_id")
    .references(() => players.id, { onDelete: "cascade" })
    .primaryKey(),
  aggression: integer("aggression"),
  anticipation: integer("anticipation"),
  bravery: integer("bravery"),
  composure: integer("composure"),
  concentration: integer("concentration"),
  decisions: integer("decisions"),
  determination: integer("determination"),
  flair: integer("flair"),
  leadership: integer("leadership"),
  offTheBall: integer("off_the_ball"),
  positioning: integer("positioning"),
  teamwork: integer("teamwork"),
  vision: integer("vision"),
  workRate: integer("work_rate"),
});

export const goalkeeperStats = pgTable("goalkeeper_stats", {
  playerId: integer("player_id")
    .references(() => players.id, { onDelete: "cascade" })
    .primaryKey(),
  aerialReach: integer("aerial_reach"),
  commandOfArea: integer("command_of_area"),
  communication: integer("communication"),
  eccentricity: integer("eccentricity"),
  firstTouch: integer("first_touch"),
  handling: integer("handling"),
  kicking: integer("kicking"),
  oneOnOnes: integer("one_on_ones"),
  passing: integer("passing"),
  punching: integer("punching"),
  reflexes: integer("reflexes"),
  rushingOut: integer("rushing_out"),
  throwing: integer("throwing"),
});
