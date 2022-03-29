function indiceMaiorValor(numeros){
    let maior=0;
    for(let index in numeros){
        if(numeros[maior] < numeros[index]){
            maior=index;
        }
    }
    return maior;

}

console.log(indiceMaiorValor([2, 300, 6, 7, 10, 10000]));
