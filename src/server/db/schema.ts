import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  uniqueIndex,
  integer,
  date,
  pgEnum,
  text,
} from "drizzle-orm/pg-core";
import { ReportFrequencies, ReportTypes } from "@/types";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cn_${name}`);

export const apiKeys = createTable(
  "api_keys",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    key: varchar("key", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    userIdIndex: index("user_id_idx").on(table.userId),
    userIdUniqueIndex: uniqueIndex("user_id_unique_idx").on(table.userId),
  }),
);

export type SelectApiKey = InferSelectModel<typeof apiKeys>;
export type InsertApiKey = InferInsertModel<typeof apiKeys>;

export const companies = createTable(
  "companies",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    symbol: varchar("symbol", { length: 10 }).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    lastViewedAt: timestamp("last_viewed_at", { withTimezone: true }),
  },
  (table) => ({
    symbolUniqueIndex: uniqueIndex("symbol_unique_idx").on(table.symbol),
  }),
);
export type SelectCompany = InferSelectModel<typeof companies>;
export type InsertCompany = InferInsertModel<typeof companies>;

export const reportFrequencyEnum = pgEnum(
  "report_frequency",
  ReportFrequencies,
);
export const reportTypeEnum = pgEnum("report_type", ReportTypes);
export const financialReports = createTable(
  "financial_reports",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companies.id),
    fiscalDateEnding: date("fiscal_date_ending").notNull(),
    reportFrequency: reportFrequencyEnum("report_frequency").notNull(),
    reportType: reportTypeEnum("report_type").notNull(),
    reportedCurrency: varchar("reported_currency", { length: 3 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => {
    return {
      uniqueReportIdx: uniqueIndex("unique_report_idx").on(
        table.companyId,
        table.fiscalDateEnding,
        table.reportFrequency,
        table.reportType,
      ),
    };
  },
);

export type SelectFinancialReport = InferSelectModel<typeof financialReports>;
export type InsertFinancialReport = InferInsertModel<typeof financialReports>;

export const financialMetrics = createTable(
  "financial_metrics",
  {
    id: serial("id").primaryKey(),
    reportId: integer("report_id")
      .notNull()
      .references(() => financialReports.id),
    metricName: text("metric_name").notNull(),
    metricValue: text("description").notNull(),
  },
  (table) => {
    return {
      uniqueMetricIdx: uniqueIndex("unique_metric_idx").on(
        table.reportId,
        table.metricName,
      ),
    };
  },
);

export type SelectFinancialMetric = InferSelectModel<typeof financialMetrics>;
export type InsertFinancialMetric = InferInsertModel<typeof financialMetrics>;

export const userLists = createTable(
  "userLists",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    nameUniqueIndex: uniqueIndex("name_unique_idx").on(table.name),
  }),
);

export type SelectUserList = InferSelectModel<typeof userLists>;
export type InsertUserList = InferInsertModel<typeof userLists>;

export const companyListMappings = createTable(
  "companyListMappings",
  {
    companyId: integer("company_id")
      .notNull()
      .references(() => companies.id),
    listId: integer("list_id")
      .notNull()
      .references(() => userLists.id),
  },
  (table) => ({
    primaryKey: uniqueIndex("company_list_pk").on(
      table.companyId,
      table.listId,
    ),
  }),
);
