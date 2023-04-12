class PersonEncap {
    name: string;
    private _weight: number;
    private _age: number;
    readonly height: number;
  
    constructor(name: string, height: number, weight: number, age: number) {
      this.name = name;
      this._weight = weight;
      this._age = age;
      this.height = height;
    }
  
    getWeight() {
      return this._weight;
    }
  
    get age() {
      return this._age;
    }

    set age(newValue: number) {
      if (newValue >= 0 && newValue < 200) {
        this._age = newValue;
      }
    }
  
    birthday() {
      this._age += 1;
    }
  
  }
  
  const pEncp1 = new PersonEncap('Maria', 171, 58, 19);
  const pEncp2 = new PersonEncap('João', 175, 66, 18);

  // Alteração direta de variável pública
  pEncp1.name = 'Mariah';
// Acesso direto a variável pública
console.log(pEncp1.name);
// Acesso a método público que manipula atributo privado
console.log(pEncp1.getWeight());
// Acesso a método com getter para manipular atributo privado como se fosse público
console.log(pEncp2.age);
// Acesso a método público que manipula atributo privado
pEncp2.birthday();
console.log(pEncp2.age);
// Acesso a método com setter para manipular atributo privado como se fosse público
pEncp2.age = 17;
console.log(pEncp2.age);
// Leitura de atributo readonly
console.log(pEncp1.height);
