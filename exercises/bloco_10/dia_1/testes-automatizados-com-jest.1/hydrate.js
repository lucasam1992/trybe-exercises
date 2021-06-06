const converterAlcoolAgua = (desejo) => {
    const separarLetras = desejo.split('');
    const resp = separarLetras.reduce((aguas, letras) => {
        let getNumero = parseInt(letras);
        let verificaSeHaNumero = isNaN(getNumero) === false;
        if(verificaSeHaNumero) {
            return aguas + getNumero;
        }
        return aguas;
    },0);

    const copos = resp === 1 ? 'copo' : 'copos';
    return `${resp} ${copos} de água`;

};

module.exports = converterAlcoolAgua;