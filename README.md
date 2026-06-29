# Upsell 1 — Caixa no Azul 30D

Página estática pronta para subir no GitHub e hospedar na Vercel.

## Estrutura

- `index.html` — página principal
- `styles.css` — identidade visual e responsividade
- `script.js` — configuração dos links do funil e eventos de clique
- `api/meta-capi.js` — endpoint serverless para enviar o evento personalizado para a API de Conversões da Meta sem expor o token no front-end
- `.env.example` — modelo das variáveis de ambiente
- `assets/` — imagem do produto e favicon

## Antes de publicar

1. Abra `script.js`.
2. Substitua:
   - `https://SEU-LINK-DE-UPSELL-AQUI.com` pelo link real de adicionar o Caixa no Azul 30D ao pedido.
   - `https://SEU-LINK-DE-RECUSA-OU-OBRIGADO-AQUI.com` pelo link de recusa/continuação do funil.
3. O vídeo Vturb/Converteai já foi inserido no bloco principal da página.
4. O script de preload do vídeo já foi inserido no `<head>`.

## Pixel e evento personalizado

Pixel instalado:

- `META_PIXEL_ID=311413340280663`

Eventos personalizados configurados no navegador:

- `ViewUpsellCaixaNoAzul30D` — disparado ao carregar a página
- `UpsellCaixaNoAzul30D_AdicionarAoPedido` — disparado ao clicar em aceitar/adicionar
- `UpsellCaixaNoAzul30D_RecusouOferta` — disparado ao clicar em recusar

## API de Conversões da Meta

Por segurança, o token da API de Conversões não fica dentro do HTML/JavaScript público. Configure na Vercel:

1. Vá em **Project Settings > Environment Variables**.
2. Crie:
   - `META_PIXEL_ID` com o valor `311413340280663`
   - `META_ACCESS_TOKEN` com o token APO fornecido pela Meta
3. Faça um novo deploy.

O endpoint `/api/meta-capi` envia o evento personalizado para a Meta usando o token pelo lado do servidor.

## Hospedagem na Vercel

1. Suba todos os arquivos deste diretório para um repositório no GitHub.
2. Na Vercel, importe o repositório.
3. Framework preset: `Other`.
4. Build command: deixe vazio.
5. Output directory: deixe vazio ou use `/`.
6. Configure as variáveis de ambiente descritas acima.

## Observações

- O valor configurado na página está como: de R$497 por R$347.
- O texto informa acesso por 1 ano e garantia incondicional de 7 dias.
- A página foi construída com a identidade visual do PMO combinada com a identidade do Caixa no Azul 30D.
