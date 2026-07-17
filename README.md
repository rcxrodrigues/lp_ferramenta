# TOOLVO — Drill offer capture page

Landing page de **captura** (não é página de vendas) estática (HTML/CSS/JS
puros, sem build, sem dependências) para captar leads (nome, sobrenome,
e-mail) para a oferta da furadeira Stanley 20V, em inglês britânico, para o
mercado do Reino Unido. Identidade visual (laranja `#E25500`, preto, branco)
seguindo a paleta de https://toolvo.shop.

A página é intencionalmente enxuta: só topo + bloco único de imagem/copy/
formulário + rodapé. Nada de seções de venda (features, "o que vem na
caixa", FAQ, depoimentos, múltiplos CTAs) — o único objetivo da página é
capturar o lead.

## Estrutura

```
index.html                     página inteira (HTML/CSS + lógica do formulário)
assets/                        imagens do produto
snippets/lead-config.js        credenciais da plataforma de e-mail (Mailchimp/ActiveCampaign/Klaviyo)
snippets/head-code.js          códigos de rastreamento pro <head> (GTM, GA4, Meta Pixel, etc.)
snippets/body-end-code.js      códigos de rastreamento pro final do <body>
```

Você não precisa editar o `index.html` para configurar plataformas de
e-mail ou instalar ferramentas de rastreamento — tudo isso fica isolado
nos 3 arquivos dentro de `snippets/`, descrito em detalhe mais abaixo em
["Códigos de rastreamento e de terceiros"](#códigos-de-rastreamento-e-de-terceiros).

## Antes de publicar

- [ ] **Adicionar a imagem do produto**: salve a foto da furadeira como
      `assets/product-drill.jpg` (o `index.html` já referencia esse caminho
      em `<img src="assets/product-drill.jpg">`, dentro da seção hero).
- [ ] **Escolher a plataforma de e-mail** e preencher `snippets/lead-config.js`
      — veja o passo a passo abaixo.
- [ ] **Instalar ferramentas de rastreamento** (Google Tag Manager, Meta
      Pixel, GA4, etc.), se for usar — veja a seção específica mais abaixo.
- [ ] Revisar o texto de "oferta exclusiva" — hoje a copy é intencionalmente
      genérica (sem % ou preço fixo) porque nenhum valor de desconto real foi
      informado. Se quiser citar um número específico, adicione-o no `<h1>`
      e no `<p class="lead">` da seção hero.
- [ ] Preencher os campos `[PREENCHER SE APLICÁVEL]` e `[SEU E-MAIL DE
      CONTATO]` em `privacy.html` e `terms.html` (número de empresa, se
      tiver, e um e-mail de contato real).
- [ ] Conferir/trocar o nome da marca "TOOLVO" (aparece no topo, rodapé,
      `privacy.html` e `terms.html`) caso você use um nome de loja diferente.
- [ ] Ver a seção ["Marca registrada e risco de bloqueio no Google
      Ads"](#marca-registrada-e-risco-de-bloqueio-no-google-ads) antes de
      rodar anúncios.

## Marca registrada e risco de bloqueio no Google Ads

Páginas que citam o nome de uma marca (Stanley) junto com desconto e senso
de urgência são exatamente o padrão que o Google (e outras redes de
anúncio) associam a golpes de produto falsificado/réplica. Como o modelo
real dessa página é **cupom/redirecionamento** — você não vende nem entrega
o produto, só manda um código de desconto pra comprar em um varejista de
verdade — várias mudanças foram feitas pra deixar isso claro e reduzir o
risco de reprovação:

- **Aviso de independência visível na dobra principal** (não só escondido
  no rodapé): a página deixa claro que a TOOLVO não é a Stanley, não é
  afiliada nem revendedora autorizada.
- **Removidas as afirmações "Genuine Stanley" e "UK stock & delivery"** —
  elas eram literalmente falsas nesse modelo (a TOOLVO não garante
  autenticidade nem estoca/entrega nada; quem faz isso é o varejista) e são
  exatamente o tipo de frase que reforça o padrão de página falsa aos olhos
  do Google.
- **Copy trocada de "exclusive offer/price" pra "exclusive TOOLVO discount
  code"** — deixa claro que o desconto vem da TOOLVO (como serviço de
  cupons), não é uma promoção "oficial" da Stanley.
- **Rodapé com disclosure de afiliado, identidade legal e endereço**,
  explicando que a TOOLVO pode ganhar comissão e que quem processa a venda
  de fato é o varejista.
- **`privacy.html` e `terms.html` reais** (antes o link de política de
  privacidade ia pra `#`) — Google Ads exige uma política de privacidade
  funcional em qualquer página que colete dados pessoais via anúncio, e uma
  página "aberta" sem isso já é motivo de reprovação por si só.

**O que ainda vale revisar com atenção, além do que já foi ajustado:**

- **Direitos de imagem**: a foto de estúdio (`assets/product-drill.jpg`)
  pode ser uma foto de catálogo/varejista, não seu próprio material — usar
  fotografia de produto de terceiros sem permissão é um risco de direito
  autoral separado do risco de "produto falso". Se puder, prefira fotos que
  você mesmo tirou (como `product-drill-2.jpg`) ou confirme que tem
  permissão de uso da foto de estúdio.
- **Anúncios (não só a landing page)**: o texto do anúncio em si (headline,
  descrição) também precisa evitar implicar parceria oficial com a Stanley
  — o Google avalia o anúncio e a página como um conjunto.
- **Nome de domínio**: evite registrar um domínio que inclua "stanley" ou
  "fatmax" — isso por si só já é motivo comum de suspensão por uso de marca
  registrada no domínio.
- **Consistência entre o que a página promete e o que o varejista de
  destino realmente oferece**: se o código/link levar pra uma oferta
  diferente da anunciada aqui, isso conta como "misrepresentation" nas
  políticas do Google Ads.

## Como o formulário funciona

O formulário tem 3 campos (`First name`, `Last name`, `Email address`) mais
uma checkbox de consentimento obrigatória (necessária para conformidade com
UK GDPR/PECR em e-mail marketing) e um campo honeypot invisível
(`website`) para bloquear bots simples.

Em `snippets/lead-config.js` existe um bloco `LEAD_CONFIG` com uma opção
`provider` que pode ser `'mailchimp'`, `'activecampaign'` ou `'klaviyo'`.
Configure **apenas uma** das três plataformas — a que você for usar — e
ajuste o `provider` para o valor correspondente. Esse é o único arquivo
que você precisa editar para trocar de plataforma de e-mail.

```js
const LEAD_CONFIG = {
  provider: 'mailchimp', // troque para 'activecampaign' ou 'klaviyo'
  mailchimp: { ... },
  activecampaign: { ... },
  klaviyo: { ... }
};
```

### 1. Mailchimp

1. No Mailchimp, vá em **Audience → Signup forms → Embedded forms**.
2. Escolha o estilo "Naked" (sem CSS) só para pegar a URL de ação do
   formulário gerado — você vai encontrar uma tag `<form action="https://...list-manage.com/subscribe/post?u=...&id=...&f_id=..." ...>`.
3. Copie essa URL completa e cole em `LEAD_CONFIG.mailchimp.action`.
4. No mesmo HTML gerado pelo Mailchimp, procure o campo escondido
   anti-spam, algo como `<input type="text" name="b_XXXXXXXX_XXXXXXXX" ...>`.
   Copie o `name` (formato `b_<u>_<id>`) e cole em
   `LEAD_CONFIG.mailchimp.botFieldName`.
5. Pronto — o formulário já envia `FNAME`, `LNAME` e `EMAIL`, que são os
   nomes padrão dos merge fields do Mailchimp.

### 2. ActiveCampaign

1. No ActiveCampaign, vá em **Forms → crie ou abra um formulário → Integrate
   tab → Raw HTML**.
2. No HTML gerado, copie a URL do atributo `action` do `<form>`
   (algo como `https://SEUACCOUNT.activehosted.com/proc.php`) e cole em
   `LEAD_CONFIG.activecampaign.action`.
3. Ainda nesse HTML, copie os valores dos campos escondidos `u`, `f`, `s`,
   `c`, `m`, `act` e `v` e cole nos respectivos campos dentro de
   `LEAD_CONFIG.activecampaign.hidden`.
4. O formulário já envia `first_name`, `last_name` e `email` — se sua conta
   usar nomes de campo customizados diferentes, ajuste os nomes dentro da
   função de submit no `index.html` (procure por `activecampaign` no
   `<script>`).

### 3. Klaviyo

1. No Klaviyo, vá em **Settings → API Keys** e copie a **Public API Key**
   (também chamada de `company_id`). Cole em
   `LEAD_CONFIG.klaviyo.publicApiKey`.
2. Vá em **Lists & Segments**, abra (ou crie) a lista para a qual os leads
   devem ir, e copie o **List ID** (aparece na URL ou em Settings da lista).
   Cole em `LEAD_CONFIG.klaviyo.listId`.
3. Pronto — o formulário usa a Klaviyo Client API
   (`https://a.klaviyo.com/client/subscriptions`), que é pública e não exige
   chave privada nem backend.

> Se quiser rodar mais de uma plataforma ao mesmo tempo (ex: gravar no
> Klaviyo e também no Mailchimp), dá pra duplicar a lógica de submit no
> `<script>` do `index.html` — hoje o código só envia para o `provider`
> ativo, para manter simples.

## Códigos de rastreamento e de terceiros

Pra instalar Google Tag Manager, Google Analytics/GA4, Meta Pixel, pixels
do TikTok/Pinterest, widgets de chat, ou qualquer outro código de
terceiros, você **não precisa editar o `index.html`**. Existem 3 pontos de
inserção, cada um no seu próprio arquivo:

| Onde cola | Arquivo | Pra que serve |
|---|---|---|
| Dentro do `<head>` | `snippets/head-code.js` | GTM, GA4, Meta Pixel, verificação de domínio, etc. |
| Logo após `<body>` | direto no `index.html`, no comentário `CÓDIGO "NO-JS"` | Só o `<noscript>` do Google Tag Manager (exceção — veja abaixo) |
| Antes de fechar `</body>` | `snippets/body-end-code.js` | Widgets de chat, pixels de remarketing tardios |

**Como usar `head-code.js` e `body-end-code.js`:** abra o arquivo e cole o
código completo — exatamente como a plataforma te entregou, com a tag
`<script>` e tudo — dentro do `` document.write(`...`) ``, entre os acentos
graves. Pode colar mais de um código no mesmo arquivo, um em seguida do
outro. Não precisa aprender nada de JavaScript: é copiar e colar no lugar
certo.

**Por que o `<noscript>` do GTM é diferente:** o Google Tag Manager pede
dois trechos — um `<script>` (que vai em `head-code.js`, normalmente) e um
`<noscript><iframe ...></iframe></noscript>` que precisa existir mesmo com
JavaScript desligado no navegador. Como os outros dois arquivos só
funcionam via JavaScript, esse trecho específico precisa ser colado direto
no HTML — o `index.html` já tem um comentário marcando exatamente onde,
logo depois da tag `<body>`.

## Aviso sobre o contador de escassez

A página tem um contador "N discount codes left today" perto do botão do
formulário (`#scarcityCount` em `index.html`). **Esse número é fictício** —
não está ligado a nenhum estoque real de cupons. Funciona em duas camadas:

- Um número inicial "do dia", que desce devagar de **86 (segunda-feira) a
  24 (domingo)** ao longo da semana, resetando toda segunda-feira às 00:00
  (horário de Londres) — é o mesmo pra todo mundo que visitar no mesmo
  momento.
- A partir desse número inicial, toda vez que a página carrega, o valor
  visível cai 1 a cada 2 segundos até chegar em **0**, onde para e fica
  parado pelo resto da visita.

**Atenção**: o formulário continua funcionando normalmente mesmo com "0
discount codes left" na tela — isso foi uma decisão explícita do dono do
site (confirmada em conversa), ciente de que fica uma contradição visível
pra quem prestar atenção (alternativas mais consistentes seriam resetar o
número sozinho ou desabilitar o formulário ao chegar em 0).

Ajuste `STOCK_START`/`STOCK_END` no `index.html` se quiser outra faixa de
números iniciais ou outra velocidade de queda.

Isso foi implementado a pedido explícito, mas veja o risco antes de rodar
tráfego pago pra essa página:

- No Reino Unido, as **Consumer Protection from Unfair Trading Regulations
  2008** (Schedule 1, item 7) listam "afirmar falsamente que um produto só
  estará disponível em quantidade/tempo muito limitado para forçar uma
  decisão imediata" como prática **automaticamente desleal** — não depende
  de provar prejuízo ao consumidor, é fiscalizável pela Trading
  Standards/CMA por definição.
- A política de **Misrepresentation** do Google Ads proíbe explicitamente
  "false urgency" (urgência falsa) em anúncios e landing pages.
- Isso vai na direção contrária do que foi ajustado na página pra evitar
  que ela pareça um golpe/produto falso (ver seção acima) — um contador de
  estoque falso é um dos sinais clássicos desse padrão.

Se quiser reduzir o risco depois, dá pra trocar por uma versão real: ligar
`STOCK_START` a um limite diário que você realmente respeita (ex: parar de
enviar o código depois de N leads no dia, puxando a contagem real de
cadastros do Klaviyo), em vez de um número calculado só pela hora.

## Integração completa com a Klaviyo (captação + rastreamento)

Além do script de rastreamento onsite (em `snippets/head-code.js`) e do
envio do formulário pra API de subscription da Klaviyo (que é o que
efetivamente cadastra o lead com consentimento — já implementado desde o
início), o `index.html` agora também chama, assim que alguém envia o
formulário com sucesso (em qualquer uma das 3 plataformas de e-mail
configuradas, não só quando o `provider` é `'klaviyo'`):

```js
klaviyo.identify({
  email: '...',
  first_name: '...',
  last_name: '...'
});
klaviyo.track('Submitted Lead Form', {
  gclid: '...', utm_source: '...', utm_medium: '...', utm_campaign: '...'
});
```

Isso segue o padrão recomendado pela própria Klaviyo pra integrações sem
app pronto ([guia de integração
customizada](https://developers.klaviyo.com/en/docs/guide_to_integrating_a_platform_without_a_pre_built_klaviyo_integration),
[JavaScript API](https://developers.klaviyo.com/en/docs/javascript_api)):

- **`klaviyo.identify(...)`** liga a sessão de navegação anônima
  (rastreada pelo script onsite desde que a pessoa entrou na página) ao
  perfil real dela — sem isso, o comportamento de navegação antes do
  cadastro fica "solto", associado só a um cookie anônimo, mais difícil de
  cruzar com o perfil depois.
- **`klaviyo.track('Submitted Lead Form', ...)`** registra um evento
  específico (separado da assinatura em si) que você pode usar em flows,
  segmentos e relatórios da Klaviyo — e já vai com `gclid`/UTMs, então dá
  pra criar segmentos por origem de campanha direto na Klaviyo.
- Isso é só rastreamento/enriquecimento de perfil — quem garante o
  consentimento de marketing continua sendo a chamada de subscription que
  já existia (`a.klaviyo.com/client/subscriptions`), não o `identify`.

Não precisa configurar nada a mais pra isso funcionar — já está ativo
automaticamente sempre que o script da Klaviyo estiver carregado (via
`snippets/head-code.js`), com uma checagem (`typeof klaviyo === 'undefined'`)
que evita erro caso você troque de plataforma de rastreamento no futuro.

## Rastreamento de lead e compra para o Google Ads

Como o modelo é cupom/redirecionamento (a compra acontece no site do
varejista, não aqui), existem dois eventos diferentes pra rastrear — e o
segundo é bem mais difícil que o primeiro.

### 1. Evento de lead (cadastro no formulário) — já implementado

Toda vez que alguém envia o formulário com sucesso — em qualquer uma das 3
plataformas de e-mail —, o `index.html` já dispara isto automaticamente:

```js
window.dataLayer.push({
  event: 'lead_form_submit',
  lead_email: '...'
});
```

Pra transformar isso numa conversão do Google Ads, o caminho mais simples
é via **Google Tag Manager** (que você já pode instalar em
`snippets/head-code.js`, como descrito acima):

1. No GTM, crie um **Trigger** do tipo "Custom Event" com nome do evento
   `lead_form_submit`.
2. Crie uma **Tag** do tipo "Google Ads Conversion Tracking", com o
   Conversion ID/Label da sua conta do Google Ads, usando esse trigger.
3. Publique o container do GTM.

Isso já basta pra otimizar campanhas do Google Ads pelo cadastro do lead.

### 2. Evento de compra (acontece no site do varejista) — mais complexo

Como a TOOLVO não processa a venda, não existe um "obrigado pela compra"
nesta página pra disparar um evento — a confirmação da compra só existe no
site do varejista, fora do seu controle. As opções realistas, da mais
simples pra mais completa:

**Opção A — Enhanced Conversions for Leads (recomendado pra esse modelo):**
No Google Ads, ative "Enhanced conversions for leads" na configuração da
sua ação de conversão. Quando você descobrir (via relatório do programa de
afiliados/varejista) que um lead específico comprou, você sobe uma linha
com o **e-mail dele** (com hash SHA-256, ou o Google Ads faz isso por você
na hora do upload) e a data/valor da compra, pela tela "Conversions >
Uploads" do Google Ads. O Google casa esse e-mail com o clique original
usando os próprios sinais deles — não depende de você ter guardado o
`gclid`.

**Opção B — Offline Conversion Import por `gclid`:** o `index.html` já
captura o `gclid` da URL (quando o Google Ads adiciona esse parâmetro
automaticamente ao link do anúncio) e envia como propriedade do perfil no
Klaviyo, junto com `utm_source`/`utm_medium`/`utm_campaign`. Assim, cada
lead na Klaviyo fica com o `gclid` daquele clique salvo. Quando souber quem
comprou, você sobe uma linha com esse `gclid` + data/hora + valor da compra
na mesma tela "Conversions > Uploads" do Google Ads.

**O elo que falta em ambas as opções — saber quem comprou de verdade:**
isso depende do que o varejista/programa de afiliados te dá de volta. Se
o programa de afiliados suportar um parâmetro de rastreamento próprio
(chamado de SubID, ClickID, ou similar, dependendo da rede — Awin, CJ
Affiliate, Impact, Amazon Associates, etc.), inclua o e-mail (ou um ID
único do lead) nesse parâmetro ao montar o link que você manda por e-mail
— assim o relatório de vendas da rede já vem com essa referência, e você
só precisa cruzar com o que salvou na Klaviyo antes de subir pro Google
Ads. Sem isso, a única forma de saber quem comprou é manualmente, cliente
a cliente.

Se isso for complexo demais pra começar, a prática mais comum em negócios
como esse é **otimizar o Google Ads só pelo evento de lead** (Opção 1
acima) e acompanhar a taxa de conversão lead → venda por fora, sem tentar
automatizar 100% o evento de compra desde o primeiro dia.

## Rodar localmente

Não precisa de servidor nem instalação — é só abrir o `index.html` no
navegador. Se preferir servir localmente:

```bash
python -m http.server 8080
# depois abra http://localhost:8080
```

Como os provedores de e-mail (Mailchimp/ActiveCampaign) fazem submit real
por POST, o teste completo do envio só funciona com o `LEAD_CONFIG`
preenchido com valores reais — mas o layout, os campos e as validações do
formulário podem ser testados localmente sem nenhuma configuração.

## Publicar no GitHub

```bash
# dentro desta pasta (drill-uk-leadgen)
git init
git add .
git commit -m "Landing page de captação — oferta furadeira UK"

# crie um repositório vazio em https://github.com/new (sem README/gitignore)
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git branch -M main
git push -u origin main
```

## Publicar na Vercel

**Opção 1 — pelo site (recomendado):**
1. Acesse https://vercel.com/new
2. Importe o repositório do GitHub que você criou
3. Framework Preset: "Other" (HTML estático é detectado automaticamente)
4. Deploy

**Opção 2 — pela CLI:**
```bash
npm install -g vercel
vercel        # gera uma URL de preview
vercel --prod # publica em produção
```

## Domínio próprio

Depois do deploy, em **Vercel → seu projeto → Settings → Domains**, adicione
seu domínio e siga as instruções de DNS mostradas na tela.
