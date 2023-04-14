// Um método estático nada mais é do que uma função que não precisa acessar nenhum atributo do objeto.
//A diferença semântica de um método estático para uma função é que o método estático tem a ver com a classe.
//Isso significa que fica um pouco “sem sentido” você disponibilizar um método sozinho, pois, por mais que ele não precise manipular uma instância, ele está muito ligado à classe.
//podemos ter atributos estáticos, que são acessados manipulando a classe, não a instância.

class Employee {
    // todas as instâncias acessam ao mesmo valor de employeeCount pois esta variável pertence a classe
    private static employeeCount = 0;
    
    private employeeName: string;

    constructor(name: string) {
        Employee.addEmployee(); // Pelo fato do o método addEmployee() ser estático, ou seja, acessível 
        // apenas a partir da própria classe e não de suas instâncias, é que a chamamos a partir de Employee e não do 'this'

        this.employeeName = name; // this se refere a instancia dessa classe
    }

    private static addEmployee() {
        Employee.employeeCount += 1;
        console.log(`Total de pessoas funcionárias: ${Employee.employeeCount}`)
    }

    public getName(): string { // método comum usado pelas instancias e não pela classe
        return this.employeeName;
    }
}

const employee1 = new Employee('Kissyla'); // Total de pessoas funcionárias: 1
const employee2 = new Employee('Calaça'); // Total de pessoas funcionárias: 2
const employee3 = new Employee('Setinha'); // Total de pessoas funcionárias: 3

// Os métodos e atributos estáticos pertencem a classe e não aos objetos da classe.
// Se um atributo estático tiver seu valor alterado em algum objeto da classe, a alteração se aplicará a todos os objetos já instanciados e os que serão instanciados.
