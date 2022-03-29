# Exercício 1: Crie uma função que receba dois números e retorne o maior deles.

def mostValue(numb1, numb2):
    if numb1 > numb2:
        return numb1
    else:
        return numb2


def mediaAritmetica(numbers):
    total = 0
    for number in numbers:
        total += number / len(numbers)
    return total


def asteriscos(number):
    for numb in range(number):
        print(number * '*')
