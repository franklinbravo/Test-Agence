import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useContext } from 'react'
import { Context } from '../Context/Context'

export const Alerts = () => {
  const [show, setShow] = useState(false);
  const { alertStatus } = useContext(Context)
  const { type, msg } = alertStatus;
  useEffect(() => {
    if (alertStatus.type !== "" && alertStatus.msg !== "") {
      setShow(true)
    }
  }, [alertStatus])
  if (show) {
    setTimeout(() => {
      setShow(false)
    }, 3000)
    return (
      <Alert variant={type} dismissible onClose={() => setShow(false)} style={{ transition: "all .5s ease-in-out", position: "fixed", top: 80, right: 10 }} >
        {msg}
      </Alert>
    )
  }
  return null
}
