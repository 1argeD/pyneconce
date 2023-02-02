import pynecone as pc

from app.state import BaseState


class State(BaseState):
    items = [
        "DDang",
        "asdf",
        "adssg",
    ]
    new_item = ""

    def add_item(self):
        self.item += [self.new_item]

    def finsh_item(self, item):
        self.items = [i for i in self.items if i != item]


def render_item(item):
    return pc.list_item(pc.hstack(
        pc.button(on_click=lambda: State.finsh_item(item)),
        pc.text(item)
    ))


def todo():
    return pc.container(
        pc.vstack(
            pc.heading("Title"),
            pc.input(on_blur=State.set_new_item),
            pc.button("Add", on_click=State.add_item),
            pc.ordered_list(
                pc.foreach(State.items, lambda item: render_item(item)),
            ),
        ),
    )
