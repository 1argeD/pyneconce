import pynecone as pc


class State(pc.State):
    count = 0

    def increment(self):
        self.count += 1

    def decrement(self):
        self.count -= 1


def index():
    return pc.hstack(
        pc.button("감소", on_click=State.decrement),
        pc.text(State.count),
        pc.button("증가", on_click=State.increment),
    )


app = pc.App(state=State)
app.add_page(index)
app.compile()