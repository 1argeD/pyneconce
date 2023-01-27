import pynecone as pc
from page.calculator import calculator
from page.todo import todo


def ca():
    return open(calculator)


def td():
    return open(todo)


app = pc.App()
app.add_page(ca)
app.add_page(td)
app.compile()
