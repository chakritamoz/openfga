# OpenFGA + Next.js Setup

## Start Services

From the repo root:

```bash
docker compose up -d
```

This starts:

- Next.js: http://localhost:3000
- OpenFGA API: http://localhost:8090
- OpenFGA Playground: http://localhost:8092
- Postgres for the app
- Postgres for OpenFGA

## Create OpenFGA Store

From `client/`, run the setup script against the OpenFGA port exposed on your host:

```bash
FGA_API_URL=http://localhost:8090 pnpm tsx script/setup-openfga-store.ts
```

The script creates:

- an OpenFGA store
- a simple authorization model with `user` and `group`
- one demo tuple: `user:demo` is `admin` of `group:demo`

It prints values like:

```bash
FGA_STORE_ID=...
FGA_MODEL_ID=...
FGA_DEMO_CHECK=true
```

## Configure Next.js

Put the printed values in `client/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/mydb?schema=public"

FGA_API_URL="http://openfga:8080"
FGA_STORE_ID="..."
FGA_MODEL_ID="..."
```

Use `http://openfga:8080` when Next.js runs inside Docker.
Use `http://localhost:8090` when running scripts from your host machine.

## Check It

Open:

```text
http://localhost:3000/api/fga-demo
```

Expected response:

```json
{"allowed":true}
```

## Use In Server Code

```ts
import { canUser } from "@/lib/openfga";

const allowed = await canUser("demo", "admin", "group:demo");
```

Keep OpenFGA calls server-side only: route handlers, server actions, or server components.
