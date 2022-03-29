function createDaysOfTheWeek() {
    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const weekDaysList = document.querySelector('.week-days');
  
    for (let index = 0; index < weekDays.length; index += 1) {
      const days = weekDays[index];
      const dayListItem = document.createElement('li');
      dayListItem.innerHTML = days;
  
      weekDaysList.appendChild(dayListItem);
    };
  };
  
  createDaysOfTheWeek();
  
  

const dezDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

//exer1
function criacaoDosDias(){
  let diaList = document.querySelector('#days');
  for(let index=0; index<dezDaysList.length; index+=1){
  let diaTag = document.createElement('li');
  let dia = dezDaysList[index];
  
  if(dia === 24 || dia === 31){
    diaTag.className = 'holiday';
    diaTag.innerHTML = dia;
    diaList.appendChild(diaTag);
  }else if(dia === 4 || dia === 11 || dia === 18){
    diaTag.className = 'friday';
    diaTag.innerHTML = dia;
    diaList.appendChild(diaTag);

  }else if( dia === 25){
    diaTag.className = 'holiday friday';
    diaTag.innerHTML = dia ;
    diaList.appendChild(diaTag);
  }else{
    diaTag.className = 'day';
    diaTag.innerHTML = dia;
    diaList.appendChild(diaTag);
  }
  }
}
criacaoDosDias();

//exer2
function botaoFeriado(palavra){
  let botao = document.createElement('button');
  botao.id = 'btn-holiday';
  let botaoC = document.querySelector('.buttons-container');
  
  botaoC.appendChild(botao);
  botao.innerText = palavra;
  
}

botaoFeriado('Feriado');

//3 

function eventoMudaCor(){
  let obtemBotaoFeriado = document.querySelector('#btn-holiday');
  let obtemFeriadoDia = document.querySelectorAll('.holiday');


  obtemBotaoFeriado.addEventListener('click', function(){
    for(let index =0; index < obtemFeriadoDia.length; index += 1){
      if(obtemFeriadoDia[index].style.backgroundColor === 'white'){
        obtemFeriadoDia[index].style.backgroundColor = 'rgb(238,238,238)';
      }else{
        obtemFeriadoDia[index].style.backgroundColor = 'white';
      }
    }
  })
}

eventoMudaCor();

//4

function botaoSexta(texto){
  let botao = document.createElement('button');
  botao.id = 'btn-friday';
  let botRecebeConteiner = document.querySelector('.buttons-container');

  botao.innerText = texto;
  botRecebeConteiner.appendChild(botao);
}

botaoSexta('Sexta-Feira');

//5

function eventoMudaCorSexta(){
  let obtemBotaoSexta = document.querySelector('#btn-friday');
  let obtemSexta = document.querySelectorAll('.friday');
  
  obtemBotaoSexta.addEventListener('click', function(){
  for(let index =0; index < obtemSexta.length ; index += 1){
    if(obtemSexta[index].innerText !== 'SEXTOU o/'){
      obtemSexta[index].innerText = 'SEXTOU o/';
    }else {
      obtemSexta[index].innerText = (obtemSexta[index].nextElementSibling.innerText) - 1; //
    }
  }
  });
}

eventoMudaCorSexta();

//6

function efeitoZoomMouseOver(){
let dia = document.getElementById('days');

 dia.addEventListener('mouseover', function(event){
  event.target.style.fontSize = '30px';
  event.target.style.fontWeight = '800';
 });
}

efeitoZoomMouseOver();

function efeitoZoomMouseOut(){
let dia = document.getElementById('days');

dia.addEventListener('mouseout', function(event){
  event.target.style.fontSize='20px';
event.target.style.fontWeight = '100';
});
}

efeitoZoomMouseOut();

//7

function adicionarTarefas(tarefa){
let entradaDados = document.querySelector('.my-tasks');
let elementoSpan = document.createElement('span');
let botaoTarefas = document.createElement('button');

elementoSpan.innerHTML = tarefa;
entradaDados.appendChild(elementoSpan);

}
adicionarTarefas('Estudar:');

//8


function addLegendaCor(cor){
  let entradaDados = document.querySelector('.my-tasks');
  let divNovaTarefa = document.createElement('div');
 
  divNovaTarefa.className = 'task';
  divNovaTarefa.style.backgroundColor = cor;
  entradaDados.appendChild(divNovaTarefa);

}
addLegendaCor('blue');


//9

function addComClick(){
let pegaTagDiv = document.querySelector('.task');
let pegaTagSelecao = document.getElementsByClassName('task selected');

pegaTagDiv.addEventListener('click', function(event){
if(pegaTagSelecao.length === 0){
  event.target.className = 'task selected';
}else{
event.target.className = 'task';
}
});
}
addComClick();

//10

function atribuirCorAoDia(){
  let pegaDia = document.getElementById('days');
  let pegaTagSelecao = document.getElementsByClassName('task selected');
  let pegaTagDiv = document.querySelector('.task');
  let corTag = pegaTagDiv.style.backgroundColor;
  
  pegaDia.addEventListener('click', function(event){
    let eventTargetColor = event.target.style.color;
    if(pegaTagSelecao.length > 0 && eventTargetColor !== corTag){//pegaTagSelecao.length é ZERO na primeira iteração 
      let color = pegaTagSelecao[0].style.backgroundColor;
      event.target.style.color = color;
    }else if(eventTargetColor === corTag && pegaTagDiv.length !== 0){ //
      event.target.style.color = 'rgb(119,119,119)';
    }
  });

  
}
atribuirCorAoDia();


function adicionarCompromissos(){
  let pegaInput = document.querySelector('#task-input');
  let pegaBotao = document.querySelector('#btn-add');
  let pegaLista = document.querySelector('.task-list');

  pegaBotao.addEventListener('click', function(){ 
    if(pegaInput.value.length > 0){ // existe informações (.value) digitadas  pelo usuario ?
      let criarLinha = document.createElement('li');
      criarLinha.innerText = pegaInput.value;
      pegaLista.appendChild(criarLinha);
      pegaInput.value='';
    }else{
      alert('Por favor, digite algo');
    }
  });

  pegaInput.addEventListener('keyup', function(event){ // ENTER ativado 
    if(event.keyCode === 13 && pegaInput.value.length > 0){ // 13 é o codigo do ENTER para pegar ativar a tecla
      let criarOutrLinha = document.createElement('li');
      criarOutrLinha.innerText = pegaInput.value;
      pegaLista.appendChild(criarOutrLinha);
      pegaInput.value = '';
    }
  });
}
adicionarCompromissos();

