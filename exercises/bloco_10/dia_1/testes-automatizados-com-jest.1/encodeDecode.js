function mapString(objectMap, string) {
    const stringSeparada = string.split('');
    const arrayMapeado = stringSeparada.map((carac) =>{
        if(objectMap[carac]){
            return objectMap[carac];
        }
        return carac;
    });
    return arrayMapeado.join('');
}

function decode(string){
    const map ={
        1: 'a',
        2: 'e',
        3: 'i',
        4: 'o',
        5: 'u',
    };
    return mapString(map, string);
}

function encode(string){
    const map ={
        a: '1',
        e: '2',
        i: '3',
        o: '4',
        u: '5',
    };
    return mapString(map, string);
}

const functions = {encode, decode};
module.exports = functions;
