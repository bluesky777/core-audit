import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CPopover,
} from "@coreui/react";
import { useDispatch } from 'react-redux'



export default function CardHeaderDatosAudit({auditorias}) {

  const dispatch = useDispatch();

  const handleClickAuditoria = (auditoria) => {
    dispatch({
      type: 'set',
      auditoriaActual: auditoria
    })
  }

    return (<CCard>
        <CCardHeader>Datos Auditoria</CCardHeader>
        <CCardBody>
            <div> {
                auditorias && auditorias.map((audit) => {
                    return (<CPopover key={
                            audit.id
                        }
                        header={
                            audit.iglesia.nombre
                        }
                        content={
                            `Actual: ${
                                audit.actual ? 'Si' : 'No'
                            }`
                    }>
                        <button className={`btn ${audit.actual ? 'btn-primary btn-lg disabled':'btn-outline-primary'}`}
                          onClick={() => handleClickAuditoria(audit)}> {
                            audit.fecha
                        } </button>
                    </CPopover>);
                })
            } </div>
        </CCardBody>
    </CCard>)
}
