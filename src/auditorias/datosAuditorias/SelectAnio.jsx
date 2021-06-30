import PropTypes from 'prop-types'
import { useFirestore } from 'reactfire'
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react'

const SelectAnio = ({auditoriaId}) => {

    const refFire = useFirestore()
    const [datosNewLibroMes, setDatosNewLibroMes] = useState({})

    const handlerDatosLibroMes = (e) => {
        const { name } = e.target
        setDatosNewLibroMes( (datos) => {
            return {
                ...datos,
                [name]: e.target.value
            }
        })
    }

    const crearLibroMes = async () => {
        console.log('A guardar')
        const res = await refFire.doc().set({...datosNewLibroMes, auditoria_id: auditoriaId})
        console.log(res)
        toast.success('Agregado.')
    }

    return (
        <>
            <select onChange={ (e) => handlerDatosLibroMes(e)} name="anio" multiple style={{padding: 5, margin: 5, borderRadius: 5}}>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
            
            <select onChange={ (e) => handlerDatosLibroMes(e)} name="mes" multiple style={{padding: 5, margin: 5, borderRadius: 5}}>
                <option value="Enero">Enero</option>
                <option value="Febrero">Febrero</option>
                <option value="Noviembre">Noviembre</option>
                <option value="Diciembre">Diciembre</option>
            </select>

            <button className="btn btn-primary" onClick={() => crearLibroMes() }>
                <FaPlus />
            </button>

        </>
    )
}

SelectAnio.propTypes = {
    auditoriaId: PropTypes.number
}

export default SelectAnio
