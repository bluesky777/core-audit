import {
  CButtonGroup,
  CPopover,
  CButton,
} from "@coreui/react";
import {FaTimes} from 'react-icons/fa';

function RowLibMes({libMensual, index, handlerInputChange, handleClickDeleteLibMes}) {
    return (<tr>
        <td>{
            index + 1
        }</td>
        <td> {
            libMensual.anio
        }</td>
        <td>
            <CButtonGroup>
                <CButton color="info" size="sm"> {
                    libMensual.mes
                }</CButton>
                <CButton color="danger"
                    onClick={
                        () => handleClickDeleteLibMes(libMensual)
                }>
                    <FaTimes/>
                </CButton>
            </CButtonGroup>

        </td>
        <td>
            <CPopover header="Diezmos semanales" content="Todo">
                <input type="number" min={0} className="form-control"
                    onChange={
                        (e) => handlerInputChange(e, libMensual, 'diezmos')
                    }
                    value={
                        libMensual.diezmos
                    }/>
            </CPopover>
        </td>
        <td>
            <CPopover header="Ofrendas semanales" content="Todo">
                <input type="number" min={0} className="form-control"
                    onChange={
                        (e) => handlerInputChange(e, libMensual, 'ofrendas')
                    }
                    value={
                        libMensual.ofrendas
                    }/>
            </CPopover>
        </td>
        <td>
            <CPopover header="Ofrendas especiales semanales" content="Todo">
                <input type="number" min={0} className="form-control"
                    onChange={
                        (e) => handlerInputChange(e, libMensual, 'especiales')
                    }
                    value={
                        libMensual.especiales
                    }/>
            </CPopover>
        </td>
    </tr>)
}

export default RowLibMes
