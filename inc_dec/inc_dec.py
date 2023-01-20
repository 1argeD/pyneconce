import pynecone as pc


# ①
class State(pc.State):
    pass


# ②
def hello():
    return pc.text("Hello, World")


def index():
    return hello()


# ③
app = pc.App(state=State)
app.add_page(index)
app.compile()