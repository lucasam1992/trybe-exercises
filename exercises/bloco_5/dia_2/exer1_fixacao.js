//parentNode : retorna o elemento pai.
//childNodes : retorna um array com todos os elementos filhos
//firstChild : retorna o primeiro filho
//lastChild : retorna o último filho
//nextSibling : retorna o próximo nó.
//previousSibling : retorna o nó anterior.
//nextElementSibling : retorna o próximo elemento.
//previousElementSibling : retorna o elemento anterior.

//Exericio 1
//1 Acesse o elemento elementoOndeVoceEsta .
//2 Acesse pai a partir de elementoOndeVoceEsta e adicione uma color a ele.
//3 Acesse o primeiroFilhoDoFilho e adicione um texto a ele. Você se lembra dos vídeos da aula anterior, como fazer isso?
//4 Acesse o primeiroFilho a partir de pai .
//5 Agora acesse o primeiroFilho a partir de elementoOndeVoceEsta .
//6 Agora acesse o texto Atenção! a partir de elementoOndeVoceEsta .
//7 Agora acesse o terceiroFilho a partir de elementoOndeVoceEsta .
//8 Agora acesse o terceiroFilho a partir de pai .

console.log(document.getElementById('elementoOndeVoceEsta'));//1

console.log(document.getElementById('elementoOndeVoceEsta').parentNode.style.backgroundColor="blue");//FEITO

console.log(document.getElementById('primeiroFilhoDoFilho').innerHTML = "Gremio Campeão da Libertadores!!");//FEITO

console.log(document.getElementById('pai').childNodes[1]);//4

console.log(document.getElementById('elementoOndeVoceEsta').previousElementSibling);//5

console.log(document.getElementById('elementoOndeVoceEsta').nextElementSibling.previousSibling);//6

console.log(document.getElementById('elementoOndeVoceEsta').nextElementSibling); //7

console.log(document.getElementById('pai').childNodes[5]); // exer 8

//Exercicio 2
//Crie um irmão para elementoOndeVoceEsta.
//Crie um filho para elementoOndeVoceEsta.
//Crie um filho para primeiroFilhoDoFilho.
//A partir desse filho criado, acesse terceiroFilho.

//1
let pai = document.createElement('div');
document.getElementById('elementoOndeVoceEsta').parentNode.appendChild(pai);

//2
let filho = document.createElement('div');
document.getElementById('elementoOndeVoceEsta').appendChild(filho);


//3
let newSOn =document.createElement('div');
newSOn.id = 'filhoDoPrimeiroFiDoFi';
document.getElementById('primeiroFilhoDoFilho').appendChild(newSOn);

//let filhoDoPrimeiroFilhoDoFilho = document.createElement('div');
//filhoDoPrimeiroFilhoDoFilho.id = 'filhoDoPrimeiroFiDoFi';

//4
document.getElementById('filhoDoPrimeiroFiDoFi').parentNode.parentNode.nextSibling.nextSibling;



//Remova todos os elementos da página, menos pai , elementoOndeVoceEsta e primeiroFilhoDoFilho .
//<div id="paiDoPai">
//    <div id="primeiroFilho"></div>    
//      <div id="segundoEUltimoFilhoDoFilho"></div>
//    </div>
//    Atenção!
//    <div id="terceiroFilho"></div>
//    <div id="quartoEUltimoFilho"></div>

let itensDaLista = document.querySelectorAll('paiDoPai');

//FALTA FAZER, NAO CONSEGUI
