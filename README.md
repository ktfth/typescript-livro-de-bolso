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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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
Typescript. Nós só vamos precisar ajustar a classe que criamos mudando nome e
declarando uma variavel no escopo dela para que possamos utilizar nosso programa
mas como isto é apenas parte de nossas ações, para que possamos de fato utilizar
padrões mais sofisticados aqui esta nossas mudanças.

app.ts

```ts
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

class TextContent {
  content: string;

  constructor(content: string) {
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

let txt = new TextContent('foobarbaz');
assert.ok(txt instanceof TextContent);
assert.equal(txt.content, 'foobarbaz', 'TextContent content not settled');
assert.ok(txt.setContent('foobarbazbuzz') instanceof TextContent);
assert.equal(txt.getContent(), 'foobarbazbuzz');
assert.ok(txt.search('buzz'));
txt.setContent('fuzzbarfuzzbuzzfuzz');
assert.equal(txt.times('fuzz'), 3);
assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');

const isTTY = process.stdin.isTTY;
const { Transform } = require('stream');
const args = process.argv.slice(2);

function textMatchContentTransformFactory(filePath='') {
  const opts = {
    transform(raw, encoding, callback) {
      let text = new TextContent(raw.toString());
      if (text.search(args[0])) {
        if (!!filePath) console.log(filePath);
        this.push(Buffer.from(text.match(args[0])));
      }
      callback();
    }
  };
  return new Transform(opts);
}

const fs = require('fs');
const path = require('path');

function traverse(dirPath, dirs=[]) {
  let dir = fs.readdirSync(dirPath, {
    withFileTypes: true
  });
  let nestedDirs = dir.filter(curr => curr.isDirectory() &&
                                      !(curr.name.indexOf('.') === 0));
  let nestedFiles = dir.filter(curr => curr.isFile() &&
                                       !(curr.name.indexOf('.') === 0));

  for (let file of nestedFiles) {
    let curr = path.resolve(dirPath, file.name);
    let currStream = fs.createReadStream(curr);

    currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
  }

  for (let entrypoint of nestedDirs) {
    let curr = path.resolve(dirPath, entrypoint.name);
    traverse(curr);
  }
}

if (!isTTY) {
  process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
} else if (isTTY) {
  // traverse directories
  traverse(process.cwd());
}
```

Neste ponto, devemos analisar quais as próximas refatorações importantes a serem
feitas, que podem ser as seguintes:

* Separar os testes
* Optimizar o uso de memoria e processamento de dados
* Implementar um algoritimo de busca mais eficiente
* Devolver o numero da linha que ocorre o padrão de texto que estamos buscando
* Sumarizar o texto na ocasião em especifico quando o padrão aparece

Nesta primeira refatoração nós separamos um arquivo para o programa e outro
para os testes, e este mesmo padrão se replica para novas mudanças.

app.ts

```ts
'use strict';

function thrownArgumentException(text, term) {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

export function search(term, text): boolean {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}

export function times(term, text) {
  thrownArgumentException(term, text);
  return text.match((new RegExp(term, 'g'))).length;
}

export function match(term, text) {
  thrownArgumentException(term, text);
  return text.match(new RegExp(term)).input;
}

export class TextContent {
  content: string;

  constructor(content: string) {
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

const isTTY = process.stdin.isTTY;
const { Transform } = require('stream');
const args = process.argv.slice(2);

function textMatchContentTransformFactory(filePath='') {
  const opts = {
    transform(raw, encoding, callback) {
      let text = new TextContent(raw.toString());
      if (text.search(args[0])) {
        if (!!filePath) console.log(filePath);
        this.push(Buffer.from(text.match(args[0])));
      }
      callback();
    }
  };
  return new Transform(opts);
}

const fs = require('fs');
const path = require('path');

function traverse(dirPath, dirs=[]) {
  let dir = fs.readdirSync(dirPath, {
    withFileTypes: true
  });
  let nestedDirs = dir.filter(curr => curr.isDirectory() &&
                                      !(curr.name.indexOf('.') === 0));
  let nestedFiles = dir.filter(curr => curr.isFile() &&
                                       !(curr.name.indexOf('.') === 0));

  for (let file of nestedFiles) {
    let curr = path.resolve(dirPath, file.name);
    let currStream = fs.createReadStream(curr);

    currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
  }

  for (let entrypoint of nestedDirs) {
    let curr = path.resolve(dirPath, entrypoint.name);
    traverse(curr);
  }
}

if (!isTTY) {
  process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
} else if (isTTY && !module.parent) {
  // traverse directories
  traverse(process.cwd());
}
```

app.test.ts

```ts
'use strict';
const assert = require('assert');

import { search } from './app';
import { times } from './app';
import { match } from './app';
import { TextContent } from './app';

describe('Text Content Search', () => {
  it('should search for a term', () => {
    assert.ok(search('foo', 'foobar'));
  });

  it('should throws arguments exception for search', () => {
    assert.throws(() => {
      search(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content Times', () => {
  it('should have times of a term', () => {
    assert.equal(times('baz', 'bazfoobarbaz'), 2);
  });

  it('should throws arguments exception for times', () => {
    assert.throws(() => {
      times(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content Match', () => {
  it('should have match of term', () => {
    assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
  });

  it('should throws arguments exception for match', () => {
    assert.throws(() => {
      match(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content', () => {
  let txt = null;

  before(() => {
    txt = new TextContent('foobarbaz');
  });

  it('should be an instance of', () => {
    assert.ok(txt instanceof TextContent);
  });

  it('should be an content', () => {
    assert.ok(txt.content, 'foobarbaz', 'TextContent content not settled');
  });

  it('should be set a content', () => {
    assert.ok(txt.setContent('foobarbazbuzz') instanceof TextContent);
  });

  it('should be get a content', () => {
    assert.equal(txt.getContent(), 'foobarbazbuzz');
  });

  it('should be search by a term in content', () => {
    assert.ok(txt.search('buzz'));
  });

  it('should be have times of term occured on the content', () => {
    txt.setContent('fuzzbarfuzzbuzzfuzz');
    assert.equal(txt.times('fuzz'), 3);
  });

  it('should be match by term on the content', () => {
    assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');
  });
});
```

Com as mudanças feitas podemos seguir para as próximas implementações.
A optimização foi feita através da utilização do buffer, como fonte para nossas
manipulações, com isto nós podemos analisar que foram utilizados em torno de
seis pontos de complexidade para ela ser concluida.

app.test.ts

```ts
'use strict';
const assert = require('assert');

import { search } from './app';
import { times } from './app';
import { match } from './app';
import { TextContent } from './app';

describe('Text Content Search', () => {
  it('should search for a term', () => {
    assert.ok(search('foo', 'foobar'));
  });

  it('should throws arguments exception for search', () => {
    assert.throws(() => {
      search(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content Times', () => {
  it('should have times of a term', () => {
    assert.equal(times('baz', 'bazfoobarbaz'), 2);
  });

  it('should throws arguments exception for times', () => {
    assert.throws(() => {
      times(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content Match', () => {
  it('should have match of term', () => {
    assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
  });

  it('should throws arguments exception for match', () => {
    assert.throws(() => {
      match(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content', () => {
  let txt = null;

  before(() => {
    txt = new TextContent('foobarbaz');
  });

  it('should be an instance of', () => {
    assert.ok(txt instanceof TextContent);
  });

  it('should be an content', () => {
    assert.ok(txt.content, 'foobarbaz', 'TextContent content not settled');
  });

  it('should be set a content', () => {
    assert.ok(txt.setContent('foobarbazbuzz') instanceof TextContent);
  });

  it('should be get a content', () => {
    assert.equal(txt.getContent(), 'foobarbazbuzz');
  });

  it('should be search by a term in content', () => {
    assert.ok(txt.search('buzz'));
  });

  it('should be have times of term occured on the content', () => {
    txt.setContent('fuzzbarfuzzbuzzfuzz');
    assert.equal(txt.times('fuzz'), 3);
  });

  it('should be match by term on the content', () => {
    assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');
  });
});

describe('Text Content processing buffer', () => {
  let txtBuff = null;

  before(() => {
    txtBuff = new TextContent(Buffer.from('foobarbaz'));
  });

  it('should be an instance of', () => {
    assert.ok(txtBuff instanceof TextContent);
  });

  it('should be an content', () => {
    assert.ok(txtBuff.content, Buffer.from('foobarbaz'), 'TextContent content not settled');
  });

  it('should be a buffer', () => {
    assert.ok(txtBuff.isBuffer(Buffer.from('bar')));
  });

  it('should be search by a term in content as buffer', () => {
    assert.ok(txtBuff.search(Buffer.from('bar')));
  });

  it('should be have times of term occured on the content as buffer', () => {
    txtBuff.setContent(Buffer.from('fuzzbarfuzzbuzzfuzz'));
    assert.equal(txtBuff.times(Buffer.from('fuzz')), 3);
  });

  it('should be match by term on the content as buffer', () => {
    assert.equal(txtBuff.match(Buffer.from('buzz')), 'fuzzbarfuzzbuzzfuzz');
  })
});
```

app.ts

```ts
'use strict';

function thrownArgumentException(text, term) {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

export function search(term, text): boolean {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}

export function times(term, text) {
  thrownArgumentException(term, text);
  return text.match((new RegExp(term, 'g'))).length;
}

export function match(term, text) {
  thrownArgumentException(term, text);
  return text.match(new RegExp(term)).input;
}

export class TextContent {
  content: any;

  constructor(content: any) {
    this.content = content;
    this.setContent = this.setContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.isBuffer = this.isBuffer.bind(this);
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

  isBuffer(value) {
    return value.constructor.toString().indexOf('Buffer') > -1;
  }

  search(term) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      return this.getContent().indexOf(term) > -1;
    }
    return search(term, this.getContent());
  }

  times(term, t=-1, o=0) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      let out = o;
      let curr = this.getContent().indexOf(term, t + 1);
      if (curr > -1) {
        out += 1;
        return this.times(term, t=curr + 1, out);
      }
      return out;
    }
    return times(term, this.getContent());
  }

  match(term) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      let out = Buffer.from('');
      if (this.search(term)) {
        out = this.getContent();
      }
      return out;
    }
    return match(term, this.getContent());
  }
}

const isTTY = process.stdin.isTTY;
const { Transform } = require('stream');
const args = process.argv.slice(2);

function textMatchContentTransformFactory(filePath='') {
  const opts = {
    transform(raw, encoding, callback) {
      let text = new TextContent(raw);
      if (!!args.length && text.search(Buffer.from(args[0]))) {
        if (!!filePath) console.log(filePath);
        this.push(text.match(Buffer.from(args[0])));
      }
      callback();
    }
  };
  return new Transform(opts);
}

const fs = require('fs');
const path = require('path');

function traverse(dirPath, dirs=[]) {
  let dir = fs.readdirSync(dirPath, {
    withFileTypes: true
  });
  let nestedDirs = dir.filter(curr => curr.isDirectory() &&
                                      !(curr.name.indexOf('.') === 0));
  let nestedFiles = dir.filter(curr => curr.isFile() &&
                                       !(curr.name.indexOf('.') === 0));

  for (let file of nestedFiles) {
    let curr = path.resolve(dirPath, file.name);
    let currStream = fs.createReadStream(curr);

    currStream.setMaxListeners(100000);

    currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
  }

  for (let entrypoint of nestedDirs) {
    let curr = path.resolve(dirPath, entrypoint.name);
    traverse(curr);
  }
}

process.stdin.setEncoding('utf-8');

process.stdout.setMaxListeners(100000);

if (!isTTY) {
  process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
} else if (isTTY && !module.parent) {
  // traverse directories
  traverse(process.cwd());
}
```

Estamos avançando para uma versão bastante promissora que é a seguinte.

```ts
'use strict';

function thrownArgumentException(text, term) {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

export function search(term, text): boolean {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}

export function times(term, text) {
  thrownArgumentException(term, text);
  return text.match((new RegExp(term, 'g'))).length;
}

export function match(term, text) {
  thrownArgumentException(term, text);
  return text.match(new RegExp(term)).input;
}

export class TextContent {
  content: any;

  constructor(content: any) {
    this.content = content;
    this.setContent = this.setContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.isBuffer = this.isBuffer.bind(this);
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

  isBuffer(value) {
    return value.constructor.toString().indexOf('Buffer') > -1;
  }

  search(term) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      return this.getContent().indexOf(term) > -1;
    }
    return search(term, this.getContent());
  }

  times(term, t=-1, o=0) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      let out = o;
      let curr = this.getContent().indexOf(term, t + 1);
      if (curr > -1) {
        out += 1;
        return this.times(term, t=curr + 1, out);
      }
      return out;
    }
    return times(term, this.getContent());
  }

  match(term) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      let out = {};
      let lines = [];
      let line = [];
      for (let i = 0; i < this.getContent().length; i += 1) {
        let chr = this.getContent()[i];
        if (chr === Buffer.from('\n')[0]) {
          lines.push(line);
          line = [];
        } else if (i === this.getContent().length - 1) {
          line.push(chr);
          lines.push(line);
          line = [];
        } else {
          line.push(chr);
        }
      }
      for (let i in lines) {
        let curr = Buffer.from(lines[i]);
        if (curr.indexOf(term) > -1) {
          out[parseInt(i, 10) + 1] = curr;
        }
      }
      return out;
    }
    return match(term, this.getContent());
  }
}

const isTTY = process.stdin.isTTY;
const { Transform } = require('stream');
const args = process.argv.slice(2);

function textMatchContentTransformFactory(filePath='') {
  const opts = {
    transform(raw, encoding, callback) {
      let text = new TextContent(raw);
      if (!!args.length && text.search(Buffer.from(args[0]))) {
        if (!!filePath) console.log(filePath);
        let matches = text.match(Buffer.from(args[0]));
        let lines = [];
        Object.keys(matches).forEach(k => {
          lines.push(`${k}:${matches[k].toString().replace((new RegExp(args[0], 'g')), '\x1b[100m' + args[0] + '\x1b[49m')}`);
        });
        this.push(Buffer.from(`${lines.join('\n')}\n`));
      }
      callback();
    }
  };
  return new Transform(opts);
}

const fs = require('fs');
const path = require('path');

function traverse(dirPath, dirs=[]) {
  let dir = fs.readdirSync(dirPath, {
    withFileTypes: true
  });
  let nestedDirs = dir.filter(curr => curr.isDirectory() &&
                                      !(curr.name.indexOf('.') === 0));
  let nestedFiles = dir.filter(curr => curr.isFile() &&
                                       !(curr.name.indexOf('.') === 0));

  for (let file of nestedFiles) {
    let curr = path.resolve(dirPath, file.name);
    let currStream = fs.createReadStream(curr);

    currStream.setMaxListeners(100000);

    currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
  }

  for (let entrypoint of nestedDirs) {
    let curr = path.resolve(dirPath, entrypoint.name);
    traverse(curr);
  }
}

process.stdin.setEncoding('utf-8');

process.stdout.setMaxListeners(100000);

if (!isTTY) {
  process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
} else if (isTTY && !module.parent) {
  // traverse directories
  traverse(process.cwd());
}
```

Com isto estabilizamos a nossa versão e podemos fazer o que bem entender com
ela desta forma, inclusives melhorias de como o programa funciona. Fica o
exercicio que pode ser executado por você, esta livre para vasculhar e
implementar melhorias no funcionamento do programa.

Este programa pode ser extendido de várias formas e alcançar um nível de
conhecimento mais polido e útil, para o seu dia a dia. Estamos abertos para
novas implementações até que finalizemos a obra por completo, de forma coletiva
e inteligênte.

Obrigado a você que leu e opinou sobre o livro.

## Projeção - Polindo sua ferramenta

Após utilizar a ferramenta logo vemos que existem varios modos de se fazer a
mesma coisa, mas como podemos realizar esta tarefa enquanto estamos projetando
a ferramenta? É simples, aplicaremos tecnicas que serve com o propósito de
manter uma analise constante.

### Injeção de parametros

```js
'use strict';
const assert = require('assert');
const { exec } = require('child_process');

exec('echo "foobar" | node app.js foo', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  assert.equal(stdout, '1:\x1b[100m' + 'foo' + '\x1b[49mbar\n');
});
```

Anter de portarmos a nossa solução para o Deno cobriremos vários casos de uso
que a ferramenta pode ser utilizada. Com este código nos testamos uma das formas
que ele pode ser utilizada. Mas em outras baterias de testes descobrimos que o
processo aglutina quando executa o modo varredura, por isto devemos investigar
nossa implementação e decidirmos se é interessante manter este tipo de cobertura.

Neste caso utilizei algumas linhas de python que é ótimo para casos como estes
em sistemas linux e unix por ter um suporte grande a funções que não precisam de
tanto desprendimento de tempo e esforço.

```python
import os

node = 'node app.js biz'

node_output = os.popen(node).read()

assert (len(node_output) > 0)
```

Depois de testarmos o minimo do uso da linha de comando, nós vamos dar atenção
a implementação util em outros motores de execução, neste caso nós devemos
seguir o que esta sendo levantado como exceção pelo motor, neste caso o Deno.
