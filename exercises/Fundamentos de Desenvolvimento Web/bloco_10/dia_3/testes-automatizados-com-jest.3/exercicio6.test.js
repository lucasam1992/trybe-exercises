const service = require('./exercicio6');
describe("teste a requisição", () => {
    service.fetchDog = jest.fn();
    afterEach(service.fetchDog.mockReset);

    test('teste se a promise passou', async () => {
        service.fetchDog.mockResolvedValue("request sucess");

        service.fetchDog();
        expect(service.fetchDog()).resolves.toBe("request sucess");
        expect(service.fetchDog).toHaveBeenCalled();
    });

    test("teste se promise nao passou", async () => {
        service.fetchDog.mockRejectedValue("request failed");

        expect(service.fetchDog).rejects.toMatch("request failed");
        expect(service.fetchDog).toHaveBeenCalled();

    });
});