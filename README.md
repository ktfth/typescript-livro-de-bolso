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
acima com uma implementação que cubra os requisitos da asserção.
