//1 Adicione a tag h1 com o texto Exercício 5.2 - JavaScript DOM como filho da tag body ;
//2 Adicione a tag div com a classe main-content como filho da tag body ;
//3 Adicione a tag div com a classe center-content como filho da tag div criada no passo 2;
//4 Adicione a tag p como filho do div criado no passo 3 e coloque algum texto;
//5 Adicione a tag div com a classe left-content como filho da tag div criada no passo 2;
//6 Adicione a tag div com a classe right-content como filho da tag div criada no passo 2;
//7 Adicione uma imagem com src configurado para o valor https://picsum.photos/200 e classe small-image . Esse elemento deve ser filho do div criado no passo 5;
//8 Adicione uma lista não ordenada com os valores de 1 a 10 por extenso, ou seja, um , dois , três , ... como valores da lista. Essa lista deve ser filha do div criado no passo 6;
//9 Adicione 3 tags h3 , todas sendo filhas do div criado no passo 2.

//1
let tagH1 = document.createElement('h1');
document.body.appendChild(tagH1).innerHTML = 'Exercício 5.2 - JavaScript DOM';

//2
let main_content_div = document.createElement('div');
main_content_div.className = 'main-content';
document.body.appendChild(main_content_div);

//3
let center_content_div = document.createElement('div');
center_content_div.className = 'center-content';
main_content_div.appendChild(center_content_div);

//4
let add_p = document.createElement('p');
center_content_div.appendChild(add_p).innerHTML= 'Gremio vai ganhar a Copa do Brasil no domingo';

//5
let left_content_div = document.createElement('div');
left_content_div.className = 'left-content';
main_content_div.appendChild(left_content_div);

//6
let right_content_div = document.createElement('div');
right_content_div.className = 'right-content';
main_content_div.appendChild(right_content_div);

//7
let small_image_imagem = document.createElement('img');
small_image_imagem.className = 'small-image';
small_image_imagem.src = 'https://picsum.photos/200';
left_content_div.appendChild(small_image_imagem);

//8
let lista_nao_ordenada = document.createElement('ul');
right_content_div.appendChild(lista_nao_ordenada);
let valores = ['um','dois','tres','quatro','cinco','seis','sete','oito','nove','dez'];
for(let index in valores){
    let lista_nao_ordenada_valores = document.createElement('li');
    lista_nao_ordenada_valores.innerHTML = valores[index];
    lista_nao_ordenada.appendChild(lista_nao_ordenada_valores);
}

//9
for(let index=0; index<3;index+=1){
    let tagsH3 = document.createElement('h3');
    tagsH3.innerHTML = 'Tags ' + index;
    main_content_div.appendChild(tagsH3);
}

//1 Adicione a classe title na tag h1 criada;
//2 Adicione a classe description nas 3 tags h3 criadas;
//3 Remova o div criado no passo 5 (aquele que possui a classe left-content ). Utilize a função .removeChild() ;
//4 Centralize o div criado no passo 6 (aquele que possui a classe right-content ). Dica: para centralizar, basta configurar o margin-right: auto do div ;
//5 Troque a cor de fundo do elemento pai da div criada no passo 3 (aquela que possui a classe center-content ) para a cor verde;
//6 Remova os dois últimos elementos ( nove e dez ) da lista criada no passo 8.


//1
tagH1.className = 'tittle';

//2
tagsH3 = document.getElementsByTagName('h3');
for(let index =0;index<3;index+=1){
tagsH3[index].className = 'descripton';
}

//3
left_content_div= document.getElementsByClassName('left-content')[0];
main_content_div.removeChild(left_content_div);

//4
right_content_div = document.getElementsByClassName('right-content')[0];
right_content_div.style.marginRight = 'auto';

//5
center_content_div = document.getElementsByClassName('center-content')[0];
center_content_div.parentNode.style.backgroundColor='green';

//6
lista_nao_ordenada.lastChild.remove();
lista_nao_ordenada.lastChild.remove(); 










