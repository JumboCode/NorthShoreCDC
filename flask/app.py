from flask import Flask, render_template
from firebase import firebase
import os
from flask.ext.wtf import Form
from wtforms.fields import StringField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.secret_key = os.environ.get('FIREBASE_KEY', '/.env')

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
        firebase.put('/films', 'film' + str(count), putData)
        return render_template('api-put-result.html', form=form,
                                putData=putData)
    return render_template('My-Form.html', form=form)

@app.route('/')
def hello_world():
    return 'Hello, World!'
