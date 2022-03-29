class Node:
    def __init__(self, value):
        # dado a ser armazenado
        self.value = value
        # forma de apontar para outro nó
        self.next = None

    def __str__(self):
        return f"Node(value={self.value}, next={self.next})"
