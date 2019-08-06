// creates the HTML table
function makeHtmlTable() {
    // selects table to add
    table = d3.select("#sosTable")
    thead = table.append('thead').append('tr')
      .selectAll('th')
      .data(d => DATA.columns.slice(0, -2))
      .join('th')
        .text((d,i) => i = 1 ? formatHTMLthings(d): d);
    tbody = table.append('tbody');

    updateAll(date.top(10));
  }

// updates HTML table
function updateHtmlTable(data = date.top(Infinity)) {
    row = tbody.selectAll('tr')
        .data(data)
        .join('tr')
    row.selectAll('td')
        .data((d) => d3.values(d).slice(0,-2))
        .join('td')
        .text((d,i) => i = 1 ? formatHTMLthings(d) : d)
}

function formatHTMLthings(d){
  if (d instanceof Date){
    var formatted = d3.timeFormat("%b %d, %Y")(d)
    return formatted;
  }
  else{
    return d;
  }
}
//
// /**  sort functionality **/
// headers
//   .on("click", function(d) {
//     if (d == "Date") {
//       clicks.title++;
//       // even number of clicks
//       if (clicks.title % 2 == 0) {
//         // sort ascending: alphabetically
//         rows.sort(function(a,b) {
//           if (a.title.toUpperCase() < b.title.toUpperCase()) {
//             return -1;
//           } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
//             return 1;
//           } else {
//             return 0;
//           }
//         });
//       // odd number of clicks
//       } else if (clicks.title % 2 != 0) {
//         // sort descending: alphabetically
//         rows.sort(function(a,b) {
//           if (a.title.toUpperCase() < b.title.toUpperCase()) {
//             return 1;
//           } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
//             return -1;
//           } else {
//             return 0;
//           }
//         });
//       }
//     }
//     if (d == "Views") {
//     clicks.views++;
//       // even number of clicks
//       if (clicks.views % 2 == 0) {
//         // sort ascending: numerically
//         rows.sort(function(a,b) {
//           if (+a.views < +b.views) {
//             return -1;
//           } else if (+a.views > +b.views) {
//             return 1;
//           } else {
//             return 0;
//           }
//         });
//       // odd number of clicks
//       } else if (clicks.views % 2 != 0) {
//         // sort descending: numerically
//         rows.sort(function(a,b) {
//           if (+a.views < +b.views) {
//             return 1;
//           } else if (+a.views > +b.views) {
//             return -1;
//           } else {
//             return 0;
//           }
//         });
//       }
//     }
//     if (d == "Created On") {
//       clicks.created_on++;
//       if (clicks.created_on % 2 == 0) {
//         // sort ascending: by date
//         rows.sort(function(a,b) {
//           // grep date and time, split them apart, make Date objects for comparing
//         var date = /[\d]{4}-[\d]{2}-[\d]{2}/.exec(a.created_on);
//         date = date[0].split("-");
//         var time = /[\d]{2}:[\d]{2}:[\d]{2}/.exec(a.created_on);
//         time = time[0].split(":");
//         var a_date_obj = new Date(+date[0],(+date[1]-1),+date[2],+time[0],+time[1],+time[2]);
//
//           date = /[\d]{4}-[\d]{2}-[\d]{2}/.exec(b.created_on);
//         date = date[0].split("-");
//         time = /[\d]{2}:[\d]{2}:[\d]{2}/.exec(b.created_on);
//         time = time[0].split(":");
//         var b_date_obj = new Date(+date[0],(+date[1]-1),+date[2],+time[0],+time[1],+time[2]);
//
//           if (a_date_obj < b_date_obj) {
//             return -1;
//           } else if (a_date_obj > b_date_obj) {
//             return 1;
//           } else {
//             return 0;
//           }
//         });
//       // odd number of clicks
//       } else if (clicks.created_on % 2 != 0) {
//         // sort descending: by date
//         rows.sort(function(a,b) {
//           // grep date and time, split them apart, make Date objects for comparing
//         var date = /[\d]{4}-[\d]{2}-[\d]{2}/.exec(a.created_on);
//         date = date[0].split("-");
//         var time = /[\d]{2}:[\d]{2}:[\d]{2}/.exec(a.created_on);
//         time = time[0].split(":");
//         var a_date_obj = new Date(+date[0],(+date[1]-1),+date[2],+time[0],+time[1],+time[2]);
//
//           date = /[\d]{4}-[\d]{2}-[\d]{2}/.exec(b.created_on);
//         date = date[0].split("-");
//         time = /[\d]{2}:[\d]{2}:[\d]{2}/.exec(b.created_on);
//         time = time[0].split(":");
//         var b_date_obj = new Date(+date[0],(+date[1]-1),+date[2],+time[0],+time[1],+time[2]);
//
//           if (a_date_obj < b_date_obj) {
//             return 1;
//           } else if (a_date_obj > b_date_obj) {
//             return -1;
//           } else {
//             return 0;
//           }
//         });
//       }
//     }
//     if (d == "URL") {
//       clicks.url++;
//     // even number of clicks
//       if (clicks.url % 2 == 0) {
//         // sort ascending: alphabetically
//         rows.sort(function(a,b) {
//           if (a.thumb_url_default.toUpperCase() < b.thumb_url_default.toUpperCase()) {
//             return -1;
//           } else if (a.thumb_url_default.toUpperCase() > b.thumb_url_default.toUpperCase()) {
//             return 1;
//           } else {
//             return 0;
//           }
//         });
//       // odd number of clicks
//       } else if (clicks.url % 2 != 0) {
//         // sort descending: alphabetically
//         rows.sort(function(a,b) {
//           if (a.thumb_url_default.toUpperCase() < b.thumb_url_default.toUpperCase()) {
//             return 1;
//           } else if (a.thumb_url_default.toUpperCase() > b.thumb_url_default.toUpperCase()) {
//             return -1;
//           } else {
//             return 0;
//           }
//         });
//       }
//     }
//   }) // end of click listeners
// });
