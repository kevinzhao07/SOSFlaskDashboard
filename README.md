# SOS Opioid Web Dashboard

[Link to this repository](https://github.com/choisteph/SOSFlaskDashboard)

---
## How the information is structured
### HTML pages use bootstrap
### Scripts draw information from files in data and geojson folders
### Flask app (application.py) relies on opioid_dict.py to get information


## In this repository:
- **application.py** : flask app that runs templates for opioid dashboard
- opioid_dict.py : definitions, dictionaries, etc. that format the information necessary for flask to process data into the HTML templates
- create_D3_files.py : creates the files necessary for D3. **not used in this project.**
- requirements.txt : things you need to have installed to run this program
- /templates
    - dashboard.html
        - bootstrap layout template for dashboard with map positioned on top, then time series under the map, then a series of 3 infographics arranged in a row. under this is a table. the side navigation occupies 2 columns.
    - dashboard2.html
        - bootstrap layout template for dashboard with map positioned next to time series, a series of 3 infographics arranged in a row below this, and then a table. the side navigation occupies 1 column.
    - dashboard3.html
        - bootstrap layout template for dashboard with map positioned next to a moving image (currently png placeholder) of map trends. Time series is positioned under the map and moving images. a row of 3 infographics is placed under this, and a table is under the infographics. the side navigation occupies 1 column.
    - landing.html
        - very low-fidelity static HTML of a possible landing page. contains a modal login window.
    - search.html
        - low-fidelity static HTML of a possible search interface. does not contain search functions and is not currently connected to the Flask app.
- /static
    - /css
        - map.css
        - map2.css
        - map3.css
        - michigan.css
        - nondatastyle.css
        - style.css
        - style2.css
        - style3.css
        - tablecharts.css
        - tablecharts2.css
        - timetable.css
        - timetable2.css
    - /data
        - cities.csv
        - map_fake.csv
    - /geojson
        - /cities
        - /counties
        - gz_2010_iz_050_00_5m_MI_counties.topojson
    - /images
        - age.png
        - hidta.png
        - icon.png
        - icon_t.png
        - ipc.png
        - race.png
        - screenshot (1).png
        - screenshot (3).png
        - SOS.png
        - SOS_icon_logo_white.png
        - washtenawcounty.png
        - wayne_table.png
        - waynecounty.png
    - /markers
        - ambulance_icon_blues.svg
        - hospital_icon_blues.svg
        - morguetable_5.svg
