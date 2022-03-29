const caixaUm = document.querySelector(".caixa1");
const caixaDois = document.querySelector(".caixa2");

function trocaCor() {
  caixaDois.style.backgroundColor = "cyan";
}
//Crie seu event listener abaixo:

//Instruções (leia tudo)
//Você tem dois quadrados, com nomes de Caixa 1 e Caixa 2, quando clicar na Caixa 1, a cor da Caixa 2 deve ser trocada para ciano.
caixaUm.addEventListener("click",trocaCor);


//Instruções (leia tudo)
//Novamente dois quadrados, com nomes de Caixa 1 e Caixa 2:
//Ao clicar uma vez na Caixa 1, a cor da Caixa 2 deve ser trocada para azul.
//Ao dar um clique-duplo na Caixa 2, a Caixa 1 deve ser trocada para vermelho e a Caixa 2 para amarela.

function changeColors () {
  caixaUm.style.backgroundColor = 'red';
  caixaDois.style.backgroundColor = 'yellow';
}

caixaDois.addEventListener("dblclick",changeColors);

//Agora, uma caixa de texto e dois quadrados, as instruções são as seguintes:
//Ao digitar alguma coisa na caixa de texto, o texto da caixa 1 seja alterado para o que foi escrito dentro da caixa letra a letra, enquanto você digita.
//Ao clicar em qualquer lugar fora da caixa de texto após digitar alguma coisa na mesma, o texto da Caixa 2 seja alterado.

//Ao digitar alguma coisa na caixa de texto, o texto da caixa 1 seja alterado para o que foi escrito dentro da caixa letra a letra, enquanto você digita.

caixaTexto.addEventListener("input",trocaTextoA);


//Ao clicar em qualquer lugar fora da caixa de texto após digitar alguma coisa na mesma, o texto da Caixa 2 seja alterado.
let bigDiv = document.querySelector('.flexy-s');
let childrens = bigDiv.children;
function outsideBox() {
for (let index = 1; index < childrens.length; index += 1) {
  trocaTextoB();
}
}
bigDiv.addEventListener('click', outsideBox);


//Agora, uma caixa de texto, dois quadrados e dois botões, as instruções são as seguintes:
//Ao passar o mouse no botão, troque a cor da caixa correspondente para verde.
//Ao clicar no botão, troque o texto da caixa correspondente para o que estiver escrito na caixa de texto.
//Mostre um alerta quando o usuário colar alguma informação dentro da caixa de texto escrito: "Go Trybe!"


//Ao passar o mouse no botão, troque a cor da caixa correspondente para verde.

let butGreen = document.querySelector('.botao1');

let caixaOne = document.querySelector('.caixa1');

function mudaCorCaixa(){
  caixaOne.style.backgroundColor = 'green';
}

butGreen.addEventListener('mouseover',mudaCorCaixa);


//Ao clicar no botão, troque o texto da caixa correspondente para o que estiver escrito na caixa de texto.


let butGreen = document.querySelector('.botao1');

let caixaOne = document.querySelector('.caixa1');

let caixaEscrever = document.querySelector('.caixa-texto');

butGreen.addEventListener("click",trocaTexto);

function trocaTexto(){
  caixaOne.innerText = caixaEscrever.value;
}


//Mostre um alerta quando o usuário colar alguma informação dentro da caixa de texto escrito: "Go Trybe!"

caixaEscrever.addEventListener("onpaste",alerta);

function alerta(){
  document.innerHTML = "Go Trybe!";
}

