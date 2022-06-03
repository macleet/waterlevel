# Water Level 

## Description
Webpage made using **React.js** and **Express.js/Node.js** that uses a public data API. An API call grabs data pertaining to water levels in California's reservoirs from the California Data Exchange Center (CDEC); a chart (made using [Chart.js](https://chartjs.org/)) with this data is displayed as a bar graph on webpage. This webpage was tested and run on [Replit](https://replit.com), a collaborative in-browser IDE that has hosting features.

## Front-End
The front end uses a [month/year picker](https://www.npmjs.com/package/react-month-year-picker) that allows the user to display reservoir data from a particular month and year. After a user seletcs a month/year, the browser then sends an AJAX request to the back-end server with this information. Then, the browser displays a stacked bar chart with the water level data from this date.

## Back-End
The server receives a POST request with a particular date as the body. The server performs an API call and receives the relevant data and places it into an array. This array is sent to the front-end.
