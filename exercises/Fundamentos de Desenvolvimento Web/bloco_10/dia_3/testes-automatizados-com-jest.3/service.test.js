const { test, expect } = require('@jest/globals');
const { describe } = require('yargs');
const service = require('./service');

test("testando função do arquivo service.js", () => {
    service.numeroAle = jest.fn().mockReturnValue(10);
      
    expect(service.numeroAle()).toBe(10);
    expect(service.numeroAle).toHaveBeenCalled();
    expect(service.numeroAle).toHaveBeenCalledTimes(1);   
});

test("exercicio 2", () =>{
    service.numeroAle = jest.fn().mockImplementationOnce((a,b) => a / b);

    expect(service.numeroAle(10,2)).toBe(5);
    expect(service.numeroAle).toHaveBeenCalled();
    expect(service.numeroAle).toHaveBeenCalledTimes(1);
    expect(service.numeroAle).toHaveBeenCalledWith(10,2);
});

describe("exercicio 3", () => {
    test("testando com 3 parametros e fazendo uma multiplicação", () =>{
        service.numeroAle = jest.fn().mockImplementation((a,b,c) => a*b*c);
        
        expect(service.numeroAle(2,3,4)).toBe(24);
        expect(service.numeroAle).toHaveBeenCalled();
        expect(service.numeroAle).toHaveBeenCalledTimes(1); //garantindo que a func seja chamada apenas uma vez
        expect(service.numeroAle).toHaveBeenCalledWith(2,3,4);
    });

    test("mockando função e retornando o dobro do valor passado por parametro", ()=> {
        service.numeroAle.mockReset();
        
        expect(service.numeroAle).toHaveBeenCalledTimes(0); //garantindo que a func  não seja chamada

        service.numeroAle.mockImplementation(a=>a*2);

        expect(service.numeroAle(5)).toBe(10);
        expect(service.numeroAle).toHaveBeenCalled();
        expect(service.numeroAle).toHaveBeenCalledTimes(1); //garantindo que a func seja chamada apenas uma vez
        expect(service.numeroAle).toHaveBeenCalledWith(5);
    });
});