from flask import Flask, render_template, request
from opioid_dict import src_dict, center_dict, cities, counties, names

application = Flask(__name__)
application.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@application.route('/')
def homepage():
    return "hello"


@application.route('/dashboard', methods=['GET'])
def navtocorrect():
    arguments=['city', 'county', 'src']
    source = request.args.get('src')
    city = request.args.get('city')
    county = request.args.get('county')

    if city in cities:
        folder = 'cities'
        county_flag = ''
        data = {
            'placename': city,
            'src': source,
            'county_flag': county_flag,
            'titlename': src_dict[source],
            'f_geojson': f'geojson/{folder}/{city}.geojson',
            'center': center_dict[city]['center'],
            'zoom' : center_dict[city].get('zoom', 10)}

    if county in counties:
        folder = 'counties'
        county_flag = 'County'
        data = {
            'placename': county,
            'src': source,
            'county_flag': county_flag,
            'titlename': src_dict[source],
            'f_geojson': f'geojson/{folder}/{county}.geojson',
            'center': center_dict[county]['center'],
            'zoom' : center_dict[county].get('zoom', 10)}

    return render_template("dashboard3.html", data=data, names=names, cities=cities)



# @application.route('/<string:placename>/<string:datasource>/', methods=['GET'])
# def dashboard(placename, datasource):
#     placename = placename.title()
#     datasource = datasource.upper()
#
#     if placename in cities:
#         folder = 'cities'
#         county_flag = ''
#     else:
#         folder = 'counties'
#         county_flag = 'County'
#
#     data = {
#         'placename': placename,
#         'datasource': datasource,
#         'county_flag': county_flag,
#         'titlename': src_dict[datasource],
#         'f_geojson': f'geojson/{folder}/{placename}.geojson',
#         'center': center_dict[placename]['center'],
#         'zoom' : center_dict[placename].get('zoom', 10)
#     }
#
#     return render_template("dashboard2.html", data=data, names=names, cities=cities)

#%% Run Flask app
# python application.py
if __name__ == '__main__':
    application.run(debug=True)
