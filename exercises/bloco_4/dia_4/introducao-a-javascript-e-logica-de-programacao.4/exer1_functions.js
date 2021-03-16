function ehpalindromo(palavra){
    let verifica = palavra.split("");
    let verdade= true;
    for(let index in verifica){
        if(verifica[index]!=verifica[(verifica.length-1)-index]){
            verdade=false;
        }
    }
    return verdade;
}

console.log(ehpalindromo("arara"));
console.log(ehpalindromo("coisa"));