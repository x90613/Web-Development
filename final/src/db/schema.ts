import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  date,
  time,
  unique,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    usernameIndex: index("username_index").on(table.username),
  }),
);

// Plans (e.g., PlanA, PlanB)
// usersTable is many-to-many relationship with Plans

export const plansTable = pgTable(
  "plans",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    description: varchar("description", { length: 100 }).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// journeysTable (e.g., journey1, journey2)
// plansTable is one-to-many relationship with journeysTable
export const journeysTable = pgTable(
  "journeys",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    note: varchar("note", { length: 100 }).notNull(),
    location: varchar("location", { length: 100 }).notNull(),
    time1: date("time1"), // only time, no date (start time), sorted by time1
    time2: date("time2"), // only time, no date (end time)
    plansId: uuid("plans_id")
      .references(() => plansTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const plansUsersTable = pgTable(
  "plans_users",
  {
    id: serial("id").primaryKey(),
    planId: uuid("plan_id")
      .notNull()
      .references(() => plansTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    planAndUserIndex: index("plan_and_user_index").on(
      table.planId,
      table.userId,
    ),
    // This is a unique constraint on the combination of planId and userId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.planId, table.userId),
  }),
);

// Relations

export const usersRelations = relations(usersTable, ({ many }) => ({
  plansUsersTable: many(plansUsersTable),
}));

export const plansRelations = relations(plansTable, ({ many }) => ({
  journeys: many(journeysTable),
  plansUsersTable: many(plansUsersTable),
}));

export const plansUsersRelations = relations(
  plansUsersTable,
  ({ one }) => ({
    usersTable: one(usersTable, {
      fields: [plansUsersTable.userId],
      references: [usersTable.displayId],
    }),

    plansTable: one(plansTable, {
      fields: [plansUsersTable.planId],
      references: [plansTable.displayId],
    }),
  }),
);

export const journeysRelations = relations(journeysTable,({one}) => ({
  plansTable: one(plansTable, {
    fields: [journeysTable.plansId],
    references: [plansTable.displayId],
  }),
}));
