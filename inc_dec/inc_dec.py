import pynecone as pc


class State(pc.State):
    count = 0

    def increment(self):
        self.count += 1

    def decrement(self):
        self.count -= 1


def index():
    return pc.hstack(
        pc.button("줄이기", on_click=State.decrement,
                  color_scheme="red", border_radius="2em"),
        pc.text(State.count),
        pc.button("늘리기", on_click=State.increment,
                  color_scheme="green", border_radius="2em"),
        padding="50px"
    )


def todo():
    return pc.hstack(
        pc.text("todo page")
    )


app = pc.App(state=State)
app.add_page(index)
app.add_page(todo, path="todo")
app.compile()
