function doMath(a,b,c){
    return new Promise((resolve,reject) => {
        if(typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number')
            reject('Informe apenas numeros');
        
        const total = (a+b)*c;
        if (total < 50) return reject('Valor Baixo');
        
        resolve(total);
    });
}

doMath(10,10,10).then(resolve => console.log(resolve)).catch(error => console.log(error))

doMath('e',10,10).then(resolve => console.log(resolve)).catch(error => console.log(error))

doMath(5,5,1).then(resolve => console.log(resolve)).catch(error => console.log(error))