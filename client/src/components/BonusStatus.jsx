import React from 'react';
import Chart from 'react-apexcharts';

const BonusStatus = ({ redeemed, nonRedeemed }) => {
  const options = {
    labels: ['Bonos Pagados', 'Bonos Pendientes'],
    legend: {
      position: 'bottom'
    },
    colors: ['#444', '#FF4560'], 
    dataLabels: {
      formatter: function (val) {
        return val.toFixed(2) + "%";
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const series = [redeemed, nonRedeemed];

  return (
    <div>
      <Chart options={options} series={series} type="pie" width="100%" height={250}/>
    </div>
  );
};

export default BonusStatus;
