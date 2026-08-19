# CamelShoes

## Integrantes

- Pedro Trovo

## Sobre o produto

CamelShoes é uma linha fictícia de ferraduras projetadas especificamente para camelos — com foco em resistência em ambientes desérticos, conforto e fixação profissional. Público alvo: caravaneiros, guias e criadores que precisam de equipamentos duráveis para longas rotas.

## Jornada de construção

### Ideia inicial

A ideia surgiu como um exercício criativo para a disciplina: criar um produto fictício e prototipar uma landing. Consideramos alternativas como acessórios de desertos para humanos, mas escolhemos ferraduras para camelos por ser inusitado e permitir criatividade visual.

### Pesquisa e referências

- Pesquisamos landing pages minimalistas (ex.: Apple) para hierarquia de conteúdo, uso de espaços e tipografia.
- Referências visuais: sites com product-led design, páginas de hardware e e-commerce minimal.

### Ferramentas utilizadas

- React (para protótipo navegável)
- Vite (configuração mínima do projeto)
- VS Code / OpenCode
- Geração de SVGs simples manualmente (para entregas rápidas)
- Unsplash (consulta visual durante prototipagem)

### Uso de IA

- GPT foi utilizado para acelerar a escrita do README, estruturação do conteúdo e gerar partes do código base em React (componentes, organização e sugestões de UX).
- Decisões finais e ajustes de estilo foram feitos manualmente.

### Evolução da solução

- Começamos com uma versão estática (HTML/CSS). Em seguida convertimos para React para atender ao requisito da entrega.
- Ajustes: maior tipografia no hero, animação sutil no produto, cards com hover e modal para o CTA.
- Imagens: substituímos imagens remotas por SVGs locais gerados para entregar rapidamente.

### Resultado final

Protótipo navegável em React com:

- Identidade visual (paleta roxa)
- Hero com produto em destaque
- Benefícios, funcionamento e prova social
- Preços simulados e CTA funcional (modal / fila / simulação de compra)
- FAQ simples
 - FAQ simples

Se tivéssemos mais tempo: substituir SVGs por fotos reais, adicionar formulários com validação, melhorar animações e preparar deploy contínuo no GitHub Pages.

## Preços (simulados)

- Desert Pro — R$ 349,00
- Long Ride — R$ 699,00
- Custom — R$ 1.499,00

## Observações sobre imagens


As imagens do protótipo agora usam fotos reais locais (JPG) em public/images. Substituí as ilustrações pelas fotos que você forneceu e salvei os arquivos com nomes usados pelo app — o comportamento agora é totalmente local e não depende de fontes remotas.

Arquivos de imagem utilizados atualmente (em public/images):

- hero-hi.jpg (hero / Custom)
- desert-pro-hi.jpg (Desert Pro)
- long-ride-hi.jpg (Long Ride)
- camel-testimonial-hi.jpg (Testimonial)
- desert-pro2.jpg, long-ride2.jpg, hero.jpg, camel-testimonial.jpg (fallbacks/alternativas já presentes)

Se quiser substituir por outras fotos, envie os arquivos ou URLs diretos e eu atualizo o repositório.

Observação sobre fontes

SF Pro (a fonte da Apple) é proprietária e não pode ser incluída no repositório. O projeto está configurado para preferir as fontes do sistema (ex.: SF Pro em macOS) e usar Inter como fallback. Se você quiser que eu incorpore SF Pro localmente, você pode colocar os arquivos de fonte (.woff/.ttf) em public/fonts e eu atualizo o CSS para carregá-las via @font-face — mas é sua responsabilidade garantir a licença/autorizações para usá-las.

Como usar SF Pro localmente (opcional):
1. Coloque os arquivos SF Pro (.woff2/.woff/.ttf) em public/fonts
2. Se quiser, me diga os nomes dos arquivos e eu atualizo src/styles.css com @font-face e a prioridade para as fontes.

Imagens locais incluídas

Execute .\download-images.ps1 para baixar imagens públicas do Wikimedia/LoremFlickr. Alguns downloads podem falhar por limitações de rede; o script já trouxe algumas imagens para public/images automaticamente quando possível.

Arquivos atualmente em public/images (exemplos que o app usa localmente):
- hero.jpg
- desert-pro2.jpg
- long-ride2.jpg
- camel-testimonial.jpg

Se quiser que eu substitua qualquer uma das imagens por outra foto (melhor enquadramento, resolução ou composição), me envie as URLs diretas ou os arquivos e eu faço a troca.
