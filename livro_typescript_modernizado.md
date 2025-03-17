# TypeScript Modernizado: Guia de Bolso

## Sumário

- [TypeScript Modernizado: Guia de Bolso](#typescript-modernizado-guia-de-bolso)
  - [Sumário](#sumário)
  - [1. Introdução](#1-introdução)
  - [2. Conceitos Básicos](#2-conceitos-básicos)
    - [Tipos Básicos](#tipos-básicos)
    - [Interfaces](#interfaces)
    - [Classes](#classes)
    - [Funções](#funções)
    - [Generics (Introdução)](#generics-introdução)
  - [3. Exemplos Práticos](#3-exemplos-práticos)
    - [Calculando o IMC](#calculando-o-imc)
    - [Modelando um Produto](#modelando-um-produto)
    - [Filtrando um Array](#filtrando-um-array)
  - [4. Uso Avançado de Tipos](#4-uso-avançado-de-tipos)
    - [Tipos de União e Interseção](#tipos-de-união-e-interseção)
  - [5. Considerações Finais](#5-considerações-finais)

## <a name="introducao"></a>1. Introdução

Bem-vindo ao **TypeScript Modernizado: Guia de Bolso**! Este guia foi criado para programadores que desejam aprofundar seus conhecimentos em TypeScript, indo além do básico e explorando recursos avançados da linguagem.

TypeScript é um superconjunto de JavaScript que adiciona tipagem estática, permitindo um desenvolvimento mais seguro e escalável. Ele compila para JavaScript puro, garantindo compatibilidade com todos os navegadores e plataformas.

Neste guia, você encontrará:

- Uma visão geral dos conceitos fundamentais do TypeScript.
- Exemplos práticos que demonstram o uso da linguagem em situações reais.
- Uma seção dedicada a recursos avançados, como tipos genéricos, tipos condicionais e utilitários de tipos.
- Dicas e truques para escrever código TypeScript de alta qualidade.

Prepare-se para levar suas habilidades em TypeScript para o próximo nível!

## <a name="conceitos-basicos"></a>2. Conceitos Básicos

### Tipos Básicos

TypeScript oferece um sistema de tipos robusto que permite definir o tipo de dados de variáveis, parâmetros de função e valores de retorno. Aqui estão os tipos básicos:

- **string:** Representa texto. Exemplo: `let nome: string = "João";`
- **number:** Representa números (inteiros e decimais). Exemplo: `let idade: number = 30;`
- **boolean:** Representa valores verdadeiros ou falsos. Exemplo: `let ativo: boolean = true;`
- **array:** Representa uma coleção de valores do mesmo tipo. Exemplo: `let numeros: number[] = [1, 2, 3];`
- **tuple:** Representa um array com um número fixo de elementos de tipos diferentes. Exemplo: `let pessoa: [string, number] = ["Maria", 25];`
- **enum:** Representa um conjunto de valores nomeados. Exemplo: `enum Cor { Vermelho, Verde, Azul }; let cor: Cor = Cor.Verde;`
- **any:** Representa qualquer tipo. Use com moderação, pois desativa a verificação de tipos. Exemplo: `let valor: any = "qualquer coisa";`
- **void:** Representa a ausência de um valor, geralmente usado como tipo de retorno de funções que não retornam nada. Exemplo: `function log(mensagem: string): void { console.log(mensagem); }`
- **null** e **undefined:** Representam a ausência de valor.
- **never:** Representa um tipo que nunca ocorre. Usado para funções que nunca retornam ou sempre lançam erros.

### Interfaces

Interfaces definem contratos para objetos, especificando quais propriedades e métodos eles devem ter.

```typescript
interface Pessoa {
  nome: string;
  idade: number;
  ativo?: boolean; // O '?' torna a propriedade opcional
}

let usuario: Pessoa = {
  nome: "Carlos",
  idade: 40,
};
```

### Classes

Classes são modelos para criar objetos, encapsulando dados e comportamento.

```typescript
class Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  mover(distancia: number = 0) {
    console.log(`${this.nome} moveu ${distancia}m.`);
  }
}

class Cachorro extends Animal {
  latir() {
    console.log("Au au!");
  }
}

let cachorro = new Cachorro("Rex");
cachorro.latir();
cachorro.mover(10);
```

### Funções

Funções em TypeScript podem ter tipos definidos para seus parâmetros e valores de retorno.

```typescript
function somar(a: number, b: number): number {
  return a + b;
}

let resultado = somar(5, 3);
```

### Generics (Introdução)

Generics permitem escrever código que pode funcionar com diferentes tipos, mantendo a verificação de tipos.

```typescript
function identidade<T>(arg: T): T {
  return arg;
}

let meuNumero = identidade<number>(10);
let minhaString = identidade<string>("Olá");
```

## <a name="exemplos-praticos"></a>3. Exemplos Práticos

### Calculando o IMC

Este exemplo mostra como usar tipos básicos e interfaces para calcular o Índice de Massa Corporal (IMC) de uma pessoa.

```typescript
interface Pessoa {
  nome: string;
  altura: number; // em metros
  peso: number; // em quilogramas
}

function calcularIMC(pessoa: Pessoa): number {
  return pessoa.peso / (pessoa.altura * pessoa.altura);
}

let joao: Pessoa = {
  nome: "João",
  altura: 1.75,
  peso: 70,
};

let imc = calcularIMC(joao);
console.log(`O IMC de ${joao.nome} é ${imc.toFixed(2)}`);
```

### Modelando um Produto

Este exemplo demonstra como usar classes e interfaces para modelar um produto com propriedades e métodos.

```typescript
interface Vendavel {
  preco: number;
  desconto?: number; // Desconto opcional
  calcularPrecoFinal(): number;
}

class Produto implements Vendavel {
  nome: string;
  preco: number;
  desconto: number;

  constructor(nome: string, preco: number, desconto: number = 0) {
    this.nome = nome;
    this.preco = preco;
    this.desconto = desconto;
  }

  calcularPrecoFinal(): number {
    return this.preco * (1 - this.desconto);
  }
}

class Livro extends Produto {
  autor: string;

  constructor(nome: string, preco: number, autor: string, desconto: number = 0) {
    super(nome, preco, desconto);
    this.autor = autor;
  }
}

let livro = new Livro("TypeScript Avançado", 100, "Fulano de Tal", 0.1);
console.log(
  `O preço final do livro ${livro.nome} é R$${livro.calcularPrecoFinal().toFixed(2)}`
);
```

### Filtrando um Array

Este exemplo mostra como usar uma função genérica para filtrar elementos de um array com base em um critério.

```typescript
function filtrar<T>(array: T[], criterio: (item: T) => boolean): T[] {
  return array.filter(criterio);
}

let numeros = [1, 2, 3, 4, 5, 6];
let pares = filtrar(numeros, (n) => n % 2 === 0);
console.log(pares); // [2, 4, 6]

let strings = ["a", "b", "c", "ab", "bc"];
let maioresQueUm = filtrar(strings, (s) => s.length > 1);
console.log(maioresQueUm); // ["ab", "bc"]
```

## <a name="uso-avancado-de-tipos"></a>4. Uso Avançado de Tipos

### <a name="tipos-de-união-e-interseção"></a>Tipos de União e Interseção

TypeScript oferece maneiras poderosas de combinar tipos, permitindo maior flexibilidade e expressividade em suas definições de tipo.

**Tipos de União (`Union Types`)**


Os tipos de união permitem que uma variável ou parâmetro de função aceite valores de mais de um tipo. Eles são representados pelo operador `|`.

**Exemplo de Tipo de União**

```typescript
function imprimirIdade(idade: string | number): void {
  console.log(`A idade é: ${idade}`);
}

imprimirIdade(25); // OK
imprimirIdade("30"); // OK
// imprimirIdade(true); // Erro: Argumento do tipo 'boolean' não é atribuível ao parâmetro do tipo 'string | number'
```

No exemplo acima, a função `imprimirIdade` pode receber um argumento do tipo `string` ou `number`. Isso é útil quando uma variável pode ter diferentes tipos em diferentes momentos ou quando uma função pode lidar com diferentes tipos de entrada.

**Tipos de Interseção (`Intersection Types`)**

Os tipos de interseção combinam múltiplos tipos em um único tipo. O tipo resultante possui todas as propriedades de todos os tipos combinados. Eles são representados pelo operador `&`.

**Exemplo de Tipo de Interseção**

```typescript
interface Loggable {
  log: () => void;
}

interface Serializable {
  serialize: () => string;
}

type LoggableSerializable = Loggable & Serializable;

class ObjetoLogavelSerializavel implements LoggableSerializable {
  log() {
    console.log("Objeto logado.");
  }
  serialize() {
    return "{data: 'exemplo'}";
  }
}

const obj: LoggableSerializable = new ObjetoLogavelSerializavel();
obj.log();
console.log(obj.serialize());
```

Neste exemplo, `LoggableSerializable` é um tipo que deve ser `Loggable` e `Serializable`. A classe `ObjetoLogavelSerializavel` implementa ambas as interfaces, portanto, é compatível com o tipo `LoggableSerializable`. Tipos de interseção são úteis para compor tipos e garantir que um objeto possua um conjunto de características combinadas.


Os tipos de interseção combinam múltiplos tipos em um único tipo. O tipo resultante possui todas as propriedades de todos os tipos combinados. Eles são representados pelo operador `&`.

```typescript
interface Loggable {
  log: () => void;
}

interface Serializable {
  serialize: () => string;
}

type LoggableSerializable = Loggable & Serializable;

class ObjetoLogavelSerializavel implements LoggableSerializable {
  log() {
    console.log("Objeto logado.");
  }
  serialize() {
    return "{data: 'exemplo'}";
  }
}

const obj: LoggableSerializable = new ObjetoLogavelSerializavel();
obj.log();
console.log(obj.serialize());
```

Neste exemplo, `LoggableSerializable` é um tipo que deve ser `Loggable` e `Serializable`. A classe `ObjetoLogavelSerializavel` implementa ambas as interfaces, portanto, é compatível com o tipo `LoggableSerializable`. Tipos de interseção são úteis para compor tipos e garantir que um objeto possua um conjunto de características combinadas.

## <a name="consideracoes-finais"></a>5. Considerações Finais

Para ver a versão original, consulte o [README.md](README.md).
