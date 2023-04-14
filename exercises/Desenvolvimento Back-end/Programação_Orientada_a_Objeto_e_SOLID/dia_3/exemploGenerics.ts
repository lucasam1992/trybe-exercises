// Escolhemos uma letra para representar o elemento e a colocamos entre sinais de menor e maior que (<>) após o nome da classe
// Utilizamos esta letra no lugar do tipo Pessoa

class Contract<T>  {
    static _number = 0;
    constructor(public broker: T){ }
    static get number() { return this._number; }
}

// Tipo inferido (não explícito)
const c1 = new Contract(pp0); // TypeScript "advinha" que pp0 é pessoa física
console.log(c1.broker.cpf);

// Tipagem explícita
const c2: Contract<LegalPerson> = new Contract(lp); // Deixo explícito que lp é pessoa jurídica
console.log(c2.broker.cnpj);

/*
Saída:
123456789
834729384723
*/