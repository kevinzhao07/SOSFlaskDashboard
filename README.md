# SOS Opioid Web Dashboard

[Link to this repository](https://github.com/choisteph/SOSFlaskDashboard)

---

## In this repository:
- application.py : flask app that runs templates for opioid dashboard
- opioid_dict.py : definitions, dictionaries, etc. that format the information necessary for flask to process data into the HTML templates
- create_D3_files.py : creates the files necessary for D3. **not used in this project.**
- requirements.txt : things you need to have installed to run this program
- /templates
    - dashboard.html
    - dashboard2.html
    - dashboard3.html
    - landing.html
    - search.html
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
