// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let unixDate;
  let dateOdj;
  let utcDate;

  // Test if input is a number
  let isUnix = /^\d+$/.test(date);

  // date not specified, use current date
  if(!date) {
    dateOdj = new Date();
  }
  // input is a date in unix format
  else if(date && isUnix) {
    unixDate = parseInt(date);
    dateOdj = new Date(unixDate);
  }
  // input is a date but not in unix format
  else if(date && !isUnix) {
    dateOdj = new Date(date);    
  }

  // invalid input
  if(dateOdj.toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
    return;
  }

  unixDate = dateOdj.getTime();
  utcDate = dateOdj.toUTCString();

  res.json({unix: unixDate, utc: utcDate});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
