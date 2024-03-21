import React from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import {Chart as ChartJS,Title,Legend} from 'chart.js/auto';

ChartJS.register(Title,Legend)
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },

  },
}

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets:[
    {
      label:  'Sales for 2020',
      data: [40000,50000,20000,10000,25000],
      backgroundColor: '#183044',
      borderWidth: 1,
    },
    {
      label:  'Sales for 2021',
      data: [60000,70000,30000,40000,55000],
      backgroundColor:'gray',
    },
  ]
}
const BarChart = () => {
  // For example:
  return (
    <div className=''>
      <div className='w-full'>
        <Bar data={data} options={options} />
      </div>
      
      
     
    </div>
  )
}

export default BarChart