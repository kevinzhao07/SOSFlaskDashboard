//http://www.daterangepicker.com/
$(function() {
    var start = moment().subtract(13, 'days');
    var end = moment();

    $('.dateRangePick').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left'
    }, function(start, end){
        let startJs = start.toDate();
        let endJs = end.toDate();

        changeDate(startJs, endJs);

    });
});
