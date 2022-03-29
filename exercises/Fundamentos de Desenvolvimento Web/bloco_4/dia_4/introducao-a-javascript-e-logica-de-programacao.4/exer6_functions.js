function somatorio(n){
    let cont;
    let somatorio=0;
    for(let index=n; index>0; index-=1){
        somatorio+=index;
    }
    return somatorio;
}

console.log(somatorio(5));