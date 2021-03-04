/*
Aqui você vai modificar os elementos já existentes utilizando apenas as funções:
- document.getElementById()
- document.getElementsByClassName()
- document.getElementsByTagName()
1. Crie uma função que mude o texto na tag <p> para uma descrição de como você se vê daqui a 2 anos. (Não gaste tempo pensando no texto e sim realizando o exercício)
2. Crie uma função que mude a cor do quadrado amarelo para o verde da Trybe (rgb(76,164,109)).
3. Crie uma função que mude a cor do quadrado vermelho para branco.
4. Crie uma função que corrija o texto da tag <h1>.
5. Crie uma função que modifique todo o texto da tag <p> para maiúsculo.
6. Crie uma função que exiba o conteúdo de todas as tags <p> no console.
*/
   
function mudarTextoTagP(){
    let paragrafo = document.getElementsByTagName('p')[1];
    paragrafo.innerHTML = "Gremio Campeão da Libertadores!!";
}

mudarTextoTagP();

function mudarCordoQuadradoAmarelo(){
    let main_contentAmarelo = document.getElementsByClassName('main-content')[0];
    main_contentAmarelo.style.background = "rgb(76,164,109)";
}

mudarCordoQuadradoAmarelo();

function mudarCordoQuadradoVermelho(){
    let main_contentVermelho = document.getElementsByClassName('center-content')[0];
    main_contentVermelho.style.background = "white";
}

mudarCordoQuadradoVermelho();

function corrigirTexto(){
    let tittle = document.getElementsByTagName('h1')[0];
    tittle.innerHTML = "Exercicio 5.1 - Javascript";

}

corrigirTexto();

function modificarParaMaiusculo(){
    let paragrafo = document.getElementsByTagName('p')[0];
    paragrafo.innerHTML = paragrafo.innerHTML.toLocaleUpperCase();

}

modificarParaMaiusculo();

function exibeConteudoTodasTags(){
    let paragrafo = document.getElementsByTagName('p');
    for(let index=0; index<paragrafo.length;index+=1){
        console.log(paragrafo[index].innerHTML);
    }
}

exibeConteudoTodasTags();