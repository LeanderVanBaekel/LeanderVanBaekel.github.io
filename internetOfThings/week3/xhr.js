
// var json = require('./test.json');

// console.log("test" + json);

var dataa=[];
var dates=[];
var values=[];

$.getJSON( "test.json", function(data) {
    dataa = data;

    for (var i = 0; i < dataa.length; i++) {
        dates.push(dataa[i].time);
        values.push(dataa[i].pir);
    }
    dates = dates.reverse();
    dates = dates.slice(0,499);
    dates.push("x");
    dates = dates.reverse();
    values = values.reverse();
    values = values.slice(0,499);
    values.push("pir");
    values = values.reverse();

    var chart = c3.generate({
        data: {
            x: 'x',
            xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                dates,
                values
            ]
        },
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    rotate: 75,
                    format: '%Y-%m-%d %H:%M:%S'
                  //format: '%Y' // format string is also available for timeseries data
                }
            }
        }
    });
});









