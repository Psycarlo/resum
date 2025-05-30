create table "public"."manual_checkout_ticket_resum_25" (
    "id" bigint generated by default as identity not null,
    "email" text not null,
    "ticket_code" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."manual_checkout_ticket_resum_25" enable row level security;

CREATE UNIQUE INDEX manual_checkout_ticket_resum_25_pkey ON public.manual_checkout_ticket_resum_25 USING btree (id);

alter table "public"."manual_checkout_ticket_resum_25" add constraint "manual_checkout_ticket_resum_25_pkey" PRIMARY KEY using index "manual_checkout_ticket_resum_25_pkey";

grant delete on table "public"."manual_checkout_ticket_resum_25" to "anon";

grant insert on table "public"."manual_checkout_ticket_resum_25" to "anon";

grant references on table "public"."manual_checkout_ticket_resum_25" to "anon";

grant select on table "public"."manual_checkout_ticket_resum_25" to "anon";

grant trigger on table "public"."manual_checkout_ticket_resum_25" to "anon";

grant truncate on table "public"."manual_checkout_ticket_resum_25" to "anon";

grant update on table "public"."manual_checkout_ticket_resum_25" to "anon";

grant delete on table "public"."manual_checkout_ticket_resum_25" to "authenticated";

grant insert on table "public"."manual_checkout_ticket_resum_25" to "authenticated";

grant references on table "public"."manual_checkout_ticket_resum_25" to "authenticated";

grant select on table "public"."manual_checkout_ticket_resum_25" to "authenticated";

grant trigger on table "public"."manual_checkout_ticket_resum_25" to "authenticated";

grant truncate on table "public"."manual_checkout_ticket_resum_25" to "authenticated";

grant update on table "public"."manual_checkout_ticket_resum_25" to "authenticated";

grant delete on table "public"."manual_checkout_ticket_resum_25" to "service_role";

grant insert on table "public"."manual_checkout_ticket_resum_25" to "service_role";

grant references on table "public"."manual_checkout_ticket_resum_25" to "service_role";

grant select on table "public"."manual_checkout_ticket_resum_25" to "service_role";

grant trigger on table "public"."manual_checkout_ticket_resum_25" to "service_role";

grant truncate on table "public"."manual_checkout_ticket_resum_25" to "service_role";

grant update on table "public"."manual_checkout_ticket_resum_25" to "service_role";


