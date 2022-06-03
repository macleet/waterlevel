import React, { useState , useEffect } from 'react';
import './App.css';
import MonthYearPicker from 'react-month-year-picker';
import useAsyncFetch from './useAsyncFetch.jsx';
import Chart from 'chart.js/auto';

function ExpandArea() {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2022);
  
  function ChartArea() {

    const [currStorage, setCurrStorage] = useState([]); 

    const date = {
      "month": month,
      "year": year
    };
  
    useAsyncFetch("query/getWaterData", date, thenFun, catchFun);
    // console.log(currStorage);
  
    function thenFun(result) {
      setCurrStorage(result);
    }
  
    function catchFun(error) {
      console.log("Error: ", error)
    }
  
    useEffect(() => {
      let expandButton = document.getElementById("expand-button");
      expandButton.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      
      const labels = [
        'Shasta',
        'Oroville',
        'Trinity Lake',
        'New Melones',
        'San Luis',
        'Berryessa',
        'Don Pedro'
      ];
      
      const capacity = [
        4552000,
        3537577,
        2447650,
        2400000,
        2041000,
        1602000,
        2030000
      ];
      
      let data = {
        labels: labels,
        datasets: [
          {
            label: 'Total Capacity',
            data: capacity,
            backgroundColor: 'rgb(66, 145, 152)'
          },
          {
            label: 'Current Storage Level',
            data: currStorage,
            backgroundColor: 'rgb(120, 199, 227)'
          }
        ]
      };
      
      let ctx = document.getElementById('myChart');
      
      const config = {
        type: 'bar',
        data: data,
        options: {
          plugins: {
            title: {
              display: false
            },
            legend: {
              display: false
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false
              }
            },
            y: {
              stacked: true,
              grid: {
                display: false
              }
            }
          }
        }
      };
      
      let myChart = new Chart(ctx, config);
  
      return () => {
        myChart.destroy();
      }
    }); 
  
    return (
        <canvas id="myChart"></canvas>
    );
  }

  function Calendar() {
    return(
      <div id="calendar">
        <div id="calendar-text">
              Here's a quick look at some of the data on reservoirs from the{' '}
      				<a href="https://cdec.water.ca.gov/index.html">
      					California Data Exchange Center
      				</a>, which consolidates climate and water data from multiple federal
      				and state government agencies, and electric utilities. Select a month
      				and year to see storage levels in the eleven largest in-state
      				reservoirs.
        </div>
        <div id="calendar-api">
          <MonthYearPicker
            selectedMonth={month}
            selectedYear={year}
            minYear={2000}
            maxYear={2030}
            onChangeYear={year => setYear(year)}
            onChangeMonth={month => setMonth(month)}
            
          />
        </div>
      </div>
    );
  }

  return(
    <div id="expand-area">
      <div id="chart-container">
        <ChartArea/>
      </div>
      <Calendar/>
    </div>
  );
}

export default ExpandArea;
