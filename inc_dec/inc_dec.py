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
    return pc.container(
        pc.vstack(
            pc.heading("제 목"),
            pc.input(),
            pc.button("추 가"),
            pc.ordered_list(
                pc.list_item(pc.hstack(pc.button(), pc.text("아침먹고 땡"))),
                pc.list_item(pc.hstack(pc.button(), pc.text("점심먹고 땡"))),
                pc.list_item(pc.hstack(pc.button(), pc.text("저녁먹고 땡"))),
            ),
        ),
    )


app = pc.App(state=State)
app.add_page(index)
app.add_page(todo, path="todo")
app.compile()
