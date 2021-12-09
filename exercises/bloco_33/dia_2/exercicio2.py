from collections import Counter


class Estatistica:
    @classmethod
    def media(cls, numero):
        return sum(numero)/len(numero)

    @classmethod
    def mediana(cls, numero):
        numero.sort()  # ordenando em ordem crescente
        index = len(numero) // 2
        if len(numero) % 2 == 0:  # verifica se par = mediana é a media dos
            # dois valores centrais
            # soma os dois valores centrais e divide
            return (numero[index - 1] + numero[index]) / 2
        return numero[index]

    @classmethod
    def moda(cls, numero):
        numero, _ = Counter(numero).most_common()[0]


numeros = [12, 4, 50, 55, 29]
calcular = Estatistica().mediana(numeros)
print(calcular)
