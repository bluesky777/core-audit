import {useFirestore} from 'reactfire'
import {toast} from 'react-toastify';
import {FaPlus} from 'react-icons/fa';
import {useState} from 'react'
import {CTooltip, CSelect} from '@coreui/react'

const SelectAnioMes = ({auditoriaId, getLibrosMensuales}) => {

    const refFire = useFirestore()
    const [datosNewLibroMes, setDatosNewLibroMes] = useState({})
    const mesesCrudo = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ];

    const handlerDatosLibroMes = (e) => {
        const {name} = e.target
        setDatosNewLibroMes((datos) => {
            return {
                ...datos,
                [name]: e.target.value
            }
        })
    }


    const crearLibroMes = async () => {

        const mesIndex = datosNewLibroMes.mesIndex;
        const mes = mesesCrudo[mesIndex];
        const anio = datosNewLibroMes.anio;
        const fecha = parseInt(`${anio}${mesIndex}`);

        const tokeep = {
            mesIndex,
            anio,
            mes,
            fecha,
            createdAt: new Date(),
            diezmos: 0,
            ofrendas: 0,
            especiales: 0,
            auditoriaId
        }
        setDatosNewLibroMes((estado) => tokeep)
        console.log(tokeep)
        const res = await refFire.collection('lib_mensuales').doc().set(tokeep)
        console.log(res)
        getLibrosMensuales()
        toast.success('Agregado.')
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
            <CSelect onChange={
                    (e) => handlerDatosLibroMes(e)
                }
                name="anio"
                multiple
                className="col-sm">
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
            </CSelect>

            <CSelect onChange={
                    (e) => handlerDatosLibroMes(e)
                }
                name="mesIndex"
                multiple
                className="col-sm"
            >
                {
                mesesCrudo.map((mes, index) => (
                    <option key={mes}
                        value={index}>
                        {mes}</option>
                ))
            } </CSelect>


            <CTooltip content="Agregar libro mes">
                <button className="btn btn-primary"
                    onClick={
                        () => crearLibroMes()
                }>
                    <FaPlus/>
                </button>
            </CTooltip>

        </div>
    )
}


export default SelectAnioMes
