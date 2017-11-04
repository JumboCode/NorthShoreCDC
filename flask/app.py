from flask import Flask, render_template, redirect
from firebase import firebase
import os
from flask_wtf import FlaskForm as Form
from wtforms.fields import *
from wtforms.validators import *
from flask_wtf.csrf import CSRFProtect
from firebase.firebase import FirebaseApplication, FirebaseAuthentication
import uuid


firebase_path = os.environ.get('FIREBASE_PATH')


app = Flask(__name__)
app.secret_key = os.environ.get('APP_KEY')

#authentication = FirebaseAuthentication(os.environ.get('FIREBASE_KEY'), 'info@northshorecdc.org', extra={'id': 123})
#firebase.authentication = authentication

firebase = FirebaseApplication(firebase_path, None)

#user = authentication.get_user()


class FirePut(Form):
    photo = StringField('Photo', validators=[DataRequired(), URL(require_tld=True, message=None)])
    lat = DecimalField('Lat', validators=[DataRequired(), NumberRange(min=40.0, max = 43.0)])
    longitude = DecimalField('Long', validators=[DataRequired(), NumberRange(min=-71.0, max = -69.0)])
    artist = StringField('Artist', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    month = StringField('Month', validators=[DataRequired(), AnyOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])])
    year = IntegerField('Year', validators=[DataRequired(), NumberRange(min=1980, max = 3000)])
    description = TextAreaField('Description', validators=[DataRequired()])
    medium = StringField('Medium', validators=[DataRequired()])

class ArtistPut(Form):
    photo = StringField('Photo', validators=[DataRequired(), URL(require_tld=True, message=None)])
    name = StringField('Name', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    bio = TextAreaField('Bio', validators=[DataRequired()])


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
        			'Year' : form.year.data, 'Description' : form.description.data,
        			'Medium' : form.medium.data }
        firebase.put('/murals', uuid.uuid4(), putData)
        return render_template('form-result.html', putData=putData)
    return render_template('My-Form.html', form=form)


@app.route('/api/new_artist', methods=['GET', 'POST'])
def artistput():
    form = ArtistPut()
    if form.validate_on_submit():
        putData = { 'photo' : form.photo.data, 'name' : form.name.data,
        			'city' : form.city.data, 'bio' : form.bio.data}
       	artists = firebase.get('/', 'artists')
        firebase.put('/artists', str(len(artists)), putData)
        return redirect("localhost:5000/api/put", code=302)
    return render_template('artist-form.html', form=form)

@app.route('/api/get', methods = ['GET'])
def fireget():
	murals = firebase.get('/','murals')
	print(murals)
	return render_template('disp-all.html', murals=murals)


@app.route('/')
def hello_world():
    return firebase.get('/', 'test')
