import sys
import os

sys.path.insert(0, "wrmf.me/NIFA")

# Activate your virtual env
activate_this = 'wrmf.me/NIFA/venv/bin/activate_this.py'
exec(open(activate_this).read(), {'__file__': activate_this})

# Import your Flask app
from app.py import app as application