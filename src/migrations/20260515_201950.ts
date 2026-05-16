import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text DEFAULT 'editor',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`landing_page_nav_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_page_nav_links_order_idx\` ON \`landing_page_nav_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_page_nav_links_parent_id_idx\` ON \`landing_page_nav_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_page_hero_audience_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_page_hero_audience_pills_order_idx\` ON \`landing_page_hero_audience_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_page_hero_audience_pills_parent_id_idx\` ON \`landing_page_hero_audience_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_page_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'bolt' NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_page_strip_order_idx\` ON \`landing_page_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_page_strip_parent_id_idx\` ON \`landing_page_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_page_how_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_page_how_steps_order_idx\` ON \`landing_page_how_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_page_how_steps_parent_id_idx\` ON \`landing_page_how_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_page_audiences_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` text DEFAULT 'harbor' NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_page_audiences_items_order_idx\` ON \`landing_page_audiences_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_page_audiences_items_parent_id_idx\` ON \`landing_page_audiences_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_page_why_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_page_why_items_order_idx\` ON \`landing_page_why_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_page_why_items_parent_id_idx\` ON \`landing_page_why_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_page_numbers_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`unit\` text,
  	\`label\` text NOT NULL,
  	\`footnote\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_page_numbers_items_order_idx\` ON \`landing_page_numbers_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_page_numbers_items_parent_id_idx\` ON \`landing_page_numbers_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_page_pilot_marinas_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`status\` text DEFAULT 'prospect',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_page_pilot_marinas_items_order_idx\` ON \`landing_page_pilot_marinas_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_page_pilot_marinas_items_parent_id_idx\` ON \`landing_page_pilot_marinas_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text DEFAULT 'ReUP — Power on Demand. For the Sea.',
  	\`meta_description\` text DEFAULT 'ReUP delivers fast, reliable on-demand power to yachts at harbor. Marine-grade mobile charging, dispatched to your berth.',
  	\`hero_eyebrow\` text DEFAULT 'Marine power, on demand',
  	\`hero_heading\` text DEFAULT 'Power on Demand.' NOT NULL,
  	\`hero_heading_highlight\` text DEFAULT 'For the Sea.',
  	\`hero_lede\` text DEFAULT 'Fast, silent, reliable electricity — delivered to your berth. No diesel. No paperwork. No waiting on a slow pedestal.',
  	\`hero_primary_c_t_a_label\` text DEFAULT 'Request a pilot',
  	\`hero_primary_c_t_a_href\` text DEFAULT '#contact',
  	\`hero_secondary_c_t_a_label\` text DEFAULT 'See how it works',
  	\`hero_secondary_c_t_a_href\` text DEFAULT '#how',
  	\`how_heading\` text DEFAULT 'How ReUP works',
  	\`how_lede\` text DEFAULT 'A full-stack mobile marine power service — hardware, software, and humans on the dock.',
  	\`audiences_eyebrow\` text DEFAULT 'Who we serve',
  	\`audiences_heading\` text DEFAULT 'Two doors into the same service.',
  	\`audiences_lede\` text DEFAULT 'ReUP is built for the people who keep harbors running — and for the people who keep boats running. Same platform, two front doors.',
  	\`audiences_harbor_label\` text DEFAULT 'For Harbors',
  	\`audiences_harbor_subtitle\` text DEFAULT 'Marina operators · charter fleets · event organizers',
  	\`audiences_customer_label\` text DEFAULT 'For End Customers',
  	\`audiences_customer_subtitle\` text DEFAULT 'Yacht owners · captains · charterers',
  	\`why_heading\` text DEFAULT 'Why ReUP wins',
  	\`numbers_eyebrow\` text DEFAULT 'Built for scale',
  	\`numbers_heading\` text DEFAULT 'The numbers ReUP runs on.',
  	\`pilot_marinas_eyebrow\` text DEFAULT 'In conversation with',
  	\`pilot_marinas_heading\` text DEFAULT 'The harbors we are building with.',
  	\`pilot_marinas_lede\` text DEFAULT 'A focused shortlist of Mediterranean marinas — selected for yacht density, charter season, and the willingness to electrify ahead of regulation.',
  	\`testimonial_enabled\` integer DEFAULT true,
  	\`testimonial_quote\` text DEFAULT 'I plug in, the boat is ready by morning, and the marina is quiet. That used to be a gallon of diesel and a generator humming all night.',
  	\`testimonial_author\` text DEFAULT 'A captain we are working with',
  	\`testimonial_role\` text DEFAULT '28 m motoryacht · Mediterranean',
  	\`contact_heading\` text DEFAULT 'Bring ReUP to your harbor.',
  	\`contact_lede\` text DEFAULT 'Marinas, charter operators, event organizers — let''s talk pilot.',
  	\`contact_email\` text DEFAULT 'hello@reup.energy',
  	\`footer_copyright\` text DEFAULT '© 2026 ReUP. Mobile marine power, on demand.',
  	\`footer_note\` text DEFAULT 'A CognaLabs / VoltFleet venture · reup.energy',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`landing_page_nav_links\`;`)
  await db.run(sql`DROP TABLE \`landing_page_hero_audience_pills\`;`)
  await db.run(sql`DROP TABLE \`landing_page_strip\`;`)
  await db.run(sql`DROP TABLE \`landing_page_how_steps\`;`)
  await db.run(sql`DROP TABLE \`landing_page_audiences_items\`;`)
  await db.run(sql`DROP TABLE \`landing_page_why_items\`;`)
  await db.run(sql`DROP TABLE \`landing_page_numbers_items\`;`)
  await db.run(sql`DROP TABLE \`landing_page_pilot_marinas_items\`;`)
  await db.run(sql`DROP TABLE \`landing_page\`;`)
}
