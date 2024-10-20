ALTER TABLE "cn_lists" RENAME TO "cn_userLists";--> statement-breakpoint
ALTER TABLE "cn_companyListMappings" DROP CONSTRAINT "cn_companyListMappings_list_id_cn_lists_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cn_companyListMappings" ADD CONSTRAINT "cn_companyListMappings_list_id_cn_userLists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."cn_userLists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
