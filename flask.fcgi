#!/home/dh_faq8jv/wrmf.me/NIFA/venv/bin/python

import logging

# Configure logging
logging.basicConfig(
    filename='/home/dh_faq8jv/wrmf.me/NIFA/flask_app.log',
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

logging.info("flask.fcgi script started")

print("Content-Type: text/plain\n")
print("Hello, world!")
