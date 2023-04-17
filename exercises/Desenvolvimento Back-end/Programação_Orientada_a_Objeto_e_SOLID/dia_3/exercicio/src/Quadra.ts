import IAgenda from './interfaces/IAgenda';

abstract class Quadra {
    protected abstract reservar<T>(data: Date): IAgenda<T>;
}

export default Quadra;