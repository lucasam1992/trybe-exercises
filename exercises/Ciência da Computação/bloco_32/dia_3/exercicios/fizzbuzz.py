def fizzbuzz(num):
    numbers = []
    for number in range(1, num+1):
        if number % 15 == 0:
            numbers.append("FizzBuzz")
        elif number % 3 == 0:
            numbers.append("Fizz")
        elif number % 5 == 0:
            numbers.append("Buzz")
        else:
            numbers.append(number)
    return numbers
