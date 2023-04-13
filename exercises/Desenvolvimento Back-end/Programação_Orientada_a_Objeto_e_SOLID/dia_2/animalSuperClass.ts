class AnimalSuperClass {
    constructor(protected birthDate: Date) {}
}

class Birddd extends AnimalSuperClass {
    constructor(public name: string) {
        super(new Date()); // o super é uma referencia a superclasse. Ao ser invocado como uma função, está invocando o construtor da superclasse.
    } // o super tbm é util quando é feito sobrescrita de métodos.
}