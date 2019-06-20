# SOS Opioid Web Dashboard

[Link to this repository](https://github.com/choisteph/SOSFlaskDashboard)

---
## How the information is structured

### Content and base originate from Alex Cao's repository
  - [Original Repo](https://github.com/caocscar/opioid-web)

### HTML pages use bootstrap CDN
Referenced during creation of html page templates:
  - [Bootstrap Documentation](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
  - [W3 Schools Bootstrap 4 Tutorials](https://www.w3schools.com/bootstrap4/bootstrap_get_started.asp)
  - [Stack Overflow Threads such as this](https://stackoverflow.com/questions/29258382/bootstrap-align-divs-to-top-middle-and-bottom)

### Scripts draw information from files in data and geojson folders
  - Mapbox/Leaflet-Mapbox, items in data folder (geojson, csv, topojson), and time series created by and lifted from [Alex Cao](https://github.com/caocscar)
  - d3 coding for infographics and table created by [Kevin Zhao](https://github.com/kevinzhao07)


## In this repository:
- **application.py** : flask app that runs templates for opioid dashboard
- `opioid_dict.py` : definitions, dictionaries, etc. that format the information necessary for flask to process data into the HTML templates
- `requirements.txt` : things you need to have installed to run this program
- `/templates`
    - `dashboard.html`
        - bootstrap layout template for dashboard with map positioned next to a moving image (currently png placeholder) of map trends. Time series is positioned under the map and moving images. a row of 3 infographics is placed under this, and a table is under the infographics. the side navigation occupies 1 column.
    - `landing.html`
        - very low-fidelity static HTML of a possible landing page. contains a modal login window.
    - `search.html`
        - bootstrap layout template for search page. Contains 3 interactable county/city maps for each data source as well as a list of counties for each. An autocomplete search bar exists but is not currently functional.
- `/static`
    - `/css`
        - `map.css`
            - formats and styles the mapbox item for `dashboard.html`
        - `michigan.css`
            - styles the map and tooltips in `search.html`
        - `nondatastyle.css`
            - styles non-dashboard pages (`landing.html`, `search.html`)
        - `style.css`
            - styles `dashboard.html`
        - `tablecharts.css`
            - styles the d3 infographics (bar graphs and donut) for `dashboard.html`
        - `timetable.css`
            - styles the d3 time series (2 bar graphs with moving average) for `dashboard.html`
    - `/data`
        - `cities.csv`
            - names cities of interest and their latitude and longitudes
            - used in `search.html`
        - `map_fake.csv`
            - fake data of approximately 1000 coordinates, dates, demographics
            - used in `dashboard.html`
    - `/geojson`
        - `/cities`
            - geoJSON-format information about cities of interest
            - used by `dashboard.html`
        - `/counties`
            - geoJSON-format information about counties
            - used by `dashboard.html`
        - `gz_2010_iz_050_00_5m_MI_counties.topojson`
            - topojson-format information
            - used by `search.html`
    - `/images` - includes favicon (icon_t) and placeholders
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
    - `/js`
        - `ageChart.js`
            - creates and updates the bar graphs for age representation
            - function definitions are referenced in `multipleCharts.js`
        - `autocomplete.js`
            - codes the autocomplete search used in `search.html`
        - `genderChart.js`
            - creates and updates the gender donut
            - function definitions are referenced in `multipleCharts.js`
        - `htmlTable.js`
            - creates and updates the HTML table
            - function definitions are referenced in `multipleCharts.js`        
        - `makeMichigan.js`
            - creates the d3 svg maps of Michigan counties and cities
            - used in `search.html`
        - `map.js`
            - creates mapbox-leaflet map used in main view
            - function definitions are referenced in `multipleCharts.js`
            - Flask-created variables are present in-line in `dashboard.html`
        - `multipleCharts.js`
            - runs the function definitions defined in `ageChart.js`, `genderChart.js`, `htmlTable.js`, `raceChart.js`, and `timeSeries.js`
            - function definition for creating infographics from csv defined here
        - `raceChart.js`
            - creates and updates the bar graphs for race representation
            - function definitions are referenced in `multipleCharts.js`
        - `timeSeries.js`
            - creates and updates the time time series
            - function definitions are referenced in `multipleCharts.js`
    - `/markers` - svg map markers used by leaflet mapbox in `dashboard.html`
        - ambulance_icon_blues.svg
        - hospital_icon_blues.svg
        - morguetable_5.svg
