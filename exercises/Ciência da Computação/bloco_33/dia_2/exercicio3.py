from abc import ABC, abstractmethod
from math import pi as PI


class Figura(ABC):  # classe será abstrata
    @abstractmethod
    def area(self):
        raise NotImplementedError

    @abstractmethod
    def perimetro(self):
        raise NotImplementedError


class Quadrado(Figura):
    def __init__(self, lado):
        self.lado = lado

    def area(self):
        return self.lado * self.lado

    def perimetro(self):
        return 4 * self.lado


class Retangulo(Figura):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def area(self):
        return self.lado * self.altura

    def perimetro(self):
        return (self.lado + self.altura)*2


class Circulo(Figura):
    def __init__(self, raio):
        self.raio = raio

    def area(self):
        return PI * self.raio * self.raio

    def perimetro(self):
        return 2 * PI * self.raio


calcular = Quadrado(2)
print(calcular.area())
calcular2 = Circulo(10)
print(calcular2.perimetro())
