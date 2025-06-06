import React from 'react';
import Chart from 'react-apexcharts';

const DialyBonus = ({ dailyData }) => {
  const options = {
    chart: {
      id: 'redeemed-bonuses'
    },
    xaxis: {
      categories: dailyData.map(data => data.date)
    },
    stroke: {
      curve: 'smooth',
      colors: ['#444']
    },
    markers: {
      size: 5,
      colors: ['#FF4560']
    },
    fill : {
      colors: ['#FF4560'],
      type: 'solid',
      opacity: 0.5,
    }
  };

  const series = [{
    name: 'Bonos Pagados',
    data: dailyData.map(data => parseInt(data.count, 10))
  }];

  return (
    <div>
      <Chart options={options} series={series} type="area" width="100%" height={250} />
    </div>
  );
};

export default DialyBonus;
