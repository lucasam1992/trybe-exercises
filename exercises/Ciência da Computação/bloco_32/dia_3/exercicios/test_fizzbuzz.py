import fizzbuzz


def test_return_list_numbers():
    assert fizzbuzz.fizzbuzz(2) == [1, 2]


def test_return_divisible_three():
    assert fizzbuzz.fizzbuzz(3)[-1] == "Fizz"


def test_return_divisible_five():
    assert fizzbuzz.fizzbuzz(5)[-1] == "Buzz"


def test_return_div_five_n_three():
    assert fizzbuzz.fizzbuzz(15)[-1] == "FizzBuzz"
