const funcs = require('./exercicio4');
jest.mock('./exercicio4');
/*
describe('Exercicio 4', () => {
    test('mockando a funcaoUm - retornando em as letras em minusculo', () => {
        funcs.funcaoUm.mockImplementation(palavra=> palavra.toLowerCase());

        expect(funcs.funcaoUm("UPPERCASE")).toBe("uppercase");
        expect(funcs.funcaoUm).toHaveBeenCalledWith("UPPERCASE");
    });
    test("mockando a funcaoDois - retornando a ultima letra da string", () => {
        funcs.funcaoDois.mockImplementation(palavra=>palavra.charAt(palavra.length-1));

        expect(funcs.funcaoDois("palavra")).toBe('a');
        expect(funcs.funcaoDois).toHaveBeenCalledWith('palavra');
    });
    test("mockando a funcaoTres - receber 3 strings e concatena-las", () => {
        funcs.funcaoTres.mockImplementation((a,b,c) => a.concat(b,c));

        expect(funcs.funcaoTres("HT","M","L")).toBe("HTML");
        expect(funcs.funcaoTres).toHaveBeenCalledWith("HT","M","L");
    });
});
*/

//foi utilizado spy pq o exercicio pedia que tivesse a restauração da mock (mockRestore).
describe("Exercicio 5", () => {
    test('mockando a funcaoUm - retornando em as letras em minusculo', () => {
        const funOne = jest.spyOn(funcs, "funcaoUm").mockImplementation(palavra=>palavra.toLowerCase());

        expect(funOne("UPPERCASE")).toBe("uppercase");
        expect(funOne).toHaveBeenCalledWith("UPPERCASE");

        funcs.funcaoUm.mockRestore();

        expect(funcs.funcaoUm("lowercase")).toBe("LOWERCASE");
    });
});