from flask import Flask, render_template
from firebase import firebase
import os
from flask_wtf import FlaskForm as Form
from wtforms.fields import StringField, BooleanField
from wtforms.validators import *
from flask_wtf.csrf import CSRFProtect

firebase_path = os.environ.get('FIREBASE_PATH')
firebase = firebase.FirebaseApplication(firebase_path, None)

app = Flask(__name__)
app.secret_key = os.environ.get('APP_KEY')

class FirePut(Form):
    photo = StringField('Photo', validators=[DataRequired(), URL(require_tld=True, message=None)])
    lat = StringField('Lat', validators=[DataRequired(), NumberRange(min="40.0", max = "43.0")])
    longitude = StringField('Long', validators=[DataRequired(), NumberRange(min="-71.0", max = "-69.0")])
    artist = StringField('Artist', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    month = StringField('Month', validators=[DataRequired(), AnyOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])])
    year = StringField('Year', validators=[DataRequired(), NumberRange(min="1980", max = "3000")])

count = 0

@app.route('/api/put', methods=['GET', 'POST'])
def fireput():
    form = FirePut()
    if form.validate_on_submit():
        global count
        count += 1
        putData = { 'Photo' : form.photo.data, 'Lat' : form.lat.data,
        			'Long' : form.longitude.data, 'Artist' : form.artist.data,
        			'Title' : form.title.data, 'Month' : form.month.data,
        			'Year' : form.year.data }
        firebase.put('/murals', putData['Title'], putData)
        return render_template('form-result.html', putData=putData)
    return render_template('My-Form.html', form=form)

@app.route('/api/get', methods = ['GET'])
def fireget():
	murals = firebase.get('/','murals')
	print(murals)
	return render_template('disp-all.html', murals=murals)


@app.route('/')
def hello_world():
    return firebase.get('/', 'test')
