var fs = require('fs')
, util = require('util')
, stream = require('stream')
, es = require("event-stream")
, turf = require("turf")
, async = require("async")
, exec = require('child_process');

var cities = require('./cities.json');
var csvSeparator = '|',
lon_position=10,
lat_position=9,
output_separator=',';
var lineNr = {},
decimateOutput= 10000;
var output_folder = process.argv[3]+'/';
var files = [process.argv[2]];

var timezoneOffsetUTC = {
  cebu : '+08:00',
  manila :'+08:00',
  jakarta :'+08:00',
  iloilo :'+08:00',
  davao : '+08:00',
  hochiminh : '+08:00',
  butterworth :'+08:00',
  kualalumpur :'+08:00',
  bangkok :'+08:00',
  singapore :'+08:00',
  hanoi :'+08:00',
  other : '+08:00'
};
var countries = {
  cebu : 'Philippines',
  manila :'Philippines',
  jakarta :'Indonesia',
  iloilo :'Philippines',
  davao : 'Philippine',
  hochiminh : 'Vietnam',
  butterworth :'Malaysia',
  kualalumpur :'Malaysia',
  bangkok :'Thailand',
  singapore :'Singapore',
  hanoi :'Vietnam',
  other : 'other'
};


function getCity(point,cities){
  var city='other';
  for(var i = 0; i < cities.features.length; i++) {
    if (turf.inside(point, cities.features[i])){
      return cities.features[i].properties.name;
      break;
    }
  }
  return city;
}
function outputLine(line_arr,city){
  var id = line_arr[1],
  lat = line_arr[lat_position],
  lon = line_arr[lon_position],
  timestamp = formatTimestamp(line_arr[0],city);
  return  [timestamp,id,lat,lon].join(output_separator);
}

function formatTimestamp(time_input,city){
  time_output = new Date(
    time_input.replace(' ','T')+'+08:00');
    if (time_output == "Invalid Date") console.log("->TIME error: ",time_input,city,time_output)

    return time_output.toISOString();
}

function append2File(outLine,city){
    fs.appendFile(output_folder+city+'.csv', outLine+'\n','utf8', function (err) {
      if (err != null) console.log("Error appending "+city+" data: ",err,"<- ",outLine);
    });
}

  console.log(process.pid)
  console.time('all');
  async.map(files, readFile, function(err, results) {
    console.log(results);
  });
  console.timeEnd('all');

  function readFile(file){
    console.time(file);
    s = fs.createReadStream(file)
    .pipe(es.split())
    .pipe(es.mapSync(function(line){
      // pause the readstream
      s.pause();
      (function(){
        // get point with city.
        var line_arr= line.split(csvSeparator);
        if (line_arr.length > 10) { //poor man's check line is valid
          var lon = line_arr[lon_position];
          var lat = line_arr[lat_position];
          var point = turf.point([lon,lat]);
          var city = getCity(point,cities);
          var outLine=outputLine(line_arr,city);
          append2File(outLine,city);
          lineNr[city] = (lineNr[city] || 1) + 1;
          if ( lineNr[city] && (lineNr[city] % decimateOutput === 0)) console.log(lineNr[city],city,outputLine(line_arr,city));
        }else{
          console.log("Skipping line: ",line_arr.length);
        }
        // resume the readstream
        s.resume();

      })();
    })
    .on('error', function(){
      console.log('Error while reading file.');
    })
    .on('end', function(){
      var total=0;
      for (var key in lineNr) {
        total += lineNr[key];
      };
      console.timeEnd(file);
      console.log('total '+total+'.')
      //Save metadafile
    })
  );
}
