from app.models import listing
import os
import logging
import time
import sys
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.listings_routes import listings_routes
from .api.images_routes import image_routes
from .api.applications_routes import applications_routes

from .seeds import seed_commands

from .config import Config

from prometheus_flask_exporter import PrometheusMetrics
from prometheus_client import generate_latest, Counter, Histogram, Summary, Gauge

logging.basicConfig(level=logging.INFO)
logging.info("Setting LOGLEVEL to INFO")


app = Flask(__name__)
metrics = PrometheusMetrics(app)

metrics.info("app_info", "App Info, this can be anything you want", version="1.0.0")

# h = Histogram('request_latency_seconds', 'Description of histogram')
# h.observe(4.7)    # Observe 4.7 (seconds in this case)

# s = Summary('request_latency_seconds', 'Description of summary')
# s.observe(4.7)    # Observe 4.7 (seconds in this case)

c = Counter('my_requests_total', 'HTTP Failures', ['method', 'endpoint'])
c.labels('get', '/').inc()
c.labels('get', '/applications/*').inc()


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(listings_routes, url_prefix='/api/listings')
app.register_blueprint(image_routes, url_prefix='/api/images')
app.register_blueprint(applications_routes, url_prefix='/api/applications')


db.init_app(app)
Migrate(app, db, compare_type=True)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/flask-prometheus-grafana-example/')
def hello():
    return jsonify(say_hello())
def say_hello():
    return {'message': 'hello'}


@app.route('/metrics')
def metrics():
    return generate_latest()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
