let salarioBruto=1200;
let salarioBase;
let salarioLiquido;
let salarioINSSDescontado;
let salarioIR;

if(salarioBruto<=0){
    console.log("valores inválidos. Tente Novamente");

}else{

if(salarioBruto<=1556.94){
    
    salarioINSSDescontado=salarioBruto*0.08;
    salarioBase=salarioBruto-salarioINSSDescontado;
    
}else if(salarioBruto <= 2594.92){

    salarioINSSDescontado=salarioBruto*0.09;
    salarioBase=salarioBruto-salarioINSSDescontado;
  
}else if(salarioBruto <= 5189.82){
    
    salarioINSSDescontado=salarioBruto*0.11;
    salarioBase=salarioBruto-salarioINSSDescontado;

}else if( salarioBruto>=5189.82){
    
    salarioINSSDescontado=salarioBruto-570.88;
    salarioBase=salarioBruto-salarioINSSDescontado;

}else{
    console.log("Valor invalido. Digite Novamente");
}


if(salarioBase<=1903.98){
    
    salarioLiquido=salarioBase;
    console.log("O salario liquido do cidadão é",salarioLiquido,"reais");

}else if(salarioBase <= 2826.65){
    
    salarioIR=(salarioBase*0.075)-142.80;
    salarioLiquido=salarioBase-salarioIR;

    console.log("O salario liquido do cidadão é",salarioLiquido,"reais");



}else if(salarioBase <= 3751.05){

    salarioIR=(salarioBase*0.15)-354.80;
    salarioLiquido=salarioBase-salarioIR;

    console.log("O salario liquido do cidadão é",salarioLiquido,"reais");



}else if(salarioBase <= 4664.68){

    salarioIR=(salarioBase*0.225)-636.13;
    salarioLiquido=salarioBase-salarioIR;

    console.log("O salario liquido do cidadão é",salarioLiquido,"reais");


}else{

    salarioIR=(salarioBase*0.275)-869,36;
    salarioLiquido=salarioBase-salarioIR;

    console.log("O salario liquido do cidadão é",salarioLiquido,"reais");
}

}


