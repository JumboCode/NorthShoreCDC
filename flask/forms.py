from flask_wtf import FlaskForm as Form
from wtforms.fields import *
from wtforms.validators import *
from wtforms.validators import ValidationError
import urllib


FIELD_REQUIRED_MESSAGE = "This field is required."
INVALID_URL_MESSAGE = "This is not a valid URL."
INVALID_RANGE_MESSAGE = "Value is outside of reasonable range."
INVALID_YEAR_MESSAGE = "This is not a reasonable year value."
INVALID_MONTH_MESSAGE = "This is not a month."

MAX_IMAGE_SIZE_KB = 175


# Check field for a url which links to an image of small size
# The built-in URL Validator should have already run but is not sufficient
def image_validator(form, field):
    try:
        info = urllib.urlopen(field.data).info()

        response_type = info['Content-Type']
        if 'image' not in response_type:
            raise ValidationError("URL must link directly to an image.")

        size_kb = float(info['Content-Length']) / 1000.00
        if size_kb > MAX_IMAGE_SIZE_KB:
            raise ValidationError("Image file at specified URL must be less than " +
                                  str(MAX_IMAGE_SIZE_KB - 25) + " KB.")

    except IOError:  # URL that passes the URL validator but is not valid. e.g. helloworldhttps://google.com
        raise ValidationError("This URL is not accessible.")

    except KeyError:  # Something with weird headers probably
        raise ValidationError("Unknown URL Error: ensure the URL links to an image.")


class NewMural(Form):
    photo = StringField('Photo', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                             URL(require_tld=True, message=INVALID_URL_MESSAGE),
                                             image_validator])
    lat = DecimalField('Lat', places=7, validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                                    NumberRange(min=42.51,
                                                                max=42.52,
                                                                message=INVALID_RANGE_MESSAGE)])
    longitude = DecimalField('Long', places=7, validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                                           NumberRange(min=-70.9,
                                                                       max=-70.88,
                                                                       message=INVALID_RANGE_MESSAGE)])
    artist = SelectField('Artist', coerce=unicode, validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    title = StringField('Title', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    month = StringField('Month', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                             AnyOf(["January", "February", "March", "April", "May", "June", "July",
                                                    "August", "September", "October", "November", "December"],
                                                   message=INVALID_MONTH_MESSAGE)])
    year = IntegerField('Year', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                            NumberRange(min=1980, max=3000, message=INVALID_YEAR_MESSAGE)])
    description = TextAreaField('Description', validators=[])
    medium = StringField('Medium', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])


class EditMural(Form):
    photo = StringField('Photo', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                             URL(require_tld=True, message=INVALID_URL_MESSAGE),
                                             image_validator])
    lat = DecimalField('Lat', places=7, validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                                    NumberRange(min=42.51,
                                                                max=42.52,
                                                                message=INVALID_RANGE_MESSAGE)])
    longitude = DecimalField('Long', places=7, validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                                           NumberRange(min=-70.9,
                                                                       max=-70.88,
                                                                       message=INVALID_RANGE_MESSAGE)])
    artist = SelectField('Artist', coerce=unicode, validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    title = StringField('Title', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    month = StringField('Month', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                             AnyOf(["January", "February", "March", "April", "May", "June",
                                                    "July", "August", "September", "October", "November", "December"],
                                                   message=INVALID_MONTH_MESSAGE)])
    year = IntegerField('Year', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE),
                                            NumberRange(min=1980, max=3000, message=INVALID_YEAR_MESSAGE)])
    description = TextAreaField('Description', validators=[])
    medium = StringField('Medium', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])


class ValidateUser(Form):
    email = StringField('Email', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    password = PasswordField('Password', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])


class NewArtist(Form):
    name = StringField('Name', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    city = StringField('City', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    bio = TextAreaField('Bio', validators=[])
    link = StringField('Link', validators=[Optional(), URL(require_tld=True, message=INVALID_URL_MESSAGE)])


class EditArtist(Form):
    name = StringField('Name', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    city = StringField('City', validators=[DataRequired(message=FIELD_REQUIRED_MESSAGE)])
    bio = TextAreaField('Bio', validators=[])
    link = StringField('Link', validators=[Optional(), URL(require_tld=True, message=INVALID_URL_MESSAGE)])
