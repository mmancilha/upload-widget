# 📤 Upload Widget Web

Widget moderno para upload de imagens com compressão automática, progresso em tempo real e integração com Cloudflare R2.

> Design completo disponível no [Figma](https://www.figma.com/design/8ZgQJHrPJGNmtwzsxEYMTH/Widget-de-Upload--Community-?node-id=3-809&m=dev)

## 🚀 Funcionalidades

### ✨ Principais Recursos

- **📁 Upload Múltiplo**: Arraste e solte múltiplos arquivos simultaneamente
- **🗜️ Compressão Automática**: Reduz automaticamente o tamanho das imagens para WebP
- **📊 Progresso em Tempo Real**: Acompanhe o progresso de cada upload individualmente
- **🎨 Interface Moderna**: Design dark mode com animações suaves
- **📱 Responsivo**: Funciona perfeitamente em diferentes tamanhos de tela
- **🔄 Retry Automático**: Tente novamente uploads que falharam
- **📥 Download**: Baixe os arquivos comprimidos diretamente
- **🔗 Copiar URL**: Copie a URL pública do arquivo para compartilhar
- **❌ Cancelamento**: Cancele uploads em andamento a qualquer momento
- **📋 Estados Visuais**: Diferentes estados para progresso, sucesso, erro e cancelado

### 🎯 Estados do Widget

- **Widget Expandido**: Mostra dropzone, lista de arquivos e controles completos
- **Widget Minimizado**: Versão compacta quando fechado
- **Upload em Progresso**: Barra de progresso circular global e por arquivo
- **Drag & Drop Ativo**: Feedback visual quando arrastando arquivos

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações fluidas
- **Zustand** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **Radix UI** - Componentes acessíveis (Collapsible, Progress, ScrollArea)
- **React Dropzone** - Drag & drop de arquivos
- **Lucide React** - Ícones modernos

### Backend

- **Fastify** - Framework web rápido
- **AWS SDK** - Integração com Cloudflare R2 (S3-compatible)
- **Zod** - Validação de schemas
- **TypeScript** - Tipagem estática

## 🚀 Como Usar

### Pré-requisitos

- **Node.js** 18+
- **pnpm** instalado globalmente

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/mmancilha/upload-widget.git
cd upload-widget
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente no `server/.env`:

```env
CLOUDFLARE_ACCESS_KEY_ID=seu_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=seu_secret_key
CLOUDFLARE_BUCKET=nome_do_bucket
CLOUDFLARE_ACCOUNT_ID=seu_account_id
CLOUDFLARE_PUBLIC_URL=https://seu_dominio.com
```

### Executando a Aplicação

```bash
# Executar frontend e backend simultaneamente
pnpm dev

# Ou executar separadamente
pnpm dev:server  # Backend (porta 3333)
pnpm dev:web     # Frontend (porta 5173)
```

## 📖 Como Funciona

1. **Seleção**: Arraste e solte arquivos PNG/JPG (máx. 4MB) na área de dropzone
2. **Compressão**: Imagens são automaticamente comprimidas para WebP (máx. 1000x1000px, qualidade 80%)
3. **Upload**: Arquivo comprimido é enviado para o backend com progresso em tempo real
4. **Finalização**: URL pública é gerada e disponibilizada para download ou compartilhamento

### Estados dos Uploads

- **🔄 Progress**: Upload em andamento
- **✅ Success**: Upload concluído com sucesso
- **❌ Error**: Erro durante o upload
- **⏸️ Canceled**: Upload cancelado pelo usuário

---

Made with ❤️ by Maycon Mancilha • Software Engineer
