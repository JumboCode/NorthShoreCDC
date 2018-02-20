from flask import Flask, render_template, redirect, session, url_for, request

import sys
from custom_firebase import firebase 

import os
from flask_wtf import FlaskForm as Form
from wtforms.fields import *
from wtforms.validators import *
from flask_wtf.csrf import CSRFProtect
from custom_firebase.firebase import FirebaseApplication, FirebaseAuthentication
import uuid
import requests
import json
import time
from functools import wraps
#from flask.ext.session import Session


firebase_path = os.environ.get('FIREBASE_PATH')


app = Flask(__name__)

# This is a flask specific secret_key, used for encrypting session cookies
app.secret_key = os.environ.get('SECRET_KEY')


firebase = firebase.FirebaseApplication(firebase_path, None)


#SESSION_TYPE = 'redis'
#Session(app)

def sign_in_with_email_and_password(email, password):
        request_ref = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key={0}".format(os.environ.get('APP_KEY'))
        headers = {"content-type": "application/json; charset=UTF-8"}
        data = json.dumps({"email": email, "password": password, "returnSecureToken": True})
        request_object = requests.post(request_ref, headers=headers, data=data)
        current_user = request_object.json()
        try: 
            reg = current_user["registered"]
            session["auth"] = current_user["idToken"]
            
            # Say it will expire in expiresIn seconds - 5 minutes 
            # session["auth_expiration"] = time.time() + 10
            session["auth_expiration"] = time.time() + int(current_user["expiresIn"]) - 60*5
            
            return redirect("/api/put")
        except KeyError:
            print "Invalid login attempt 47"
            return redirect("/api/login", code=302)

 

class FirePut(Form):
    photo = StringField('Photo', validators=[DataRequired(), URL(require_tld=True, message=None)])
    lat = DecimalField('Lat', validators=[DataRequired(), NumberRange(min=42.51, max = 42.52)])
    longitude = DecimalField('Long', validators=[DataRequired(), NumberRange(min=-70.9, max = -70.88)])
    artist = SelectField('Artist', coerce = unicode, validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    month = StringField('Month', validators=[DataRequired(), AnyOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])])
    year = IntegerField('Year', validators=[DataRequired(), NumberRange(min=1980, max = 3000)])
    description = TextAreaField('Description', validators=[DataRequired()])
    medium = StringField('Medium', validators=[DataRequired()])

class Validate(Form):
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class ArtistPut(Form):
    photo = StringField('Photo', validators=[DataRequired(), URL(require_tld=True, message=None)])
    name = StringField('Name', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    bio = TextAreaField('Bio', validators=[DataRequired()])

def requires_auth(f):    
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'auth' in session and 'auth_expiration' in session:
            auth = session['auth']
            auth_expiration = session['auth_expiration']
            
            # If the auth token is not expired, then you're still "logged in"
            if auth and auth_expiration and time.time() <= auth_expiration:
                firebase.authentication = auth
                result = f(*args, **kwargs)
                firebase.authentication = None
                return result
            
        return redirect('/api/login')
    return decorated



count = 0

@app.route('/api/put', methods=['GET', 'POST'])
@requires_auth
def fireput():
    form = FirePut()
    artists = firebase.get('/', 'artists')
    print (artists)
    c = []
    for a in artists:
    	c.append((artists[a]["uuid"], artists[a]["name"]))
 	c = sorted(c, key = lambda x: x[1])
 	form.artist.choices = c
    if form.validate_on_submit():
        global count
        count += 1
        uuidtoken = uuid.uuid4()
        putData = { 'Photo' : form.photo.data, 'Lat' : form.lat.data,
                    'Long' : form.longitude.data, 'Artist' : form.artist.data,
                    'Title' : form.title.data, 'Month' : form.month.data,
                    'Year' : form.year.data, 'Description' : form.description.data,
                    'Medium' : form.medium.data, 'uuid' : str(uuidtoken) }
        firebase.put('/murals', uuidtoken, putData)
        return render_template('form-result.html', putData=putData)
    return render_template('My-Form.html', form=form)

@app.route('/api/login', methods=['GET','POST'])
def validate():
    form = Validate()
    if form.validate_on_submit():
        return sign_in_with_email_and_password(form.email.data, form.password.data)
    return render_template('validation-form.html', form=form)

@app.route('/api/new_artist', methods=['GET', 'POST'])
@requires_auth
def artistput():
    form = ArtistPut()
    if form.validate_on_submit():
        uuidtoken = uuid.uuid4()
        putData = { 'photo' : form.photo.data, 'name' : form.name.data,
                    'city' : form.city.data, 'bio' : form.bio.data,
                    'uuid' : str(uuidtoken)}
        artists = firebase.get('/', 'artists')
        firebase.put('/artists', uuidtoken, putData)
        return redirect(url_for('fireput'), code=302)
    return render_template('artist-form.html', form=form)

@app.route('/', methods = ['GET', 'POST'])
@app.route('/api/get', methods = ['GET', 'POST'])
@requires_auth
def fireget():
	murals = firebase.get('/','murals')
	return render_template('disp-all.html', murals=murals)

@app.route('/api/delete_mural', methods = ['GET', 'POST'])
def delete_mural():
	firebase.delete('/murals', str(request.form["muralid"]))
	return redirect(url_for('fireget'), code=302)


@app.route('/test')
def hello_world():
    return firebase.get('/', 'test')

@app.route('/api/logout', methods = ['GET'])
def logout():
    session.clear()
    return redirect('/api/login')


if __name__ == "__main__":
    app.run()