from flask import Flask, render_template, request, redirect, url_for
from opioid_dict import src_dict, center_dict, cities, counties, names, name_case_ls, name_cases
from flask_login import LoginManager, login_required, login_user, logout_user, UserMixin, current_user
from flask_bcrypt import Bcrypt
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
import os
# from create_D3_files import create_county_files

application = Flask(__name__)
application.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
application.secret_key = b'whatisacsrf#$^@&^@#!&^:{>}'
login_manager = LoginManager()
login_manager.init_app(application)
login_manager.login_view = '/login'
bcrypt = Bcrypt(application)

class User(UserMixin):

    def __init__(self, email, username, pw_raw, authenticated):
        self.email = email
        self.username = username
        self.password = bcrypt.generate_password_hash(pw_raw).decode('UTF-8')  # 'UTF-8' needed for Python 3.X
        self.authenticated = authenticated

    def get_id(self):
        return self.email

    def is_authenticated(self):
        return self.authenticated

    @staticmethod
    def authenticate(username, pw_raw):
        fetched_user = user1 #hardcoded user1
        if fetched_user:
            authenticated_user = bcrypt.check_password_hash(fetched_user.password, pw_raw)
            fetched_user.authenticated = True
        else:
            authenticated_user = False
        return fetched_user, authenticated_user

class LoginForm(FlaskForm):
    username = StringField('Username')
    password = PasswordField('Password')
    submit = SubmitField('Submit')

user1 = User('flask@login', os.getenv('User'), os.getenv('Pwd'), False)

@login_manager.user_loader
def load_user(user_id):
    user1.email = user_id
    return user1
    
# Route for handling the login page logic
@application.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    form = LoginForm()
    if form.validate_on_submit():
        fetched_user, authenticated_user = User.authenticate(form.username.data, form.password.data)
        if fetched_user and authenticated_user:
            login_user(fetched_user, remember=True)
            return fetched_user and redirect(url_for('searchpage'))
        else:
            error = 'Invalid Credentials.'
    return render_template('login.html', form=form, error=error)

@application.route("/logout")
@login_required
def logout():
    user = current_user
    user.authenticated = False
    logout_user()
    return redirect(url_for('login'))

@login_manager.unauthorized_handler
def unauthorized():
    form = LoginForm()
    redirerror = 'You must login first.'
    return render_template('login.html', form=form, redirerror=redirerror)


@application.route('/')
def landing():
    return render_template('landing.html')

@application.route('/search', methods=['GET'])
@login_required
def searchpage():
    data = {
      'counties': counties,
    }
    placenames=[]
    for each in cities:
        placenames.append(each)
    for each in counties:
        placenames.append(each)

    return render_template("search.html", data=data, placenames=placenames, cities=cities, counties=counties)


@application.route('/dashboard', methods=['GET'])
@login_required
def navtocorrect():
    arguments=['city', 'county', 'src', 'T0' , 'T1' ]
    source = request.args.get('src', default = "EMS", type = str)
    city = request.args.get('city')
    county = request.args.get('county')
    T0 = request.args.get('T0', default = 14, type = int)
    T1 = request.args.get('T1', default = None, type = int)

    if county:
        cityorcounty = "County"
        name = county
    if city:
        cityorcounty = "City"
        name = city


    # create_county_files(name, source, T0, T1, cityorcounty)


    source = source.upper()


    if city:
        city = city.title()
        for each in name_cases:
            if city in each.keys():
                city = each[city]
    if county:
        county = county.title()

    if city in cities:
        if '(City)' in city:
            propername = city[:-7]
        else:
            propername = city
        folder = 'cities'
        county_flag = ''
        data = {
            'placename': city,
            'src': source,
            'county_flag': county_flag,
            'titlename': src_dict[source],
            'f_geojson': f'geojson/{folder}/{propername}.geojson',
            'center': center_dict["City"][propername]['center'],
            'zoom' : center_dict["City"][propername].get('zoom', 10)}

    if county in counties:
        folder = 'counties'
        county_flag = 'County'
        data = {
            'placename': county,
            'src': source,
            'county_flag': county_flag,
            'titlename': src_dict[source],
            'f_geojson': f'geojson/{folder}/{county}.geojson',
            'center': center_dict["County"][county]['center'],
            'zoom' : center_dict["County"][county].get('zoom', 10)}



    return render_template("dashboard.html", data=data, names=names, cities=cities, counties=counties)

#%% Run Flask app
# python application.py
# if __name__ == '__main__':
#     application.run(debug=True)
