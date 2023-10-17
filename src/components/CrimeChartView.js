import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';

import { Grid } from 'react-loader-spinner'
// import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

import jsPDF from 'jspdf';


import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title);



function CrimeChartView() {

  const chartRef = useRef(null);
  const [chartImage, setChartImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState(null)



  useEffect(() => {

    const printPDF = async () => {
      setLoading(true)
      try {
        let response = await axios.get('https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv')

        let years = []
        let totalCrime = []

        response.data.data.forEach(item => {
          years.push(item.data_year)
          totalCrime.push(item.Burglary)
        });


        let data = {
          labels: years,
          datasets: [
            {
              label: 'Burglary',
              data: totalCrime,
              borderColor: '#8884d8',
              pointStyle: 'line',
              pointRadius: 0,
            },
          ],
        };

        setChartData({ ...data })
        setLoading(false)

      } catch (err) {
        console.error(err.message)
        setLoading(false)
      }
    }
    printPDF()
  }, [])

  useEffect(() => {
    const captureChart = async () => {
      if (chartData && !loading) {
        if (chartRef.current) {
          const chartNode = chartRef.current;


          setTimeout(() => {
            domtoimage.toPng(chartNode)
            .then((dataUrl) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 80);
            pdf.save('chart.pdf');
    
            })
            .catch((err) => {
              console.log("----- err")
              console.log(err)
            })
          },1000)
        }
      }
    }
      captureChart();
  }, [chartData, loading])


  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
        grid: {
          lineWidth: 3,
        },
        title: {
          display: true,
          text: 'Arrests',
          font: {
            size: 22,
          },
        },
      },
    },
  };

  const chartDesign = {
    width: "60%",
    backgroundColor: '#dbd9d9',
    borderRadius: '10px',
    padding: '60px'
  }

  return (
    <>
      {
        loading ?
          <Grid />
          :
          chartData && Object.keys(chartData).length > 0 ?
            <>
              <div style={chartDesign} ref={chartRef} >
                <Chart type='line' data={chartData} options={options} />
              </div>

            </>
            :
            'Loading ...'
      }

    </>
  );
}


export default CrimeChartView;
