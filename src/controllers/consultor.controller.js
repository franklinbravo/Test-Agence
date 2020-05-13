const mysqlConnection = require('../db/database')

const consultorCtrl = {
  getListConsultors(req, res) {
    mysqlConnection.query(`
    SELECT cao_usuario.co_usuario, cao_usuario.no_usuario FROM cao_usuario 
    inner join permissao_sistema 
    on permissao_sistema.co_usuario = cao_usuario.co_usuario 
    where co_sistema=1 and in_ativo="S" 
    and co_tipo_usuario in (0,1,2)
    ORDER BY cao_usuario.no_usuario
    ;`, (err, rows) => {
      if (err) return res.status(500).send({ error: 'Hubo un error' })
      res.json(rows)
    })
  },
  getDataConsultors(req, res) {
    const { consultors, initDate, finalDate } = req.body;
    const users = consultors.join('" ,"');
    mysqlConnection.query(`
    SELECT ROUND(SUM(factura.valor - (factura.valor*(factura.total_imp_inc/100))),2) AS ganancias_netas, os.co_usuario, 
    us.no_usuario,
    MONTH(factura.data_emissao) AS mes, YEAR(factura.data_emissao) AS ano, salario.brut_salario AS costo_fijo,
    ROUND(SUM((factura.valor-(factura.valor*factura.total_imp_inc/100))*factura.comissao_cn/100),2) as comision
    FROM cao_fatura AS factura
    RIGHT OUTER JOIN cao_os AS os ON factura.co_os = os.co_os
    RIGHT OUTER JOIN cao_salario AS salario ON salario.co_usuario = os.co_usuario
    INNER JOIN cao_usuario AS us ON us.co_usuario = os.co_usuario
    WHERE os.co_usuario in ("${users}")
    and (factura.data_emissao BETWEEN "${initDate}" AND "${finalDate}")
    GROUP BY MONTH(factura.data_emissao), YEAR(factura.data_emissao), salario.brut_salario, os.co_usuario, us.no_usuario;
    `, (err, rows) => {
      if (err) return res.status(500).send({ error: 'Hubo un error' });
      if (rows.length === 0) return res.json({ info: "NO_USER_DATA" })
      res.json({ dataUsers: rows, info: "SUCCESS" })
    })
  }
}

module.exports = consultorCtrl;


