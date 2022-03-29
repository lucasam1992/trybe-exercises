const { test, expect } = require('@jest/globals');
const sum = require('./sum');

describe('sum', () => {
    test('4 mais 5 igual a 9', () => {
        expect(sum(4,5)).toBe(9);
    });

    test('0 mais 0 igual a 0', () => {
        expect(sum(0,0)).toBe(0);
    });

    test('throws an error when a string is passed', () =>{
        expect(()=>{
            sum(4,'5');
        }).toThrow();
    });

    test('error message is "parameters must be numbers"', ()=>{
        expect(()=>{
            sum(4,'5');
        }).toThrow(/parameters must be numbers/);
    });
});




















