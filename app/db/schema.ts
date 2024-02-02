import { relations } from "drizzle-orm/relations";

import {
  char,
  date,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  abbreviation: varchar("abbreviation", { length: 10 }),
  countryCode: char("country_code", { length: 2 }),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  birthDate: date("birth_date").notNull(),
  position: varchar("position", { length: 2 }),
  countryCode: char("country_code", { length: 2 }),
  teamId: integer("team_id").references(() => teams.id),
  picture: varchar("picture", { length: 1024 }),
});

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

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id, {
        onDelete: "cascade",
      }),
    content: text("content").notNull(),
  },
  (table) => ({
    createdAtIdx: index("created_at_idx").on(table.playerId, table.createdAt),
  })
);

export const teamsRelations = relations(teams, ({ many }) => ({
  players: many(players),
}));

export const playersRelations = relations(players, ({ one }) => ({
  team: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  }),
  posts: one(posts, {
    fields: [players.id],
    references: [posts.playerId],
  }),
  technicalStats: one(technicalStats, {
    fields: [players.id],
    references: [technicalStats.playerId],
  }),
  physicalStats: one(physicalStats, {
    fields: [players.id],
    references: [physicalStats.playerId],
  }),
  mentalStats: one(mentalStats, {
    fields: [players.id],
    references: [mentalStats.playerId],
  }),
  goalkeeperStats: one(goalkeeperStats, {
    fields: [players.id],
    references: [goalkeeperStats.playerId],
  }),
}));

export type Player = typeof players.$inferSelect;
export type PlayerInsert = typeof players.$inferInsert;

export type Team = typeof teams.$inferSelect;
export type TeamInsert = typeof teams.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;

export type TechnicalStats = typeof technicalStats.$inferSelect;
export type PhysicalStats = typeof physicalStats.$inferSelect;
export type MentalStats = typeof mentalStats.$inferSelect;
export type GoalkeeperStats = typeof goalkeeperStats.$inferSelect;
