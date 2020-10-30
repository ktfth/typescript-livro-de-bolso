# Typescript

## Introdução

Este livro de bolso tem como objetivo, abordar conceitos avançados sobre a
linguagem em questão. Existem diversos recursos disponíveis para você começar a
programar com Typescript, mas este em especial vai te levar um pouco alem para
quem esta desejando ter suas habilidades polidas.

Uma linguagem nasce com um propósito dado a diversos fatores e o principal é a
necessidade de expandir as coisas que você desenvolve e foi para isto que esta
linguagem foi criada. Com recursos que muitos procuravam no Javascript, porque
Typescript é Javascript com tipos e transpilado. Sua compilação produz um código
que tem total compatibilidade com especificações já existentes em diversos
motores de execução.

Não vamos abordar configurações especificar por considerar que este guia seja,
avançado ou seja você deve saber como isto funciona para dar continuidade.
Entregaremos uma experiência bastante profunda para estudo e reflexão, contando
com padrões de projeção, desenvolvimento solido e segurança de suas aplicações.

## Projetando uma aplicação

Ao começarmos a projetar uma aplicação o mais importante em todas as etapas é
você saber contar uma historia envolvendo um ator, sendo ela de pequeno, médio
ou grande porte. Esta historia pode ser contada de acordo com os fatos que se
passam no desenvolvimento de um ecosistema inteiro. Nós daremos inicio em uma
aplicação por Javascript por ser assim que o Typescript deu inicio para
finalizarmos uma aplicação simples ou avançada. Todo desenvolvimento, tem uma
linha de raciocinio dado a possibilidade de sua inferencia lógica. E não estamos
falando da inferencia que ocorre do lado da compilação da linguagem.

Saber decidir quais algoritimos utilizar e quais padrões arquiteturais você pode
investir contra a projeção é importante. Como por exemplo uma ferramenta para
busca de texto em arquivos ou fluxos de dados, devemos começar por seu teste,
sabendo o que esperar de sua interface. Lembrando que você não deve despejar
tudo para fora, você deve contar a historia passo após passo até chegar em seu
nível mais avançado sabendo o que exatamente quer pensando em casos que
contemple até mesmo iterações de uso da mesma.

Você não deve ser groceiro e implementar algo pobre quando tem a devida
oportunidade, para isto você deve práticar todos os dias, disciplinas que
entreguem maior aptidão no uso de suas ferramentas. Desenhos são formas
interessantes de se conectar com a aplicação que você vai desenvolver, mas
normalmente tomam tempo, então salvo a dada cituação nós vamos mostrar como
fazer o uso adequado de todos os recursos presentes em Javascript e Typescript
por sua vez.

### Lógica de negócio - Busca por texto

Você deve pensar no seguinte quando esta desenvolvendo uma aplicação e a
quantidade de pessoas presente no projeto conta e a fragmentação das tarefas
devem estar bem claras para você dar continuidade, estimar tempo é um tarefa
extremamente dificil então optamos sempre por estimar dado a sua complexidade.
Você deve ter isto bem claro em sua mente, então vamos a primeira tarefa.

app.js

```
'use strict';

const assert = require('assert');

assert.ok(search('foo', 'foobar'));
```

Neste ponto eu poderia estimar que a complexidade desta tarefa é de um ponto com
o limite de oito pontos. O que devemos fazer e completar a criação do código
acima com uma implementação que cubra os requisitos da asserção. Lembrando que
temos em mente a busca de texto que pode ser muito mais do que o teste atual.
Mas precisamos iniciar a projeção e conforme evoluirmos com ela, cobriremos um
cenario maior que o atual. Executando este código nós teremos uma exceção
presente no nosso código que é o esperado.

```
'use strict';
const assert = require('assert');

function search(term, text) {
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));
```

Com este código nós temos a primeira fase do nosso código completa, então
podemos seguir executando o código e vendo que o teste passou, não vamos
permanecer com esta implementação por muito tempo, porque devemos passar de
fase o mais rápido possível. Temos uma função de busca que retorna um booleano e
agora teremos uma que retorna a quantidade de vezes que o termo aparece no texto
em inteiro.

```
'use strict';
const assert = require('assert');

function search(term, text) {
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));

assert.equal(times('baz', 'bazfoobarbaz'), 2);
```

Com isto feito podemos seguir, e devemos alcançar 3 funções principais para o
nosso programa que são:

* Search
* Times
* Match

É tudo o que precisamos para o comportamento básico de nossa aplicação.

```
'use strict';
const assert = require('assert');

function search(term, text) {
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));

function times(term, text) {
  return text.match((new RegExp(term, 'g'))).length;
}
assert.equal(times('baz', 'bazfoobarbaz'), 2);
```

Com isto nós temos duas de nossas funções implementadas, note que todas elas
fazem o uso de RegExp para retornar o comportamento esperado por seus testes.
Perceba que padrões estão surgindo para nós tirarmos vatagem de suas repetições.

```
'use strict';
const assert = require('assert');

function search(term, text) {
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));

function times(term, text) {
  return text.match((new RegExp(term, 'g'))).length;
}
assert.equal(times('baz', 'bazfoobarbaz'), 2);

assert.deepEqual(match('baz', 'foobarbaz'), 'foobarbaz');
```

Os pontos de complexidade foram um para cada uma das tarefas, por ser bastante
simples de cobrir os casos de uso, mas isto não significa que a tua aplicação
esta bem testada. Para garantirmos o funcionamento de uma aplicação nós devemos
ir além do esperado e cobrir casos com os devidos erros que ela deve retornar.

```
'use strict';
const assert = require('assert');

function search(term, text) {
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));

function times(term, text) {
  return text.match((new RegExp(term, 'g'))).length;
}
assert.equal(times('baz', 'bazfoobarbaz'), 2);

function match(term, text) {
  return text.match(new RegExp(term)).input;
}
assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
```

Após falharmos o código passou, e temos aqui um primeiro ponto de refatoração do
código que deve ser feito apenas quando tudo esta passando. Até aqui nada de
muito complexo foi encontrado mas temos uma quantidade de código consideravel.

Tendo em vista que nossa aplicação esta completamente mapeada por onde devemos
partir para chegarmos ao objetivo de termos uma aplicação de busca completa por
texto alguns avanços foram feitos, considerando que este guia avança para mostrar
uma nova perspectiva de como construir aplicações seguras e robustas. Este é o
código atual que vai receber varias novas implemntações mas esta é a completude
do mesmo.

```
'use strict';
const assert = require('assert');

function thrownArgumentException(text, term) {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

function search(term, text) {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));
assert.throws(() => {
  search(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});

function times(term, text) {
  thrownArgumentException(term, text);
  return text.match((new RegExp(term, 'g'))).length;
}
assert.equal(times('baz', 'bazfoobarbaz'), 2);
assert.throws(() => {
  times(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});

function match(term, text) {
  thrownArgumentException(term, text);
  return text.match(new RegExp(term)).input;
}
assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
assert.throws(() => {
  match(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});

class Text {
  constructor(content) {
    this.content = content;
    this.setContent = this.setContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.search = this.search.bind(this);
    this.times = this.times.bind(this);
    this.match = this.match.bind(this);
  }

  setContent(value) {
    this.content = value;
    return this;
  }

  getContent() {
    return this.content;
  }

  search(term) { return search(term, this.getContent()); }
  times(term) { return times(term, this.getContent()); }
  match(term) { return match(term, this.getContent()); }
}

let txt = new Text('foobarbaz');
assert.ok(txt instanceof Text);
assert.equal(txt.content, 'foobarbaz', 'Text content not settled');
assert.ok(txt.setContent('foobarbazbuzz') instanceof Text);
assert.equal(txt.getContent(), 'foobarbazbuzz');
assert.ok(txt.search('buzz'));
txt.setContent('fuzzbarfuzzbuzzfuzz');
assert.equal(txt.times('fuzz'), 3);
assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');
```

Aqui nos temos algumas verificações de entrada, implementação de uma classe de
texto para usufluirmos de funções mais polidas mesmo que seja considerado por
alguns que ela não seja uma boa abordagem, mas lembrando que estamos usando
para estudar afundo quais os pros e contras de se utilizar uma aplicação escrita
em Typescript. Temos que práticar desta forma para ter total controle e visão do
que estamos fazendo. Alguns padrões de projeção estão surgindo para termos uma
qualidade maior no reuso.

Você deve começar tudo em um mesmo lugar, mesmo que fique gigante o seu arquivo
até alcançar uma versão estavel do objetivo final, isto só vai beneficiar o seu
conhecimento do que esta acontecendo e se adaptar a diferentes tipos de
ambientes entregando maior agilidade. Dado este fato, nós podemos estimar
esta entrega por volto dos oito pontos de complexidade.

### Lógica de negócio - Construindo a interface com o sistema de arquivos

Neste ponto vamos definir dois tipos de possibilidades que são as seguintes:

* Atraveçar os arquivos em busca do termo procurado
* Entrada de dados através de uma canalização padrão

Estamos em um ponto que é importante projetar nossos recursos para cobrir mais
casos de uso que só estarão mais visiveis conforme a evolução do programa,
com isto é simples de visualizar qual o panorama final.

Nesta implementação estamos utilizando recursos do Node.js e o ideal é que
possamos contar também com uma implementação que possa ser executada utilizando
o Deno, que deixaremos para o futuro do programa quando todos os recursos
estiverem prontos para o usuário final.

```
'use strict';
const assert = require('assert');

function thrownArgumentException(text, term) {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

function search(term, text) {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));
assert.throws(() => {
  search(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});

function times(term, text) {
  thrownArgumentException(term, text);
  return text.match((new RegExp(term, 'g'))).length;
}
assert.equal(times('baz', 'bazfoobarbaz'), 2);
assert.throws(() => {
  times(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});

function match(term, text) {
  thrownArgumentException(term, text);
  return text.match(new RegExp(term)).input;
}
assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
assert.throws(() => {
  match(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});

class Text {
  constructor(content) {
    this.content = content;
    this.setContent = this.setContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.search = this.search.bind(this);
    this.times = this.times.bind(this);
    this.match = this.match.bind(this);
  }

  setContent(value) {
    this.content = value;
    return this;
  }

  getContent() {
    return this.content;
  }

  search(term) { return search(term, this.getContent()); }
  times(term) { return times(term, this.getContent()); }
  match(term) { return match(term, this.getContent()); }
}

let txt = new Text('foobarbaz');
assert.ok(txt instanceof Text);
assert.equal(txt.content, 'foobarbaz', 'Text content not settled');
assert.ok(txt.setContent('foobarbazbuzz') instanceof Text);
assert.equal(txt.getContent(), 'foobarbazbuzz');
assert.ok(txt.search('buzz'));
txt.setContent('fuzzbarfuzzbuzzfuzz');
assert.equal(txt.times('fuzz'), 3);
assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');

const isTTY = process.stdin.isTTY;
const { Transform } = require('stream');
const args = process.argv.slice(2);

function textMatchContentTransformFactory() {
  const opts = {
    transform(raw, encoding, callback) {
      let text = new Text(raw.toString());
      if (text.search(args[0])) {
        this.push(Buffer.from(text.match(args[0])));
      }
      callback();
    }
  };
  return new Transform(opts);
}

if (!isTTY) {
  process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
}
```

O comportamento puro da leitura de uma entrada foi completo através de uma linha
de processamento, com isto podemos estimar que esta tarefa tenha em torno de
três pontos de complexidade para verificar se o tipo de entrada não é TTY
recolher argumentos da linha de comando e depois transformar a entrada para algo
que possamos manipular com as funções presentes em nossa implementação passada e
de fato fazer o que estavamos imaginando verificando se o termo esta presente,
e depois extraindo esta entrada. Como previsto varios comportamentos podem ser
inseridos para melhorar nossa aplicação, mas isto vai ser abordado quando
portarmos nossa aplicação para Typescript ou seja o melhor esta por vir.

Não devemos ter apego com as nossas aplicações, mas toda mudança deve ser
introduzida com uma boa reflexão.

### Portabilidade - Vamos ao Typescript

Com o nosso programa funcionando de forma estavél na versão que paramos, vamos
a parte mais interessante do proceso que é executar a refatoração para o
Typescript.
