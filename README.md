# 📤 Upload Widget Web

Um widget moderno e funcional para upload de imagens com compressão automática, progresso em tempo real e integração com Cloudflare R2.

![Upload Widget Overview](docs/widget-overview.png)

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

## 📦 Estrutura do Projeto

```
upload-widget-web/
├── server/                 # Backend API
│   ├── src/
│   │   ├── server.ts      # Servidor Fastify
│   │   ├── routes/        # Rotas da API
│   │   ├── functions/     # Lógica de negócio
│   │   ├── storage/       # Provedores de armazenamento
│   │   └── env.ts         # Validação de variáveis de ambiente
│   └── package.json
│
├── web/                    # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── ui/       # Componentes base (Button, CircularProgressBar)
│   │   │   └── upload-widget-*.tsx
│   │   ├── store/        # Zustand store
│   │   ├── http/         # Cliente HTTP
│   │   ├── utils/        # Utilitários (compress, format, download)
│   │   ├── app.tsx       # Componente principal
│   │   └── main.tsx       # Entry point
│   └── package.json
│
├── package.json           # Workspace root
└── pnpm-workspace.yaml    # Configuração do workspace
```

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

#### Executar Frontend e Backend Simultaneamente
```bash
pnpm dev
```

#### Executar Apenas o Backend
```bash
pnpm dev:server
# ou
cd server && pnpm dev
```

#### Executar Apenas o Frontend
```bash
pnpm dev:web
# ou
cd web && pnpm dev
```

A aplicação estará disponível em:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3333

## 📖 Como Funciona

### Fluxo de Upload

1. **Seleção de Arquivos**
   - Arraste e solte arquivos na área de dropzone
   - Ou clique para abrir o seletor de arquivos
   - Apenas PNG e JPG são aceitos (máximo 4MB por arquivo)

2. **Compressão**
   - Cada imagem é automaticamente comprimida para WebP
   - Redimensionamento automático (máx. 1000x1000px)
   - Qualidade de compressão: 80%

3. **Upload**
   - Arquivo comprimido é enviado para o backend
   - Progresso é atualizado em tempo real
   - Barra de progresso mostra porcentagem e tempo estimado

4. **Finalização**
   - URL pública é gerada após upload bem-sucedido
   - Arquivo fica disponível para download
   - URL pode ser copiada para compartilhamento

### Estados dos Uploads

- **🔄 Progress**: Upload em andamento
- **✅ Success**: Upload concluído com sucesso
- **❌ Error**: Erro durante o upload
- **⏸️ Canceled**: Upload cancelado pelo usuário

## 🎨 Componentes Principais

### UploadWidget
Componente principal que gerencia o estado expandido/minimizado do widget.

**Recursos:**
- Animações suaves de expansão/colapso
- Borda animada quando há uploads em progresso
- Integração com store para estado global

### UploadWidgetDropzone
Área de drag & drop com feedback visual.

**Recursos:**
- Drag & drop de múltiplos arquivos
- Barra de progresso circular quando há uploads
- Feedback visual ao arrastar arquivos

### UploadWidgetUploadList
Lista de arquivos sendo processados.

**Recursos:**
- Scroll customizado com Radix ScrollArea
- Contador de arquivos
- Estado vazio quando não há uploads

### UploadWidgetUploadItem
Item individual de upload com controles.

**Recursos:**
- Barra de progresso por arquivo
- Informações de compressão (tamanho original vs comprimido)
- Botões de ação: Download, Copy URL, Retry, Cancel

## 🔧 Configuração

### Variáveis de Ambiente (Backend)

Crie um arquivo `.env` na pasta `server/`:

```env
CLOUDFLARE_ACCESS_KEY_ID=sua_chave_aqui
CLOUDFLARE_SECRET_ACCESS_KEY=sua_chave_secreta_aqui
CLOUDFLARE_BUCKET=nome_do_seu_bucket
CLOUDFLARE_ACCOUNT_ID=seu_account_id
CLOUDFLARE_PUBLIC_URL=https://seu_dominio_publico.com
```

### Portas

- **Frontend**: 5173 (configurável em `web/vite.config.ts`)
- **Backend**: 3333 (configurável em `server/src/server.ts`)

## 📝 Scripts Disponíveis

### Root
- `pnpm dev` - Executa frontend e backend simultaneamente
- `pnpm dev:server` - Executa apenas o backend
- `pnpm dev:web` - Executa apenas o frontend

### Frontend (web/)
- `pnpm dev` - Servidor de desenvolvimento
- `pnpm build` - Build de produção
- `pnpm preview` - Preview do build
- `pnpm lint` - Linter

### Backend (server/)
- `pnpm dev` - Servidor de desenvolvimento com hot reload

## 🎯 Funcionalidades Detalhadas

### Compressão de Imagens
- Conversão automática para WebP
- Redimensionamento inteligente mantendo proporção
- Redução média de 70-90% no tamanho do arquivo

### Gerenciamento de Estado
- Zustand com middleware Immer para estado imutável
- Map para armazenar múltiplos uploads simultâneos
- Hooks customizados para acesso otimizado ao estado

### Tratamento de Erros
- Retry automático para uploads falhados
- Mensagens de erro claras
- Estados visuais para diferentes tipos de erro

### Performance
- Upload progressivo com feedback em tempo real
- Cancelamento de uploads via AbortController
- Compressão assíncrona sem bloquear a UI

## 🤝 Contribuindo

Este projeto foi desenvolvido como parte de uma masterclass. Sinta-se à vontade para fazer fork e melhorar!

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🙏 Agradecimentos

- Design baseado no [Figma Community](https://www.figma.com/design/8ZgQJHrPJGNmtwzsxEYMTH/Widget-de-Upload--Community-)
- Desenvolvido durante a masterclass da Rocketseat

---

Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS
