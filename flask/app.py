from flask import Flask, render_template
from firebase import firebase
import os
from flask_wtf import FlaskForm as Form
from wtforms.fields import StringField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.csrf import CSRFProtect

firebase_path = os.environ.get('FIREBASE_PATH')
firebase = firebase.FirebaseApplication(firebase_path, None)

app = Flask(__name__)
app.secret_key = os.environ.get('APP_KEY')

class FirePut(Form):
    photo = StringField('Photo', validators=[DataRequired()])
    lat = StringField('Lat', validators=[DataRequired()])
    longitude = StringField('Long', validators=[DataRequired()])
    streetaddress = StringField('Street_Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    zipcode = StringField('Zipcode', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    month = StringField('Month', validators=[DataRequired()])
    year = StringField('Year', validators=[DataRequired()])

count = 0

@app.route('/api/put', methods=['GET', 'POST'])
def fireput():
    form = FirePut()
    if form.validate_on_submit():
        global count
        count += 1
        putData = { 'Photo' : form.photo.data, 'Lat' : form.lat.data,
        			'Long' : form.longitude.data, 'Street_Address' : form.streetaddress.data,
        			'City' : form.city.data, 'State' : form.state.data,
        			'Zipcode' : form.zipcode.data, 'Artist' : form.artist.data,
        			'Title' : form.title.data, 'Month' : form.month.data,
        			'Year' : form.year.data }
        firebase.put('/murals', putData['Title'], putData)
        return render_template('form-result.html', putData=putData)
    return render_template('My-Form.html', form=form)

@app.route('/')
def hello_world():
    return firebase.get('/', 'test')
