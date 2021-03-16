function indiceMenorValor(numeros){
    let menor=0;
    for(let index in numeros){
        if(numeros[index]<numeros[menor]){
            menor=index;
        }
    }
    return menor;

}

console.log(indiceMenorValor([2, 4, 6, 7, 10, 0, -3]));