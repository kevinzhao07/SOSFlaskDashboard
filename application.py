from flask import Flask, render_template
from opioid_dict import src_dict, center_dict, cities, counties, names

application = Flask(__name__)
application.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@application.route('/')
def homepage():
    return "hello"

@application.route('/<string:placename>/<string:datasource>/', methods=['GET'])
def dashboard(placename, datasource):
    placename = placename.title()
    datasource = datasource.upper()
    if placename in cities:
        folder = 'cities'
        county_flag = ''
    else:
        folder = 'counties'
        county_flag = 'County'
    data = {
        'placename': placename,
        'datasource': datasource,
        'county_flag': county_flag,
        'titlename': src_dict[datasource],
        'f_geojson': f'geojson/{folder}/{placename}.geojson',
        'center': center_dict[placename],
    }

    return render_template("dashboard3.html", data=data, names=names, cities=cities)

#%% Run Flask app
# python application.py
if __name__ == '__main__':
    application.run(debug=True)
