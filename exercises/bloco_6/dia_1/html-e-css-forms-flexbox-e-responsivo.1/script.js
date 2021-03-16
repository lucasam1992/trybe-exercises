window.onload = function () {
    mostrarListaDeEstados();
  }

let botaoDeEnvio = document.querySelector('.botao-enviar');
let limparCampos = document.querySelector('.botao-apagar');
botaoDeEnvio.addEventListener('click', submeterFormulario);
limparCampos.addEventListener('click',apagarformsCampos );


function mostrarListaDeEstados(){
    const pegaIdEstados = document.getElementById('estado');
    const arrayEstados = ['Selecione seu estado','AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];    
    let aux =1;
    for(let index=0; index< arrayEstados.length; index +=1){
        const mostraEstados = document.createElement('option');
        pegaIdEstados.appendChild(mostraEstados).innerText = arrayEstados[index];
        pegaIdEstados.appendChild(mostraEstados).aux = arrayEstados[index];
    }
}

function validarFormatoData(data){
    if(data.indexOf('/')===2 || data.indexOf('/') === 5){
       const dia = data.substr(0,2);
       const mes = data.substr(3,2);
       const ano = data.substr(6,4);
        if((dia>0 && dia<31) && (mes>0 && mes<=12) && (ano>0 && ano.length === 4)){
            return true;
        }
    }
    return false;
}

function pegarDataDoForm(){
    const pegaData = document.querySelector('.data').value;
    let valida = validarFormatoData(pegaData);
    if(!valida && pegaData.length){
        pegaData.value='';
        alert('data invalida');
        return false;
    }
    return pegaData;
}

function validarEmail(){
    let pegarEmail = document.querySelector('.email-input').value;
    let formatoEmail =/(.+)@(.+){2,}\.(.+){2,}/.test(pegarEmail);
    if(!formatoEmail && pegarEmail.length){
        pegarEmail.value ='';
        alert('email invalido');
        return false;
    }
    return formatoEmail;

}

function submeterFormulario(event){
    event.preventDefault();
    let valoresInput = document.getElementsByTagName('input');
    for(let index=0; index < valoresInput.length; index+=1){
        if(valoresInput[index].type === 'radio' && !valoresInput[index].checked){
            continue;
        }
        let pegaEntrada = valoresInput[index].value;
        let dataDoUsuario = document.querySelector('.form-data');
        if(validarEmail() && pegarDataDoForm()){ //coloca a resposta do FORM abaixo
            let div = document.createElement('div');
            div.className = 'div-curriculo';
            div.innerHTML = pegaEntrada;
            dataDoUsuario.appendChild(div);
        }
    }
}

function apagarformsCampos(){
    let pegaValoresInput = document.getElementsByTagName('input');
    let pegaTextArea = document.getElementsByTagName('textarea');
    let pegaDivResposta = document.querySelectorAll('.div-curriculo');
    for(let index=0; index < pegaValoresInput.length && index < pegaDivResposta.length; index += 1 ){
     let pegarDadosEntrada = pegaValoresInput[index];
     pegaValoresInput.value = '';
     pegaTextArea.value ='';
     pegaDivResposta[index].innerText ='';   
    }
}



