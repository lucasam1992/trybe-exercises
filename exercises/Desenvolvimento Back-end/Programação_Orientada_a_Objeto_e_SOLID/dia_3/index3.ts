// As classes abstratas não podem ser instanciadas, ou seja, você não pode criar um objeto a partir de uma classe abstrata.
// Métodos abstratos só podem existir em classes abstratas, e eles devem ser implementados na subclasse.
abstract class Employee {
    constructor(public name: string) { }

    abstract MIN_SALARY: number

    abstract work(): void
}

class Instructor extends Employee {
    constructor(public name: string) {
        super(name);
    }
    MIN_SALARY = 10000;
    work() {
      console.log(`${this.name} está auxiliando as pessoas estudantes em mentorias.`); 
    } 
}

class Specialist extends Employee {
    constructor(public name: string) {
        super(name);
    }
    MIN_SALARY = 20000;
    work() {
        console.log(`${this.name} está ministrando uma aula ao vivo.`); 
    }
}

class Facilitator extends Employee {
    constructor(public name: string) {
      super(name); 
    }
    MIN_SALARY = 50000;
    work() { console.log(`${this.name} está conduzindo um 1:1.`); }
}

const instructor = new Instructor('Victor');
const specialist = new Specialist('Gus');
const facilitator = new Facilitator('Silvinha');

instructor.work(); // Victor está auxiliando as pessoas estudantes em mentorias.
specialist.work(); // Gus está ministrando uma Aula Ao Vivo.
facilitator.work(); // Silvinha está conduzindo um 1:1.