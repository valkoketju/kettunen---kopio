# AI-assistentin käyttöönotto GitHub Pagesissa

## Vaihe 1: Supabase-projektin valmistelu

1. **Luo Supabase-projekti** (jos ei ole vielä tehty):
   - Mene osoitteeseen https://supabase.com
   - Luo uusi projekti tai käytä olemassa olevaa
   - Kirjaa ylös projektin URL ja anon key

2. **Ota Supabase Edge Functions käyttöön**:
   - Asenna Supabase CLI: `npm install -g supabase`
   - Kirjaudu sisään: `supabase login`
   - Linkitä projekti: `supabase link --project-ref urloegfvkujvfgsbderw`
   - Deploy edge function: `supabase functions deploy ai-assistant`

3. **Aseta LOVABLE_API_KEY**:
   - Mene Supabase dashboardiin
   - Valitse Edge Functions > ai-assistant
   - Lisää secrets-osioon: `LOVABLE_API_KEY=your_lovable_api_key`

## Vaihe 2: GitHub Secrets -konfiguraatio

1. Mene GitHub-repositoryn asetuksiin
2. Valitse "Secrets and variables" > "Actions"
3. Lisää seuraavat secrets:
   - `VITE_SUPABASE_URL`: Supabase-projektin URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Supabase anon key

### Supabasen CI-integraatio (migraatiot + funktiot)

Lisätty workflow `/.github/workflows/supabase.yml` hoitaa automaattisesti:
- Tietokantamigraatioiden ajon (Supabase CLI: `db push`)
- Edge-funktion (`ai-assistant`) deployn

Lisää seuraavat GitHub-secretsit:
- `SUPABASE_ACCESS_TOKEN`: Supabasen henkilökohtainen access token
  - Luo osoitteessa: Supabase Dashboard > Account > Access Tokens > New Token
- `SUPABASE_PROJECT_ID`: Projektisi ref (esim. `urloegfvkujvfgsbderw`)
  - Löytyy `supabase/config.toml` tai Supabase Dashboardista (Project settings)

Valinnaiset (jos haluat asettaa AI-secretsit CI:n kautta):
- `AI_API_URL`: esim. `https://openrouter.ai/api/v1/chat/completions`
- `AI_API_KEY`: palvelun API-avain
- `AI_MODEL`: esim. `openai/gpt-4o-mini`

Kun secretsit on asetettu, workflow käynnistyy automaattisesti pushissa ja:
1) Puskee `supabase/migrations/**` muutokset DB:hen
2) Asettaa AI-secretsit Supabaseen (jos määritetty)
3) Deployaa `ai-assistant`-funktion

## Vaihe 3: GitHub Pages -käyttöönotto

1. Mene repositoryn Settings > Pages
2. Valitse Source: "GitHub Actions"
3. Push muutokset main-branchiin
4. Workflow käynnistyy automaattisesti

## Vaihe 4: Testaus

1. Odota että deployment valmistuu
2. Avaa GitHub Pages -sivusto
3. Testaa AI-assistentti klikkaamalla chat-ikonia
4. Varmista että viestit toimivat oikein

## Tärkeää huomioida

- AI-assistentti vaatii Lovable API -avaimen toimiakseen
- Supabase Edge Functions on maksullinen ominaisuus
- Varmista että kaikki environment-muuttujat on asetettu oikein
- Jos AI-assistentti ei toimi, tarkista browser console virheviestien varalta

## Vianmääritys

Jos AI-assistentti ei toimi:
1. Tarkista GitHub Actions -logi virheviestien varalta
2. Varmista että Supabase secrets on asetettu oikein
3. Testaa edge function suoraan Supabase dashboardista
4. Tarkista browser console network-välilehti API-kutsujen varalta

5. CI-virheet Supabase-vaiheessa:
   - "Not authenticated": varmista `SUPABASE_ACCESS_TOKEN` on asetettu
   - "Project not found": tarkista `SUPABASE_PROJECT_ID`
   - "Permission denied": varmista tokenin oikeudet ja että projekti kuuluu tilillesi

## Vaihtoehtoiset AI-palvelut

Voit käyttää mitä tahansa OpenAI-yhteensopivaa rajapintaa (OpenAI, OpenRouter, Groq). Edge-funktio on refaktoroitu lukemaan seuraavat ympäristömuuttujat:

- `AI_API_URL`: Chat Completions -endpoint (esim. `https://api.openai.com/v1/chat/completions`, `https://openrouter.ai/api/v1/chat/completions`, `https://api.groq.com/openai/v1/chat/completions`)
- `AI_API_KEY`: Palvelun API-avain
- `AI_MODEL`: Malli (esim. `gpt-4o-mini`, `openai/gpt-4o-mini`, `llama-3.1-8b-instant`)

Jos näitä ei ole asetettu, funktio käyttää oletuksena Lovable gatewayta ja mallia `google/gemini-2.5-flash`. 

### Secrets asettaminen Supabasessa

Vaihtoehto A: Dashboard
- Avaa Supabase-projektisi
- Edge Functions > ai-assistant > Secrets
- Lisää: `AI_API_URL`, `AI_API_KEY`, `AI_MODEL`

Vaihtoehto B: Supabase CLI
- Asenna ja kirjaudu: `npm i -g supabase && supabase login`
- Linkitä projekti: `supabase link --project-ref urloegfvkujvfgsbderw`
- Aseta salaisuudet: `supabase secrets set AI_API_URL="https://openrouter.ai/api/v1/chat/completions" AI_API_KEY="PASTE_YOUR_KEY" AI_MODEL="openai/gpt-4o-mini"`
- Deployaa funktio: `supabase functions deploy ai-assistant`

### Huomio streamauksesta
- Frontend lukee OpenAI-tyylisen SSE-virran (`choices[0].delta.content`), joten OpenAI/OpenRouter/Groq toimivat ilman muutoksia.
- Jos käytät muuta rajapintaa, huolehdi että vastauksen muoto on yhteensopiva.

## Uusi taulu: ai_messages

Frontend kirjaa AI-keskustelun viestit Supabaseen tauluun `ai_messages`:

- Skeema:
  - `id` bigint identity (primary key)
  - `session_id` text (localStorage: `ai_session_id`)
  - `role` text (`user` | `assistant`)
  - `content` text
  - `created_at` timestamptz default now()

- RLS (Row Level Security):
  - Insert sallitaan anon & authenticated -rooleille
  - Select ei ole sallittu oletuksena (viestejä ei voi lukea julkisesti)
  - Admin voi lukea palveluroolilla (service role key) tai erillisillä policyeilla

Migraatio löytyy: `supabase/migrations/20251027120000_create_ai_messages.sql`

### Ympäristömuuttujat
- Frontend tarvitsee vain `VITE_SUPABASE_URL` ja `VITE_SUPABASE_PUBLISHABLE_KEY`
- Edge Function voi käyttää palveluroolin avainta (valinnainen): `SUPABASE_SERVICE_ROLE_KEY` jos haluat logituksen serveriltä