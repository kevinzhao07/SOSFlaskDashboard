## Dashboard Tests
### NOTE: NEEDS TO BE UPDATED!!
##### Updated 8/16/2019

### Data and data updates properly update map, charts/time series, and table. Upper Right always shows updated information
- Navigate to **Lenawee** County EMS and make sure that there is **1 marker** on the map.

    - Upper right stats should show 1 total, up 1 incident, and N/A percent.
    - The date range should be Aug 03 2019 to Aug 09, 2019.
    - Clicking on the marker shows a popup with Aug 03, 2019 // Lenawee 25-34 American Indian or Alaska Native Male
    - The **time series** shows 1 incident on Sat 03
        - The average line exists
        - The bar height should be 1
        - The brushed area/ macro view should show shorter bars with an average line that stays close to the x-axis
    - The **demographic charts** show data for 1 incident
        - There is 1 bar in the 25-34 age range
        - The gender donut shows data for 1 Male
        - There is 1 bar in the American Indian or Alaska Native race category
    - The **HTML table** shows 1 data point
        - Aug 03, 2019 // Lenawee // 25-34 // Male // American Indian or Alaska Native

- Expand the time frame to 3 Months using the time series period buttons

    - Upper right stats should be 8 total, up 1 incidents, and +14%
    - Map loads 8 markers inside Lenawee County. **No markers load outside of the county boundaries**
        - Move the map so the entire county is outside of the map window. i.e. find Detroit
            - Data in upper right shows 0 incidents, 0 increase/decrease, N/A percent, and time series, charts, and table are empty
        - Zoom into the map so only a portion of the markers in Lenawee are on the map window
            - Data in upper right, time series, charts, and table reflect number of markers in map window
    - The time series has updated to show 8 total incidents
        - The brushed area expands to show data from May to August
        - The average line exists
        - Bars have a height of 1
    - The demographics show data for 8 incidents
        - 0 data 0-25 range, 3 in the 25-34 range, 3 in the 35-44 range, 2 in the 45-54 range, and 0 in the 55+ range
        - 4 male incidents and 4 female incidents
        - 2 White, 5 Black, 1 American Indian or Alaska Native
    - The html table shows 8 incidents
        - Table is not sorted in any particular order

### Time series toggles work -- charts, table, map update. Upper right updates. Date range in top bar updates.
- Toggle the time series in Lenawee County

    - 1 week 1 point - marker, table, demographics show data for 1 incident
    - 2 weeks 1 point - marker, table, demographics show data for 1 incident
    - 1 month 3 points - markers, table, demographics show data for 3 incidents
    - 3 months 8 points - markers, table, demographics show data for 8 incidents
    - YTD 16 points - markers, table, demographics show data for 16 incidents
        - HTML table shows reduced data to 10 points
            - Clicking 20 rows shows all 16 data points

### HTML table reduces data, toggles rows, and filters based on chart selections
- Navigate to Bay County and brush entire time series (approx. Aug 11, 2018 to Aug 09, 2019)
    - check for 22 data points

- Sort HTML table by **age ascending** and click **25-34, 35-44, 45-54, Male, Female, White, and Black**
    - Upper right shows 9 total, 9 increase, N/A percent
    - 9 Markers on map, 9 points on time series
    - Table remains sorted by Age and has 25-34 at the top
- Sort by Race, Gender, and Date to check ascending and descending sorts
- Reset gender and race using reset button on gender chart and race chart
    - Upper right shows 27 total, 17 increase, N/A percent
    - 17 markers on map, 17 incidents in time series
    - Table remains sorted by last selected parameter (date, age, gender, race)
- Reset demographics using the button under demographic charts
    - Upper right shows 22 total, 22 increase, N/A percent
    - HTML table should remain sorted by last selected filter

- Toggle 10, 20, and 50 rows
    - 10 and 20 rows reduce data to 10 and 20 rows respectively
    - 50 rows shows all 22 data points


## Unknowns work properly and can be selected/sorted
- Navigate to Charlevoix County and brush the entire time series
    - 8 total, up 8 incidents, N/A percent --> reflected in charts, markers, table
    - Check that Gender chart shows 1 Unknown and Race chart shows 1 Unknown
    - Find point in the HTML table by sorting Gender descending
        - Jan 19, 2019 // Charlevoix // 0-25 // Unknown // Unknown

## General Checks
- check for transitions
- check for marker loads
- check for time series data
- In YTD
    - brush a small box and move it around to check that incident decreases show a down arrow and green and negative percent
    - check for 0 incidents showing black 0. 0 increases or decreases should show +/ 0% in red/green
    - check that N/A percents exist and are in black
- For demographic charts
    - check that demographics are selected and the charts are highlighted. other demographic charts should transition to updated values
