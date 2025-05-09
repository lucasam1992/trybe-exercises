class Animal {
    constructor(public name: string, protected birthDate: Date){} // mudança de private para protected, pois não foi possível usar atributo nas subclasses do Animal

    get age() {
      const timeDiff = Math.abs(
        Date.now() -
        new Date(this.birthDate).getTime()
      );
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
}

class Mamifero extends Animal {
    walk() {
      console.log(`${this.name} está andando`);
    }
}

const tiger = new Mamifero('Tigre', new Date(Date.parse('May 03, 2020')),);

const main = (animal: Animal) => {
  console.log(animal.age);
}

main(tiger);
tiger.walk();


class Bird extends Animal {
    fly() {
      console.log(`${this.name} está voando!`);
    }
    showBirthDate() {
      console.log(this.birthDate);
    }
}


const parrot = new Bird('Papagaio', new Date(Date.parse('Jun 07, 2017')),);

console.log(parrot.age);
parrot.fly();
