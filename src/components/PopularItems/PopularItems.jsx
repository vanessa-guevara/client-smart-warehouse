import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './PopularItems.scss'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // Pone la leyenda en la parte superior del gráfico
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Oculta las líneas de la cuadrícula del eje X para una apariencia más limpia
      },
    },
    y: {
      grid: {
        display: true, // Muestra líneas de cuadrícula en el eje Y para mejor legibilidad
      },
      beginAtZero: true, // Comienza la escala en cero
    }
  }
};


const PopularItems = ({ data ,type}) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: `${type} quantity`,
        data: data.map(item => item.quantity),
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
      },
    ],
  };

  return <Bar data={chartData} options={options} className='popular-items' />;
};

export default PopularItems;
