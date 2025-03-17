# Livro de Bolso: Typescript e Desenvolvimento Moderno

Bem-vindo ao repositório deste guia avançado para Typescript e desenvolvimento de aplicações robustas. Este documento reúne conceitos, exemplos e reflexões fundamentais para aprimorar suas habilidades na linguagem, utilizando técnicas modernas e padrões de excelência.

> **Nota:** Para uma versão modernizada com formatação aprimorada, leia também o [livro typescript modernizado](livro_typescript_modernizado.md).

---

## Introdução

Este guia foi elaborado para levar você para além dos conceitos básicos do Typescript, explorando não só a sintaxe e funcionalidades da linguagem, mas também padrões arquiteturais, técnicas avançadas de desenvolvimento e práticas de refatoração. A ideia é fomentar uma compreensão profunda, com exemplos práticos e fragmentos de código que ilustram desde a implementação de funções simples de busca em textos até abordagens sofisticadas para processamento de dados em fluxo.

---

## Projetando Sua Aplicação

Ao projetar uma aplicação, é essencial contar uma boa história: identificar os atores e definir um cenário que possibilite a escalabilidade e manutenção do código. A seguir, veja um exemplo inicial que demonstra como implementar funções básicas de busca em textos usando Expressões Regulares:

### Exemplo: Busca de Texto

```js
'use strict';
const assert = require('assert');

function search(term, text) {
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));
```

Este trecho ilustra uma função simples que verifica se um termo existe em um determinado texto. À medida que a aplicação evolui, você poderá extender essa lógica para cobrir cenários mais complexos, como contabilizar ocorrências ou extrair trechos específicos do texto.

---

## Evolução dos Exemplos

Conforme avançamos, nossas funções se tornam mais robustas e adaptáveis. Veja a progressão para funções que contam ocorrências e realizam validações de entrada:

### Função para Contar Ocorrências
```js
'use strict';
const assert = require('assert');

function times(term, text) {
  return text.match(new RegExp(term, 'g')).length;
}
assert.equal(times('baz', 'bazfoobarbaz'), 2);
```

### Função para Validar e Extrair Combinações
```js
'use strict';
const assert = require('assert');

function match(term, text) {
  return text.match(new RegExp(term)).input;
}
assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
```

Esses fragmentos ilustram a evolução de uma simples validação para uma abordagem mais completa, onde cada função é testada e validada com asserts, garantindo a integridade do comportamento desejado.

---

## Abordagem por Camadas

Para organizar o código e facilitar a manutenção, o guia propõe a criação de uma classe que encapsula as operações de busca, contagem e extração. Essa abstração ajuda a centralizar a lógica e a aplicar melhorias de forma consistente:

```js
'use strict';
const assert = require('assert');

class Text {
  constructor(content) {
    this.content = content;
  }

  setContent(value) {
    this.content = value;
    return this;
  }

  getContent() {
    return this.content;
  }

  search(term) {
    return (new RegExp(term)).test(this.getContent());
  }

  times(term) {
    return this.getContent().match(new RegExp(term, 'g')).length;
  }

  match(term) {
    return this.getContent().match(new RegExp(term)).input;
  }
}

let txt = new Text('foobarbaz');
assert.ok(txt instanceof Text);
assert.equal(txt.getContent(), 'foobarbaz');
txt.setContent('foobarbazbuzz');
assert.ok(txt.search('buzz'));
```

Este exemplo demonstra a criação de uma classe simples que centraliza a lógica de manipulação de texto, permitindo futuras melhorias e refatorações sem impactar diretamente as funcionalidades testadas.

---

## Considerações Finais

Este guia é um convite para explorar e refinar suas habilidades com Typescript e abordagens de desenvolvimento modernas. Através da prática constante e da análise das mudanças, você poderá:
- Refatorar e otimizar funcionalidades existentes.
- Separar responsabilidades em módulos para um código mais limpo.
- Implementar testes robustos para garantir a qualidade do software.

Aproveite os exemplos, adapte-os ao seu contexto e mantenha a evolução do seu conhecimento e das suas implementações.

---

Explore mais no [Livro Typescript Modernizado](livro_typescript_modernizado.md).

[Livro antigo](https://github.com/ktfth/typescript-livro-de-bolso/tree/11af1d4966f01752ae9fbcb20a629f306e647a80)
