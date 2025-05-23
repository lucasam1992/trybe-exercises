// Exemplo de Inversão de Dependência
interface Instrument {
    name: string;
    play(): void;
}

class Flute implements Instrument {
    constructor(public name: string){}

    public play(): void {
        console.log(`${this.name} está emitindo melodias`);
    }
}

class Drums implements Instrument {
    constructor(public name: string){}

    public play(): void {
        console.log(`${this.name} está fazendo o ar vibrar bem forte`);
    }
}

class Guitar implements Instrument {
    constructor(public name: string){}

    public play(): void {
        console.log(`${this.name} está vibrando suas cordas`);
    }
}


class Musician {
    constructor(
        public name: string, 
        public instrument: Instrument = new Flute('Minha Flauta')
    ){}

    play() {
        this.instrument.play();
        console.log(`${this.name} é quem está comandando a emissão dos sons`);
    }
}

//const musician1 = new Musician('Márcia');
//musician1.play();

//const musician2 = new Musician('Vicente', new Drums('Minha bateria'));
//musician2.play();

const musician3 = new Musician('Natan', new Guitar('Meu violão'));
musician3.play();