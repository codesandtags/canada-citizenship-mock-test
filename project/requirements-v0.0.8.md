# Canada Citizenship Mock Test - V0.0.8

## Database Migration: Local PostgreSQL to Supabase

To migrate the database connection from local PostgreSQL to Supabase, follow these steps:

### 1. Configure Supabase Project
- Create a new project on the [Supabase Dashboard](https://supabase.com/dashboard).
- Navigate to **Project Settings > Database**.
- Under **Connection string**, obtain:
  - **Transaction mode (Pooler):** Use this for `DATABASE_URL` (usually port 6543).
  - **Direct connection (Direct mode):** Use this for `DIRECT_URL` (usually port 5432).

### 2. Update Environment Variables (`.env`)
Update your `.env` file with the new connection strings:
```env
# Supabase Transaction Pooler URL (recommended for Prisma in serverless)
DATABASE_URL="postgres://[user].[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase Direct Connection URL (for migrations and seeding)
DIRECT_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```
*Note: Ensure to include `pgbouncer=true` and `connection_limit=1` for the transaction pooler if using Prisma.*

### 3. Update Prisma Schema (`prisma/schema.prisma`)
Modify the `datasource db` block to use both `url` and `directUrl`:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 4. Sync Database Schema
Apply your existing schema to the new Supabase database:
```bash
npx prisma db push
```

### 5. Seed the New Database
Populate the Supabase database with the mock exam data and questions:
```bash
# Ensure you have tsx installed or use the script defined in package.json
npm run seed
```

### 6. Verification
- Restart the development server: `npm run dev`.
- Run through a mock test to ensure questions load from Supabase and results are correctly saved to the `QuizResult` table in Supabase.
- Verify the data in the Supabase Table Editor.

### 7. Production Deployment
- Update the environment variables in your production hosting platform (e.g., Vercel) with the Supabase connection strings.
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are also set if using Supabase Auth or other client-side features.
