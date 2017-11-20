from flask import Flask, render_template, redirect, session

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


firebase_path = os.environ.get('FIREBASE_PATH')

# os.environ.get('APP_KEY')

firebase = firebase.FirebaseApplication(firebase_path, None)

access_token = None

def sign_in_with_email_and_password(email, password):
        global access_token
        request_ref = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key={0}".format(os.environ.get('APP_KEY'))
        headers = {"content-type": "application/json; charset=UTF-8"}
        data = json.dumps({"email": email, "password": password, "returnSecureToken": True})
        request_object = requests.post(request_ref, headers=headers, data=data)
        current_user = request_object.json()
        try: 
            reg = current_user["registered"]
            access_token = current_user["idToken"]
            print current_user
            
            
            print "Hello again"
        except KeyError:
            print "KeyError"


print "enter email"
email = raw_input().strip()
print "enter pass"
password = raw_input().strip()

sign_in_with_email_and_password(email, password)
print access_token

firebase.authentication = access_token

# With a janky auth token, this call will be a 401
# With a real auth token, this will actually return murals
print firebase.get('/','murals')


