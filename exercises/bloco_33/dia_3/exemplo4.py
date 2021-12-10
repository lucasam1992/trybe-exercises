from gerenciator3000 import ReportLoader
from project.analyzer import ReporterAnalyzer
from project.loaders import G3000LoaderAdapter


class ReportAnalyzer:
    def __init__(self, loader):
        self.loader = loader

    def average(self):
        # este é um dos métodos que espera uma lista de dicionários
        data = self.loader.load_data()
        # aqui ela soma o valor na chave final_price em cada item da lista
        total = sum(order['final_price'] for order in data)
        return total / len(data)


# espera que os loaders retornem uma lista de dicionários
# omo a ferramenta retorna os dados:

loader = ReportLoader()
print(loader.headers)   # #  ['id', 'date', ..., 'final_price']
print(loader.rows[0])  # #  [1337, '2020-11-20', ..., 2350.5]


class G3000LoaderAdapter:
    # aqui o loader é uma instancia do gerenciator3000.ReportLoader!
    def __init__(self, loader):
        self.loader = loader

    def load_data(self):

        # o zip junta uma lista de chaves e uma lista de valores
        # e cria um dicionário! por exemplo:
        # zip(['nome', 'idade'], ['Capi', 34]) => {'nome': 'Capi', 'idade': 34}
        return [zip(loader.headers, row) for row in loader.rows]  # tcharans


# o loader da ferramenta é carregado do jeito que a ferramenta recomenda
g3000_loader = ReportLoader(...)
# o adaptador recebe o loader da ferramenta.
loader = G3000LoaderAdapter(g3000_loader)
# o analyzer do nosso sistema recebe o adaptador como qualquer outro loader.
analyzer = ReportAnalyzer(loader)

analyzer.average()  # JUST WORKS (tm)
