// boolean: recebe verdadeiro (true) ou falso (false)
var yes = true; // cria uma variável de nome "yes" e diz que o tipo é boleano e o valor é true
var no = false; // cria uma variável de nome "no" e diz que o tipo é boleano e o valor é false
// number: recebe valores numéricos e, assim como no JavaScript, todos são valores de ponto flutuante.
// cria uma variável de nome "x" e diz que o tipo é number mas não seta o valor
// isso não funciona com const
var x;
var y = 0;
var z = 123.456;
// string: recebe uma sequência de caracteres armazenados como unidades de código UTF-16 Unicode.
var s;
var empty = "";
var abc = 'abc';
// void: existe apenas para indicar a ausência de um valor, como em uma função sem valor retornado.
function sayHelloWorld() {
    console.log("Hello World!");
}
// null e undefined: são subtipos de todos os outros tipos.
var nullValue = null;
var undefinedValue = undefined;
// Exemplo de declaração de variáveis utilizando inferência de tipo
var flag = true; // o compilador irá inferir o tipo boolean
var numberPI = 3.1416; // o compilador irá inferir o tipo number
var message = "Hello World!"; // o compilador irá inferir o tipo string
