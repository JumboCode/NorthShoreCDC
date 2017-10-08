from flask import Flask, render_template
from firebase import firebase
import os
from flask.ext.wtf import FlaskForm as Form
from wtforms.fields import StringField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.csrf import CSRFProtect

firebase_path = os.environ.get('FIREBASE_PATH')
firebase = firebase.FirebaseApplication(firebase_path, None)

app = Flask(__name__)
app.secret_key = os.environ.get('APP_KEY')

class FirePut(Form):
    title = StringField('title', validators=[DataRequired()])
    year = StringField('year', validators=[DataRequired()])
    rating = StringField('rating', validators=[DataRequired()])

count = 0

@app.route('/api/put', methods=['GET', 'POST'])
def fireput():
    form = FirePut()
    if form.validate_on_submit():
        global count
        count += 1
        putData = {'Title' : form.title.data, 'Year' : form.year.data,
                   'Rating' : form.rating.data}
        firebase.put('/films', putData['Title'], putData)
        # return render_template('form-result.html', putData=putData)
    return render_template('My-Form.html', form=form)

@app.route('/')
def hello_world():
    return 'Hello, World!'
