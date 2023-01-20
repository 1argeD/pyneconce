import pynecone as pc


config = pc.Config(
    # app_name="pynecone_tutorial",
    app_name="inc_dec",  # <--
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)
