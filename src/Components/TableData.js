import React from 'react'
import { Table } from 'react-bootstrap'
import * as moment from 'moment'
import FormatCurrency from './FormatCurrency'


export const TableData = ({ dataUser = [] }) => {

  const calculate = (key) => {
    if (dataUser.length > 0) {
      return dataUser.map((data) => data[key]).reduce((prev, current) => prev + current)
    }
  }
  return (
    <div className="mt-2">
      <h5 style={{ margin: 0 }} >{dataUser[0] && dataUser[0].no_usuario}</h5>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>
              Periodo
          </th>
            <th>
              Receita Liquida
          </th>
            <th>
              Custo Fixo
          </th>
            <th>
              Comissão
          </th>
            <th>
              Lucro
          </th>
          </tr>
        </thead>
        <tbody>
          {
            dataUser.map(({ ganancias_netas, costo_fijo, comision, ano, mes }, i) => (
              <tr key={i}>
                <th>
                  {moment({ y: ano, M: mes - 1 }).format('MM/YYYY')}
                </th>
                <th>
                  R$ {FormatCurrency(ganancias_netas)}
                </th>
                <th>
                  - R$ {FormatCurrency(costo_fijo)}
                </th>
                <th>
                  - R$ {FormatCurrency(comision)}
                </th>
                <th>
                  R$ {FormatCurrency(ganancias_netas - costo_fijo - comision)}
                </th>
              </tr>
            ))
          }
          <tr>
            <th>
              Saldo
            </th>
            <th>
              R$ {calculate("ganancias_netas") && FormatCurrency(calculate("ganancias_netas"))}
            </th>
            <th>
              - R$ {calculate("costo_fijo") && FormatCurrency(calculate("costo_fijo"))}
            </th>
            <th>
              - R$ {calculate("comision") && FormatCurrency(calculate("comision"))}
            </th>
            <th>
              R$ {FormatCurrency(calculate("ganancias_netas") - calculate("costo_fijo") - calculate("comision"))}
            </th>
          </tr>
        </tbody>
      </Table>
    </div>

  )
}
