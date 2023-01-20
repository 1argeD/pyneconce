import pynecone as pc


# ①
class State(pc.State):
    pass


# ②
def index():
    return pc.text("Hello World")


# ③
app = pc.App(state=State)
app.add_page(index)
app.compile()