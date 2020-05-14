import React, { createContext, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

export const Context = createContext()
axios.defaults.baseURL = '/api';
export const ContextProvider = ({ children }) => {

  const [users, setUsers] = useState([])
  const [allData, setAllData] = useState([])
  const [alertStatus, setAlertStatus] = useState({
    msg: "",
    type: ""
  })
  const getDataRelatorio = (consultors, initDate, finalDate) => {
    axios.post('/dataconsultors', { consultors, initDate, finalDate })
      .then(res => {
        if (res.data.info === "SUCCESS") {
          if (JSON.stringify(res.data.dataUsers) !== JSON.stringify(allData)) {
            setAlertStatus({
              msg: "Datos obtenidos exitosamente",
              type: "success"
            })
            setAllData(res.data.dataUsers)
          }

        } else {
          setAlertStatus({
            msg: "No hay datos de los usuarios",
            type: "info"
          })
          setAllData([])
        }
      }).catch((err) => {
        console.error(err);
        setAlertStatus({
          msg: "Hubo un error",
          type: "danger"
        })
      })
  }
  useEffect(() => {
    axios.get('/consultors').then(({ data }) => setUsers(data))
  }, [])
  return (
    <Context.Provider value={{
      users,
      allData,
      getDataRelatorio,
      alertStatus
    }}>
      {children}
    </Context.Provider>
  )
}
