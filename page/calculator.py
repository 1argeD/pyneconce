import pynecone as pc


class Calculator(pc.State):
    count = 0

    def increment(self):
        self.count += 1

    def decrement(self):
        self.count -= 1


def calculator():
    return pc.hstack(
        pc.button("minus", on_click=Calculator.decrement,
                  color_scheme="red", border_radius="2em"),
        pc.text(Calculator.count),
        pc.button("plus", on_click=Calculator.increment,
                  color_scheme="green", border_radius="2em"),
        padding="50px"
    )


app = pc.App(state=Calculator)
app.add_page(calculator)
app.compile()