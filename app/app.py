import pynecone as pc

from app.pages.todo import todo
from app.pages.calculator import ca

from .state import BaseState

app = pc.App(state=BaseState)
app.add_page(todo, path="/todo")
app.add_page(ca)
app.compile()