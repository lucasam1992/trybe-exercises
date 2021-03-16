function maisRepetido(nomes){
    let nomeGrande= nomes[0] ;
    for(let index in nomes){
        if(nomeGrande.length< nomes[index].length){
            nomeGrande=nomes[index];
        }
    }
    return nomeGrande;
}

console.log(maisRepetido(['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana']));