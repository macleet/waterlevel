// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();

// Import node implementation of fetch API -- we do this so our server has the power to fetch!
// const fetch = require("node-fetch");
const fetch = require("cross-fetch");

const bodyParser = require('body-parser');

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

app.use(bodyParser.json());

app.post('/query/getWaterData', async function(req, res) {
  // console.log("BODY: ", req.body);
  let month = req.body.month;
  let year = req.body.year;

  let currStorage = await getWaterData(month, year);
  console.log("currStorage: ", currStorage);
  res.send(currStorage);
});

// No static server or /public because this server
// is only for AJAX requests

// respond to all AJAX querires with this message
// app.use(function(req, res, next) {
//   req.json({msg: "No such AJAX request"})
// });

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

async function getWaterData(month, year) {

  let currStorage = [];
  
  const api_url = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,BER,DNP&SensorNums=15&dur_code=M&Start=${year}-${month}-01&End=${year}-${month}-01`;
  let fetch_response = await fetch(api_url);
  let waterData = await fetch_response.json();
  for(let i = 0; i < 7; ++i) {
    currStorage[i] = waterData[i].value;
  }

  return currStorage;
}
