class MainMemory:
    def __init__(self):
        self.clean()

    def load(self, value):
        # Sua implementação
        self.loaded_memory.append(value)

    def get(self, index):
        # Sua implementação
        try:
            return float(self.loaded_memory[index])
        except IndexError:
            return 0

    def clean(self):
        self.loaded_memory = []
