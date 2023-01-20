import pynecone as pc


# ①
class State(pc.State):
    pass


def index():
    return pc.hstack(
        pc.button('줄이기'), pc.text("0"), pc.button('늘리기')
    )


# ③
app = pc.App(state=State)
app.add_page(index)
app.compile()