class Student {
    private _matricula: string;
    private _nome: string;
    private _notaProva: number[]; // armazena 4 notas de prova
    private _notaTrabalho: number[]; // armazena 2 notas de trabalho

    constructor(matricula: string, nome: string) {
        this._matricula = matricula;
        this._nome = nome;
        this._notaProva = [];
        this._notaTrabalho = [];
    }

    get matricula(): string {
        return this._matricula;
    }

    get nome(): string {
        return this._nome;
    }

    get notaProva(): number[] {
        return this._notaProva;
    }

    get notaTrabalho(): number[] {
        return this._notaTrabalho;
    }

    set matricula(m: string) {
        this._matricula = m;
    }

    set nome(n: string) {
        this._nome = n;
    }

    set notaProva(v: number[]) {
        if (v.length > 4) {
            throw new Error('Máximo 4 notas de provas');
        }
        
        this._notaProva = v;
    }

    set notaTrabalho(v: number[]) {
        if(v.length > 2) {
            throw new Error('Máximo 2 notas de trabalhos');
        }

        this._notaTrabalho;
    }

    somaNotas(): number { return }
    
    mediaDasNotas(): number { return }
}

const personOne = new Student('202001011', 'Maria da Silva');

console.log(personOne);

const personTwo = new Student('202001012', 'João da Silva');

console.log(personTwo);