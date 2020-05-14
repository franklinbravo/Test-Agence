import React, { useRef, useEffect } from 'react'
import Chartjs from "chart.js";
import * as moment from 'moment'
import FormatCurrency from './FormatCurrency'

export const Chart = ({ data = [], dates }) => {
  const canvasRef = useRef(null)
  const initDate = moment({ y: dates.yearStart, month: dates.monthStart }).format('MMMM YYYY')
  const finalDate = moment({ y: dates.yearEnd, month: dates.monthEnd }).format('MMMM YYYY')
  useEffect(() => {
    //Rellenando espacios vacios del array para que coincida en la grafica con la fechas
    let aux = []
    if (data.length > 0) {
      aux = Array.from(new Set(data.reduce((a, b) => a.concat(b)).map(({ mes }) => mes))).sort()
    }
    const fillEmptySpaces = () => {
      const newArr = []
      data.forEach((arr) => {
        const internalArr = []
        let count = 0
        aux.forEach((m) => {
          let exist = false
          arr.forEach((data) => {
            if (m === data.mes) {
              exist = true
              count++
            }
          })
          if (exist) {
            internalArr.push(arr[count - 1])
          } else {
            internalArr.push({
              ganancias_netas: 0,
              mes: m,
              no_usuario: arr[0]?.no_usuario
            })
          }

        })
        newArr.push(internalArr)
      })
      return newArr
    }
    const dataChart = fillEmptySpaces()
    //Colores Ramdom
    const dynamicColors = () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b},0.4)`
    };


    let barChartData = {}
    if (data.length > 0) {

      //Calculo de promedio de costo fijo
      const CostoFixo = data.map((user) => user[0]?.costo_fijo || 0)
      const totalCostoFixo = CostoFixo.reduce((a, b) => a + b) / CostoFixo.length
      barChartData = {
        labels: aux.map((mes) => moment({ month: mes - 1 }).format('MMMM')),
        datasets: [...dataChart.map((dataUser) => {
          return {
            label: dataUser[0]?.no_usuario,
            backgroundColor: dynamicColors(),
            borderColor: 'grey',
            borderWidth: 1,
            data: dataUser.map(({ ganancias_netas }) => ganancias_netas),
            order: 2
          }
        }),
        {
          label: 'Custo Fixo Medio',
          type: 'line',
          order: 1,
          data: aux.map((_) => totalCostoFixo)
        }
        ]
      }

    }
    const options = {
      scales: {
        yAxes: [{
          ticks: {
            callback(value) {
              return `R$ ${FormatCurrency(value)}`;
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            return `${dataset.label}: R$ ${FormatCurrency(dataset.data[tooltipItem.index])}`;
          }
        }
      }
    }
    const ctx = canvasRef.current.getContext("2d");
    const myChart = new Chartjs(ctx, {
      type: 'bar',
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
      <h3 className="text-center">Performance Comercial</h3>
      <p className="text-center"> {initDate} a {finalDate} </p>

      <canvas id="myChart" ref={canvasRef}>

      </canvas>
    </div>
  )
}
