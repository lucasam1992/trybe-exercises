module.exports = (num) => {
    if(typeof num !== 'number'){
        return 'o parametro deve ser um numero';
    }
    if(num > 0){
        return 'positivo';
    }
    if(num < 0){
        return 'negativo';
    }

    return 'neutro';
};