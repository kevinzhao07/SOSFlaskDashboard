from flask import Flask, render_template, request
from opioid_dict import src_dict, center_dict, cities, counties, names, name_case_ls, name_cases
# from create_D3_files import create_county_files

application = Flask(__name__)
application.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@application.route('/')
def homepage():
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
if __name__ == '__main__':
    application.run(debug=True)
