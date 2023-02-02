import pynecone as pc

from app.state import BaseState


class State(BaseState):
    count = 0

    def increment(self):
        self.count += 1

    def decrement(self):
        self.count -= 1


def ca():
    return pc.vstack(
            pc.button("minus",
                      color_scheme="green",
                      border_radius="2em",
                      on_click=State.decrement,),
            pc.text(State.count),
            pc.button("plus",
                      color_scheme="green",
                      border_radius="2em",
                      on_click=State.increment,),
            padding="50px")
