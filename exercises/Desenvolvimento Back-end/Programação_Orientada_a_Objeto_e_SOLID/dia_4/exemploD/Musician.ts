// Musician.ts
/*
import Flute from './Flute';

export default class Musician {
  public flute: Flute;

  constructor(public name: string) {
    this.flute = new Flute('minha flauta');
  }

  play(): void {
    this.flute.play();
    console.log(
      `"${this.name}" é quem está comandando a emissão das melodias`,
    );
  }
}

const musician = new Musician('Márcia');
musician.play();
*/

// Esta abordagem não é ideal pois, fixamos um determinado objeto como dependência, criando assim um alto acoplamento
// e faz com que o código fique dificil de ser testado e utilizado em outros lugares e contextos.
// Se você fizer um teste de Musician.play() este teste vai ser, obrigatoriamente, um teste de integração, pois o método Flute.play() também será executado.

// Injeção de Dependência exemplo
import Flute from "./Flute";

export default class Musician {
    // é possivel passar uma flauta “fake”, mockada, para Musician, e assim testar unitariamente o método Musician.play()
    constructor(public name: string, public flute: Flute = new Flute('Minha Flauta')){}

    play(): void {
        this.flute.play();
        console.log(`${this.name} é quem está comandando a emissão de melodias`);
        
    }
}

// const flute = new Flute('Minha flauta');
const musician = new Musician('Marcelo' /*, flute*/);
musician.play();