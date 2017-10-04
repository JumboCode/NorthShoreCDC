from flask import Flask
app = Flask(__name__)

from flask.ext.wtf import Form
from wtforms.fields import StringField, BooleanField
from wtforms.validators import DataRequired

class FirePut(Form):
    title = StringField('title', validators=[DataRequired()])
    year = StringField('year', validators=[DataRequired()])
    rating = StringField('rating', validators=[DataRequired()])

@app.route('/')
def hello_world():
    return 'Hello, World!'
