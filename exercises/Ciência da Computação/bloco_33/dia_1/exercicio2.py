class Retangulo:
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def calcular_area(self):
        return self.base*self.altura

    def calcular_perimetro(self):
        return (self.base+self.altura)*2


retangulo1 = Retangulo(5, 5)
print(retangulo1.calcular_area())
print(retangulo1.calcular_perimetro())
