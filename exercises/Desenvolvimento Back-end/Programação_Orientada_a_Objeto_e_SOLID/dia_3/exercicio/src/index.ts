import Clube from "./Clube";
import QuadraFutebol from "./QuadraFutebol";
import QuadraTenis from "./QuadraTenis";

const tClube = new Clube();
const quadraFutebol = new QuadraFutebol();

tClube.adicionarQuadra(quadraFutebol);

const dataReserva = new Date('2023-04-18');


const reservarQuadraFutebol = tClube.buscarQuadra<QuadraFutebol>(0).reservar(dataReserva);

console.log(reservarQuadraFutebol);

const quadraTenis = new QuadraTenis();
tClube.adicionarQuadra(quadraTenis);


const reservarQuadraTenis = tClube.buscarQuadra<QuadraTenis>(1).reservar(dataReserva);

console.log(reservarQuadraTenis);