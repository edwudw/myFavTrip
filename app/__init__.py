from flask import Flask

app = Flask(__name__, static_url_path='/myfavtrip/static')
app.config["SECRET_KEY"] = "Highly secret key"
app.config["APPLICATION_ROOT"] = "/myfavtrip"
from app import routes
