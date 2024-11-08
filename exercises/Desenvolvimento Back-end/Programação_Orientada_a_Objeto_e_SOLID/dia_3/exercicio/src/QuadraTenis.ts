import ITenis from "./interfaces/ITenis";
import IAgenda from "./interfaces/IAgenda";
import normas from "./normas/normasDeUso";
import Quadra from "./Quadra";

class QuadraTenis extends Quadra {
    public tenisData: ITenis = normas.tenis;

    public reservar<ITenis>(horaReserva: Date): IAgenda<ITenis> {
        const protocolo = (Math.random() + 1).toString(30).substring(3); 
        return { protocolo, data: horaReserva, regras: this.tenisData as unknown as ITenis }
    }
}

export default QuadraTenis;