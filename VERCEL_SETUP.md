# Configuração na Vercel

Siga estes passos para configurar o deploy corretamente na Vercel.

## 1. Root Directory

**Importante:** Defina o **Root Directory** como **`web`** (pasta do frontend).

O projeto está estruturado em `web/`:
- `web/api/` — Serverless Functions (upload)
- `web/lib/` — Código compartilhado (R2)
- `web/src/` — Frontend Vite

## 2. Framework Preset

Selecione **Other** ou **Vite**. O `vercel.json` na raiz já define o build.

## 3. Build Settings

O `vercel.json` configura automaticamente:
- **Build Command:** `pnpm run build`
- **Output Directory:** `dist`
- **Install Command:** `pnpm install`

Não é necessário alterar nas configurações do projeto — o `vercel.json` tem prioridade.

## 4. Variáveis de Ambiente

Em **Settings > Environment Variables**, adicione:

| Variável | Descrição |
|----------|-----------|
| `CLOUDFLARE_ACCOUNT_ID` | ID da conta Cloudflare |
| `CLOUDFLARE_ACCESS_KEY_ID` | Access Key do R2 |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | Secret Key do R2 |
| `CLOUDFLARE_BUCKET` | Nome do bucket (ex: `upload-widget`) |
| `CLOUDFLARE_PUBLIC_URL` | URL pública do bucket (ex: `https://pub-xxx.r2.dev`) |

Copie os valores do seu arquivo `.env` local.

## 5. Deploy

Após configurar, clique em **Deploy**.

---

## Resumo Rápido

1. Root Directory: **`web`**
2. Framework: **Other** ou **Vite**
3. Adicionar as 5 variáveis Cloudflare R2
4. Deploy
