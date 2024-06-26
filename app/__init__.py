from flask import Flask

app = Flask(__name__)

# Configuration
app.config.from_object('config')

# Import views
from app import views
