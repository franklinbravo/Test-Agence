import React, { useRef, useEffect } from 'react'
import Chartjs from "chart.js";

export const ChartPie = ({ data = [] }) => {
  const canvasRef = useRef(null)
  // Opciones de la torta

  useEffect(() => {
    const dynamicColors = () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b},0.4)`
    };
    const labels = data.map((arr) => arr.map(({ no_usuario }) => no_usuario)[0])
    const barChartData = {
      labels,
      datasets: [{
        backgroundColor: labels.map(() => dynamicColors()),
        borderColor: 'grey',
        borderWidth: 1,
        data: data.map((dataUser) => dataUser.length > 0 && dataUser.map(({ ganancias_netas }) => ganancias_netas).reduce((a, b) => a + b))
      }]
    }
    const options = {
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            //Convirtiendo a porcentaje
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const total = dataset.data.length > 0 && dataset.data.reduce((a, b) => a + b)
            const currentValue = dataset.data[tooltipItem.index];
            const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
            return `${data.labels[tooltipItem.index]}: ${percentage}%`;
          }
        }
      }
    }
    const ctx = canvasRef.current.getContext("2d");
    const myChart = new Chartjs(ctx, {
      type: 'pie',
      data: barChartData,
      options
    });

    myChart.update({
      duration: 800,
      easing: 'linear'
    });
    return () => myChart.destroy();
  }, [data])
  return (
    <div>
      <h3 className="text-center">Participacao na receitas</h3>
      <canvas id="myChart" ref={canvasRef}>

      </canvas>
    </div>
  )
}
