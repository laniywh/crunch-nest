DO $$ BEGIN
 CREATE TYPE "public"."report_frequency" AS ENUM('ANNUAL', 'QUARTERLY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."report_type" AS ENUM('INCOME_STATEMENT', 'BALANCE_SHEET', 'CASH_FLOW');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cn_api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"key" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cn_companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"symbol" varchar(10) NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone,
	"last_viewed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cn_companyListMappings" (
	"company_id" integer NOT NULL,
	"list_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cn_financial_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"report_id" integer NOT NULL,
	"metric_name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cn_financial_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"fiscal_date_ending" date NOT NULL,
	"report_frequency" "report_frequency" NOT NULL,
	"report_type" "report_type" NOT NULL,
	"reported_currency" varchar(3) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cn_lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cn_companyListMappings" ADD CONSTRAINT "cn_companyListMappings_company_id_cn_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."cn_companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cn_companyListMappings" ADD CONSTRAINT "cn_companyListMappings_list_id_cn_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."cn_lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cn_financial_metrics" ADD CONSTRAINT "cn_financial_metrics_report_id_cn_financial_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."cn_financial_reports"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cn_financial_reports" ADD CONSTRAINT "cn_financial_reports_company_id_cn_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."cn_companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "cn_api_keys" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_id_unique_idx" ON "cn_api_keys" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "symbol_unique_idx" ON "cn_companies" ("symbol");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_list_pk" ON "cn_companyListMappings" ("company_id","list_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_metric_idx" ON "cn_financial_metrics" ("report_id","metric_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_report_idx" ON "cn_financial_reports" ("company_id","fiscal_date_ending","report_frequency","report_type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_unique_idx" ON "cn_lists" ("name");