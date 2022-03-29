let valorCusto=36;
let valorVenda=100;
let valorCustoTotal;
let lucro;



if(valorCusto<=0 || valorVenda<=0){
    console.log("valores inválidos. Tente Novamente")

}else{
    valorCustoTotal= valorCusto + valorCusto*0.2;
    lucro = valorVenda - valorCustoTotal;
    console.log("A empresa terá", lucro ,"reais de lucro");
}

