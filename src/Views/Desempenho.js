import React, { useContext, useState, useRef } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Context } from '../Context/Context'
import { useEffect } from 'react'
import arrowBack from '../assets/arrow_back.svg'
import arrowForward from '../assets/arrow_forward.svg'
import { TableData } from '../Components/TableData'
import { Chart } from '../Components/Chart'
import * as moment from 'moment'
import { ChartPie } from '../Components/ChartPie'



const years = (end = 1999) => {
  const init = new Date('2008').getFullYear()
  const arrayYears = []
  while (init >= end) {
    arrayYears.push(++end)
  }
  return arrayYears;
}

export const Desempenho = () => {

  const leftBoxRef = useRef()
  const rightBoxRef = useRef()
  const { users, allData = [], getDataRelatorio } = useContext(Context)
  //Estado de las dos cajas
  const [boxLeft, setBoxLeft] = useState([])
  const [boxRight, setboxRight] = useState([])

  const [selectBoxLeft, setSelectBoxLeft] = useState([])
  const [selectBoxRight, setSelectBoxRight] = useState([])
  const [dates, setDates] = useState({
    yearStart: "",
    monthStart: "",
    yearEnd: "",
    monthEnd: ""
  })
  const [dataUserSorted, setdataUserSorted] = useState([[]])
  const [showTypeData, setshowTypeData] = useState({
    showTable: false,
    showChartBar: false,
    showChartPie: false
  })
  //Errores en inputs
  const [errors, setErros] = useState({
    yearStart: false,
    monthStart: false,
    yearEnd: false,
    monthEnd: false,
    rightBox: false
  })

  const handleChangeDate = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value
    })
  }
  //Seleccionador de caja izquierda
  const selectBoxUsersLeft = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectUsers = options.map(({ value, text }) => ({
      co_usuario: value,
      no_usuario: text
    }))
    setSelectBoxLeft(selectUsers)
  }
  //Seleccionador de caja derecha
  const selectBoxUsersRight = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectUsers = options.map(({ value, text }) => ({
      co_usuario: value,
      no_usuario: text
    }))
    setSelectBoxRight(selectUsers)
  }
  //Agregar a caja derecha
  const addRightBox = () => {
    const newAllUsers = [];
    boxLeft.forEach(data => {
      let exist = false;
      selectBoxLeft.forEach(({ co_usuario }) => {
        if (data.co_usuario === co_usuario) {
          exist = true
        }
      })
      if (!exist) {
        newAllUsers.push(data)
      }
    })
    Array.from(leftBoxRef.current.options).forEach((option) => {
      option.selected = false;
    })
    setboxRight([...boxRight, ...selectBoxLeft])
    setBoxLeft(newAllUsers)
    setSelectBoxLeft([])
  }

  //Agregar a caja izquierda
  const addLeftBox = () => {
    const newAllUsers = [];
    boxRight.forEach(data => {
      let exist = false;
      selectBoxRight.forEach(({ co_usuario }) => {
        if (data.co_usuario === co_usuario) {
          exist = true
        }
      })
      if (!exist) {
        newAllUsers.push(data)
      }
    })
    Array.from(rightBoxRef.current.options).forEach((option) => {
      option.selected = false;
    })
    setBoxLeft([...boxLeft, ...selectBoxRight])
    setboxRight(newAllUsers)
    setSelectBoxRight([])
  }

  const sendUsers = () => {
    const initDate = moment({ y: dates.yearStart, month: dates.monthStart }).format('YYYY-MM-DD')
    const finalDate = moment({ y: dates.yearEnd, month: dates.monthEnd }).format('YYYY-MM-DD')
    const consultors = boxRight.map(({ co_usuario }) => co_usuario)
    getDataRelatorio(consultors, initDate, finalDate)
  }
  const verifyInputs = () => {
    setErros({
      yearStart: dates.yearStart === "",
      monthStart: dates.monthStart === "",
      yearEnd: dates.yearEnd === "",
      monthEnd: dates.monthEnd === "",
      rightBox: boxRight.length === 0
    })
    if (dates.yearStart === "" ||
      dates.monthStart === "" ||
      dates.yearEnd === "" ||
      dates.monthEnd === "" ||
      boxRight.length === 0
    ) {
      return true
    }
    return false
  }
  const showTable = () => {
    if (verifyInputs()) return;
    sendUsers()
    setshowTypeData({
      showChartBar: false,
      showChartPie: false,
      showTable: true
    })
  }
  const showChartBar = () => {
    if (verifyInputs()) return;
    sendUsers()
    setshowTypeData({
      showChartBar: true,
      showChartPie: false,
      showTable: false
    })
  }
  const showChartPie = () => {
    if (verifyInputs()) return;
    sendUsers()
    setshowTypeData({
      showChartBar: false,
      showChartPie: true,
      showTable: false
    })
  }
  useEffect(() => {
    setBoxLeft(users)
  }, [users])

  useEffect(() => {
    //Ordenando datos por usuario
    const dividerArray = () => {
      const divi = []
      const newArr = new Set(allData.map(({ co_usuario }) => (co_usuario)))
      Array.from(newArr).forEach(user => {
        const onlyUser = allData.filter(({ co_usuario }) => co_usuario === user)
        divi.push(onlyUser)
      })
      setdataUserSorted(divi)
    }
    if (allData.length > 0) {
      dividerArray()
    }

  }, [allData])

  return (
    <Container style={{ paddingTop: 150 }}  >
      <form className="w-100" >
        <Row>
          <Col sm="2" xs="6">
            <Form.Group >
              <Form.Control as="select" onChange={handleChangeDate} name="yearStart" size="sm" isInvalid={errors.yearStart} >
                <option value=""></option>
                {
                  years().map((year, i) => (
                    <option value={year} key={i}> {year}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm="2" xs="6">
            <Form.Group >
              <Form.Control as="select" onChange={handleChangeDate} name="monthStart" size="sm" isInvalid={errors.monthStart} >
                <option value=""></option>
                {
                  moment.months().map((month, i) => (
                    <option value={i} key={i}> {month}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm="2" xs="12" >
            <h5 className="text-center" >a</h5>
          </Col>
          <Col sm="2" xs="6">
            <Form.Group >
              <Form.Control as="select" onChange={handleChangeDate} name="yearEnd" disabled={!dates.yearStart} size="sm" isInvalid={errors.yearEnd} >
                <option value=""></option>
                {
                  years(dates.yearStart).map((year, i) => (
                    <option value={year} key={i}> {year}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm="2" xs="6">
            <Form.Group >
              <Form.Control as="select" onChange={handleChangeDate} name="monthEnd" size="sm" isInvalid={errors.monthEnd} >
                <option value=""></option>
                {
                  moment.months().map((month, i) => (
                    <option value={i} key={i}> {month}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </form>
      <Row style={{ height: 200 }}>
        <Col className="mt-auto mb-auto">
          <Form.Group >
            <Form.Label>Usuarios</Form.Label>
            <Form.Control as="select" multiple onChange={selectBoxUsersLeft} ref={leftBoxRef} >
              {
                boxLeft.map(({ co_usuario, no_usuario }, i) => (
                  <option value={co_usuario} key={i}> {no_usuario}</option>
                ))
              }
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm="1" className="d-flex justify-content-center align-items-center"  >
          <img src={arrowBack} alt="" style={{ cursor: 'pointer' }} onClick={addLeftBox} />
          <img src={arrowForward} alt="" style={{ cursor: 'pointer' }} onClick={addRightBox} />
        </Col>
        <Col className="mt-auto mb-auto">
          <Form.Group >
            <Form.Label></Form.Label>
            <Form.Control as="select" multiple onChange={selectBoxUsersRight} ref={rightBoxRef} isInvalid={errors.rightBox} >
              {
                boxRight.map(({ co_usuario, no_usuario }, i) => (
                  <option value={co_usuario} key={i}> {no_usuario}</option>
                ))
              }
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm="2" className="d-flex justify-content-center flex-column">
          <Button className="mt-1" onClick={showTable} variant="outline-dark" >
            Relatorio
          </Button>
          <Button className="mt-1" variant="outline-dark" onClick={showChartBar} >
            Grafico
          </Button>
          <Button className="mt-1" variant="outline-dark" onClick={showChartPie} >
            Pizza
          </Button>
        </Col>
        <Col xs="12" style={{ minHeight: "60vh" }}>
          {
            showTypeData.showTable ?
              dataUserSorted.map((dataUser, i) => (
                <TableData dataUser={dataUser} key={i} />
              )) : null
          }
          {
            showTypeData.showChartBar ?
              <Chart data={dataUserSorted} dates={dates} />
              : null
          }
          {
            showTypeData.showChartPie ?
              <ChartPie data={dataUserSorted} />
              : null
          }
        </Col>
      </Row>
    </Container>
  )
}
