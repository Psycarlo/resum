# Remigration Summit

![here](public/og.png)

We unite Europe behind the vision of Remigration

[website](https://remigrationsummit.com)

## Getting Started

### Requirements

- [node](https://nodejs.org/en)
- [pnpm](https://pnpm.io/)
- [docker](https://www.docker.com/products/docker-desktop/)
- [supabase-cli](https://supabase.com/docs/guides/local-development/cli/getting-started)
- [stripe-cli](https://docs.stripe.com/stripe-cli)

### Environment

1. Create a .env.local file if you are going to develop locally

```
SUPABASE_URL=
SUPABASE_KEY=
```

Note: It's fine to commit these variables since we are using [RLS policies](https://supabase.com/docs/guides/database/postgres/row-level-security).

### Setup

1. Install dependencies

```bash
pnpm install
```

2. Run docker desktop

### Run

Run supabase

```bash
pnpm supabase:start
```

Run the app

```bash
pnpm dev
```

### Migrations

After modifying the database, you can run the supabase `diff` command to create a new migration:

```bash
pnpm supabase:diff -f <migration-name>
```

To push migrations to remote, run:

```bash
npx supabase db push
```

### Types

Generate database types:

```bash
pnpm supabase:gen-types
```

Use the `Database` type in the apps:

```ts
import type { Database } from '../types/database'

const client = useSupabaseClient<Database>()
```

### Functions

Create a new supabase `Edge Function` with the following command:

```bash
supabase functions new <name>
```

Learn more about supabase `Edge Functions` [here](https://supabase.com/docs/guides/functions/quickstart).

If you add new secrets, set the secrets present in the `.env` file with the following command:

```bash
supabase secrets set --env-file <path>
```

Example:

```bash
supabase secrets set --env-file ./supabase/functions/.env
```

Learn more about secrets [here](https://supabase.com/docs/guides/functions/secrets)

To see all the secrets which you have set remotely:

```bash
supabase secrets list
```

### Stripe

Listen to stripe events with stripe-cli

```bash
stripe listen --forward-to http://127.0.0.1:54321/functions/v1/stripe-checkout-session-completed-webhook --events=checkout.session.completed
```

### Deploy

Deployments are done automatically when code is pushed to the `main` branch.

For now, migrations do not run before deployment. You can to run them manually yourself.

1. Login into supabase

```bash
supabase login
```

2. Link the project

```bash
supabase link
```

3. Pushes all local migrations to the remote database.

```bash
supabase db push
```

To deploy functions:

```bash
supabase functions deploy
```

To deploy only one:

```bash
supabase functions deploy <name> --no-verify-jwt
```

Note: The jwt flag is optional

Learn more [here](https://supabase.com/docs/guides/functions/deploy)
