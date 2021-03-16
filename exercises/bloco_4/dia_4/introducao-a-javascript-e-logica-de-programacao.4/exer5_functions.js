function numeroRepetido(valor){
    let cont;
    let valRepetido= 0;
    let indexValRep=0;
    for(let index in valor){
        let verificaValor = valor[index];
        for(let index2 in valor){
            if( verificaValor === valor[index2]){
                cont+=1;
            }
        }
        if(cont > valRepetido ){
            valRepetido=cont;
            indexValRep=index;
        }
        cont=0;
    }
    return valor[indexValRep];
}

console.log(numeroRepetido([2, 3, 2, 5, 8, 2, 3]));