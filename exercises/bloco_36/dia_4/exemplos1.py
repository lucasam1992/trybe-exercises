class Conjunto:
    def __init__(self):
        self.set = [False] * 1001
        self.element_final = 0

    def add(self, item):
        if not self.set[item]:
            self.set[item] = True
        if item > self.element_final:
            self.element_final = item

    def __str__(self):
        string = '{'
        for index, is_in_set in enumerate(self.set):
            if is_in_set:
                string += str(index)
                if index < self.element_final:
                    string += ", "
        string += "}"
        return string

    def __contains__(self, item):
        return self.set[item]

    def union(self, conjuntoB):
        new_conj = Conjunto()

        for index in range(1001):
            if self.set[index] or conjuntoB.set[index]:
                new_conj.add(index)
        return new_conj

    def intersection(self, conjuntoB):
        new_conj = Conjunto()

        for index in range(1001):
            if self.set[index] and conjuntoB.set[index]:
                new_conj.add(index)
        return new_conj


if __name__ == "__main__":
    conj = Conjunto()
    for item in [0, 10, 100, 1000]:
        conj.add(item)
    print(conj)

    conj2 = Conjunto()
    for item in [1, 2, 3]:
        conj2.add(item)
    print(conj2)

    conj3 = Conjunto()
    for item in [7, 2, 10]:
        conj3.add(item)
    print(conj3)

    conj4 = Conjunto()
    print(conj4)

    print(1 in conj)
    print(0 in conj)
    print(1000 in conj)

    conj5 = Conjunto()
    for i in range(1, 11):
        conj5.add(i)

    conj6 = Conjunto()
    for i in range(10, 21):
        conj6.add(i)

    conj7 = conj5.union(conj6)
    print(conj7)

    conj8 = Conjunto()
    for i in [1, 2, 3]:
        conj8.add(i)

    conj9 = Conjunto()
    for i in [7, 2, 10]:
        conj9.add(i)

    conj10 = conj8.intersection(conj9)
    print(conj10)
