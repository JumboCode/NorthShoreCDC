from flask import Flask, render_template, redirect, session, url_for, request, flash

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
from flask import make_response
from functools import update_wrapper
import operator
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
            
            return redirect("/api/get")
        except KeyError:
            print "Invalid login attempt 47"
            return redirect("/api/login", code=302)

 

class FirePut(Form):
    photo = StringField('Photo', validators=[DataRequired(), URL(require_tld=True, message=None)])
    lat = DecimalField('Lat', places = 7, validators=[DataRequired(), NumberRange(min=42.51, max = 42.52)])
    longitude = DecimalField('Long', places = 7, validators=[DataRequired(), NumberRange(min=-70.9, max = -70.88)])
    artist = SelectField('Artist', coerce = unicode, validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    month = StringField('Month', validators=[DataRequired(), AnyOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])])
    year = IntegerField('Year', validators=[DataRequired(), NumberRange(min=1980, max = 3000)])
    description = TextAreaField('Description', validators=[])
    medium = StringField('Medium', validators=[DataRequired()])

class FireEdit(Form):
    photo = StringField('Photo', validators=[DataRequired(), URL(require_tld=True, message=None)])
    lat = DecimalField('Lat', places = 7, validators=[DataRequired(), NumberRange(min=42.51, max = 42.52)])
    longitude = DecimalField('Long', places = 7, validators=[DataRequired(), NumberRange(min=-70.9, max = -70.88)])
    artist = SelectField('Artist', coerce = unicode, validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    month = StringField('Month', validators=[DataRequired(), AnyOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])])
    year = IntegerField('Year', validators=[DataRequired(), NumberRange(min=1980, max = 3000)])
    description = TextAreaField('Description', validators=[])
    medium = StringField('Medium', validators=[DataRequired()])

class Validate(Form):
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class ArtistPut(Form):
    name = StringField('Name', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    bio = TextAreaField('Bio', validators=[])
    link = StringField('Link', validators=[ Optional(), URL(require_tld=True, message=None)])

class ArtistEdit(Form):
    name = StringField('Name', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    bio = TextAreaField('Bio', validators=[])
    link = StringField('Link', validators=[ Optional(), URL(require_tld=True, message=None)])

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

def nocache(f):
    def new_func(*args, **kwargs):
        resp = make_response(f(*args, **kwargs))
        resp.cache_control.no_cache = True
        return resp
    return update_wrapper(new_func, f)


count = 0

@app.route('/api/put', methods=['GET', 'POST'])
@requires_auth
def fireput():
    form = FirePut()
    artists = firebase.get('/', 'artists')
    c = []
    for a in artists:
    	c.append((artists[a]["uuid"], artists[a]["name"]))
 	c = sorted(c, key = lambda x: x[1])
 	form.artist.choices = c
    if form.validate_on_submit():
        global count
        count += 1
        uuidtoken = uuid.uuid4()
        
        # the new mural's index = 1 + the number of existing murals
        murals = firebase.get('/', 'murals')
        index = 1 + len(murals)
        
        putData = { 'Photo' : form.photo.data, 'Lat' : form.lat.data,
                    'Long' : form.longitude.data, 'Artist' : form.artist.data,
                    'Title' : form.title.data, 'Month' : form.month.data,
                    'Year' : form.year.data, 'Description' : form.description.data,
                    'Medium' : form.medium.data, 'uuid' : str(uuidtoken),
                    'Index': index }
        firebase.put('/murals', uuidtoken, putData)
        return render_template('form-result.html', putData=putData)
    return render_template('My-Form.html', form=form)

@app.route('/api/edit', methods=['GET', 'POST'])
@requires_auth
def fireedit():
    form = FireEdit()
    muralid = str(request.args["muralid"])
    print muralid
    murals = firebase.get('/', 'murals')
    mural = murals[muralid]
    artists = firebase.get('/', 'artists')
    c = []
    for a in artists:
        c.append((artists[a]["uuid"], artists[a]["name"]))
    c = sorted(c, key = lambda x: x[1])
    form.artist.choices = c
    if form.validate_on_submit():
        putData = { 'Photo' : form.photo.data, 'Lat' : form.lat.data,
                    'Long' : form.longitude.data, 'Artist' : form.artist.data,
                    'Title' : form.title.data, 'Month' : form.month.data,
                    'Year' : form.year.data, 'Description' : form.description.data,
                    'Medium' : form.medium.data, 'uuid' : str(muralid),
                    'Index': mural["Index"] }
        print putData
        firebase.delete('/murals', str(muralid))
        print "deleted"
        firebase.put('/murals', muralid, putData)
        print "added"
        return redirect(url_for('fireget'), code=302)
    return render_template('edit.html', form=form, mural = mural, murals = murals, muralid=muralid)

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
        putData = { 'name' : form.name.data,
                    'city' : form.city.data, 
                    'bio' : form.bio.data,
                    'link' : form.link.data,
                    'uuid' : str(uuidtoken)}
        artists = firebase.get('/', 'artists')
        firebase.put('/artists', uuidtoken, putData)
        return redirect(url_for('fireput'), code=302)
    return render_template('artist-form.html', form=form)

@app.route('/', methods = ['GET', 'POST'])

@app.route('/api/get', methods = ['GET', 'POST'])
@requires_auth
@nocache
def fireget():
    artists = firebase.get('/','artists')
    murals = firebase.get('/','murals')
    
    sorted_keys = sorted(murals, key = lambda mural: murals[mural]["Index"])
    sorted_murals = []
    for m in sorted_keys:
        sorted_murals.append(murals[m])
    
    return render_template('disp-all.html', artists = artists, murals=sorted_murals)

@app.route('/api/delete_mural', methods = ['GET', 'POST'])
@requires_auth
def delete_mural():
    
    # reindex all the murals
    murals = firebase.get('/', 'murals')
    key = str(request.form["muralid"])
    removed_index = murals[key]["Index"]
    
    # if a mural's index is > removed_index, decrement the index
    for m in murals:
        if murals[m]["Index"] > removed_index:
            murals[m]["Index"] = murals[m]["Index"] - 1
    
    # remove the mural
    if key in murals: del murals[key]
    
    # update firebase
    firebase.delete('/murals', key)
    for uuid in murals:
        firebase.put('/murals', uuid, murals[uuid])
    
    
    return redirect(url_for('fireget'), code=302)

@app.route('/api/change_mural_index', methods = ['POST'])
@requires_auth
def change_mural_index():
	# firebase.delete('/murals', str(request.form["muralid"]))
    
    muralID = str(request.form["muralid"])
    up_or_down = str(request.form["upOrDown"])
    murals = firebase.get('/','murals')
    
    print "All the murals:", murals
    
    # fromMural is the mural corresponding to the muralid
    # toMural is the mural with the Index that fromMural's Index should be changed to
    fromMural = None
    toMural = None
    
    for m in murals:
        if m == muralID:
            fromMural = murals[m]
    
    # If the muralID turns out to not be valid
    if fromMural == None:
        return redirect(url_for('fireget'), code=302)
    
    fromMuralIndex = fromMural["Index"]
    
    toMuralIndex = 0
    if up_or_down == "UP":
        toMuralIndex = fromMuralIndex - 1
    elif up_or_down == "DOWN":
        toMuralIndex = fromMuralIndex + 1
    
    for m in murals:
        if murals[m]["Index"] == toMuralIndex:
            toMural = murals[m]
    
    # Handles when you want to move to an invalid index
    if toMural == None:
        return redirect(url_for('fireget'), code=302)
    
    fromMural["Index"] = toMuralIndex
    toMural["Index"] = fromMuralIndex
    
    # update firebase
    firebase.put('/murals', fromMural["uuid"], fromMural)
    firebase.put('/murals', toMural["uuid"], toMural)
    
    print "fromMural", fromMural
    print "toMural", toMural
    
    return redirect(url_for('fireget'), code=302)

@app.route('/api/artistget', methods = ['GET', 'POST'])
@requires_auth
@nocache
def artistget():
    artists = firebase.get('/','artists')
    return render_template('disp-all-artists.html', artists = artists)

@app.route('/api/edit_artist', methods=['GET', 'POST'])
@requires_auth
def edit_artist():
    form = ArtistEdit()
    artistid = str(request.args["artists"])
    artists = firebase.get('/', 'artists')
    artist = artists[artistid]
    if form.validate_on_submit():
        putData = { 'name' : form.name.data,
                    'city' : form.city.data, 
                    'bio' : form.bio.data,
                    'link' : form.link.data,
                    'uuid' : str(artistid) }
        firebase.delete('/artists', str(artistid))
        firebase.put('/artists', artistid, putData)
        return redirect(url_for('artistget'), code=302)
    return render_template('edit-artist.html', form=form, artist = artist)

@app.route('/api/delete_artist', methods = ['GET', 'POST'])
@requires_auth
def delete_artist():
    artist = str(request.form["artistid"])
    
    # Don't delete an artist if they have any murals
    murals = firebase.get('/','murals')
    for key in murals:
        if murals[key]["Artist"] == artist:
            flash("Cannot delete an artist with existing murals!")
            return redirect(url_for('artistget'), code=302)
        
    
    firebase.delete('/artists', artist)
    return redirect(url_for('artistget'), code=302)


@app.route('/test')
def hello_world():
    return firebase.get('/', 'test')

@app.route('/api/logout', methods = ['GET'])
def logout():
    session.clear()
    return redirect('/api/login')


if __name__ == "__main__":
    app.run()