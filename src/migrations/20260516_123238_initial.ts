import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_landing_page_strip_icon" AS ENUM('bolt', 'shield', 'silent', 'tap', 'anchor', 'compass');
  CREATE TYPE "public"."enum_landing_page_audiences_items_group" AS ENUM('harbor', 'customer');
  CREATE TYPE "public"."enum_landing_page_pilot_marinas_items_status" AS ENUM('prospect', 'mou', 'active');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "landing_page_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_hero_audience_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_landing_page_strip_icon" DEFAULT 'bolt' NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_how_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_audiences_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group" "enum_landing_page_audiences_items_group" DEFAULT 'harbor' NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_why_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_numbers_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"unit" varchar,
  	"label" varchar NOT NULL,
  	"footnote" varchar
  );
  
  CREATE TABLE "landing_page_pilot_marinas_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"status" "enum_landing_page_pilot_marinas_items_status" DEFAULT 'prospect'
  );
  
  CREATE TABLE "landing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar DEFAULT 'ReUP — Power on Demand. For the Sea.',
  	"meta_description" varchar DEFAULT 'ReUP delivers fast, reliable on-demand power to yachts at harbor. Marine-grade mobile charging, dispatched to your berth.',
  	"hero_eyebrow" varchar DEFAULT 'Marine power, on demand',
  	"hero_heading" varchar DEFAULT 'Power on Demand.' NOT NULL,
  	"hero_heading_highlight" varchar DEFAULT 'For the Sea.',
  	"hero_lede" varchar DEFAULT 'Fast, silent, reliable electricity — delivered to your berth. No diesel. No paperwork. No waiting on a slow pedestal.',
  	"hero_primary_c_t_a_label" varchar DEFAULT 'Request a pilot',
  	"hero_primary_c_t_a_href" varchar DEFAULT '#contact',
  	"hero_secondary_c_t_a_label" varchar DEFAULT 'See how it works',
  	"hero_secondary_c_t_a_href" varchar DEFAULT '#how',
  	"how_heading" varchar DEFAULT 'How ReUP works',
  	"how_lede" varchar DEFAULT 'A full-stack mobile marine power service — hardware, software, and humans on the dock.',
  	"audiences_eyebrow" varchar DEFAULT 'Who we serve',
  	"audiences_heading" varchar DEFAULT 'Two doors into the same service.',
  	"audiences_lede" varchar DEFAULT 'ReUP is built for the people who keep harbors running — and for the people who keep boats running. Same platform, two front doors.',
  	"audiences_harbor_label" varchar DEFAULT 'For Harbors',
  	"audiences_harbor_subtitle" varchar DEFAULT 'Marina operators · charter fleets · event organizers',
  	"audiences_customer_label" varchar DEFAULT 'For End Customers',
  	"audiences_customer_subtitle" varchar DEFAULT 'Yacht owners · captains · charterers',
  	"why_heading" varchar DEFAULT 'Why ReUP wins',
  	"numbers_eyebrow" varchar DEFAULT 'Built for scale',
  	"numbers_heading" varchar DEFAULT 'The numbers ReUP runs on.',
  	"pilot_marinas_eyebrow" varchar DEFAULT 'In conversation with',
  	"pilot_marinas_heading" varchar DEFAULT 'The harbors we are building with.',
  	"pilot_marinas_lede" varchar DEFAULT 'A focused shortlist of Mediterranean marinas — selected for yacht density, charter season, and the willingness to electrify ahead of regulation.',
  	"testimonial_enabled" boolean DEFAULT true,
  	"testimonial_quote" varchar DEFAULT 'I plug in, the boat is ready by morning, and the marina is quiet. That used to be a gallon of diesel and a generator humming all night.',
  	"testimonial_author" varchar DEFAULT 'A captain we are working with',
  	"testimonial_role" varchar DEFAULT '28 m motoryacht · Mediterranean',
  	"contact_heading" varchar DEFAULT 'Bring ReUP to your harbor.',
  	"contact_lede" varchar DEFAULT 'Marinas, charter operators, event organizers — let''s talk pilot.',
  	"contact_email" varchar DEFAULT 'hello@reup.energy',
  	"footer_copyright" varchar DEFAULT '© 2026 ReUP. Mobile marine power, on demand.',
  	"footer_note" varchar DEFAULT 'A CognaLabs / VoltFleet venture · reup.energy',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_nav_links" ADD CONSTRAINT "landing_page_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_hero_audience_pills" ADD CONSTRAINT "landing_page_hero_audience_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_strip" ADD CONSTRAINT "landing_page_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_how_steps" ADD CONSTRAINT "landing_page_how_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_audiences_items" ADD CONSTRAINT "landing_page_audiences_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_why_items" ADD CONSTRAINT "landing_page_why_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_numbers_items" ADD CONSTRAINT "landing_page_numbers_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_pilot_marinas_items" ADD CONSTRAINT "landing_page_pilot_marinas_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "landing_page_nav_links_order_idx" ON "landing_page_nav_links" USING btree ("_order");
  CREATE INDEX "landing_page_nav_links_parent_id_idx" ON "landing_page_nav_links" USING btree ("_parent_id");
  CREATE INDEX "landing_page_hero_audience_pills_order_idx" ON "landing_page_hero_audience_pills" USING btree ("_order");
  CREATE INDEX "landing_page_hero_audience_pills_parent_id_idx" ON "landing_page_hero_audience_pills" USING btree ("_parent_id");
  CREATE INDEX "landing_page_strip_order_idx" ON "landing_page_strip" USING btree ("_order");
  CREATE INDEX "landing_page_strip_parent_id_idx" ON "landing_page_strip" USING btree ("_parent_id");
  CREATE INDEX "landing_page_how_steps_order_idx" ON "landing_page_how_steps" USING btree ("_order");
  CREATE INDEX "landing_page_how_steps_parent_id_idx" ON "landing_page_how_steps" USING btree ("_parent_id");
  CREATE INDEX "landing_page_audiences_items_order_idx" ON "landing_page_audiences_items" USING btree ("_order");
  CREATE INDEX "landing_page_audiences_items_parent_id_idx" ON "landing_page_audiences_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_why_items_order_idx" ON "landing_page_why_items" USING btree ("_order");
  CREATE INDEX "landing_page_why_items_parent_id_idx" ON "landing_page_why_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_numbers_items_order_idx" ON "landing_page_numbers_items" USING btree ("_order");
  CREATE INDEX "landing_page_numbers_items_parent_id_idx" ON "landing_page_numbers_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_pilot_marinas_items_order_idx" ON "landing_page_pilot_marinas_items" USING btree ("_order");
  CREATE INDEX "landing_page_pilot_marinas_items_parent_id_idx" ON "landing_page_pilot_marinas_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "landing_page_nav_links" CASCADE;
  DROP TABLE "landing_page_hero_audience_pills" CASCADE;
  DROP TABLE "landing_page_strip" CASCADE;
  DROP TABLE "landing_page_how_steps" CASCADE;
  DROP TABLE "landing_page_audiences_items" CASCADE;
  DROP TABLE "landing_page_why_items" CASCADE;
  DROP TABLE "landing_page_numbers_items" CASCADE;
  DROP TABLE "landing_page_pilot_marinas_items" CASCADE;
  DROP TABLE "landing_page" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_landing_page_strip_icon";
  DROP TYPE "public"."enum_landing_page_audiences_items_group";
  DROP TYPE "public"."enum_landing_page_pilot_marinas_items_status";`)
}
