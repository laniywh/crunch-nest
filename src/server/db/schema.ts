// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `crunch-nest_${name}`);

export const apiKeys = createTable(
  "api_key",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    key: varchar("key", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    userIdIndex: index("user_id_idx").on(example.userId),
    userIdUniqueIndex: uniqueIndex("user_id_unique_idx").on(example.userId),
  }),
);
