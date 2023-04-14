abstract class Character {
    abstract talk(): void;
    abstract specialMove(): void;

    static characterPresentation(character: Character): void {
        character.talk();
        character.specialMove();
    }
}

class MeleeCharacter extends Character {
    constructor(private _name: string, private _specialMoveName: string){
        super();
    }

    talk(): void {
        console.log(`${this._name} ataque de curto alcance`);
    };
    specialMove(): void {
        console.log(`${this._name} -> ${this._specialMoveName}`);
    }
}

class LongRangeCharacter extends Character {
    constructor(private _name: string, private _specialMove: string) {
        super();
    }
    talk(): void {
        console.log(`${this._name} ataque de longo alcance`);
    };
    specialMove(): void {
        console.log(`${this._name} -> ${this._specialMove}`);
    }
}

const batman = new MeleeCharacter('Batman', 'morcego bomba');
const spiderman = new LongRangeCharacter('Homem Aranha', 'teia de aranha');

// batman.talk();
// batman.specialMove();
// spiderman.talk();
// spiderman.specialMove();

Character.characterPresentation(batman);
Character.characterPresentation(spiderman);