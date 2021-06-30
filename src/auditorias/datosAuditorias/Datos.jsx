import { useEffect, useState} from 'react';
import { useFirestore } from 'reactfire';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa'


const DatosAuditorias = ({history}) => {


    const refFire = useFirestore()

    const [auditorias, setAuditorias] = useState([])
    const [auditoriaActual, setAuditoriaActual] = useState({})
    const [libMensuales, setLibMensuales] = useState([])
    const [datosNewLibroMes, setDatosNewLibroMes] = useState({})


    useEffect(() => {
        const traerDatos = async () => {

            // Traer auditorias y la actual
            const auditoriasFix = []
            const auditoriasTemp = await refFire.collection('auditorias').get()
            let auditTemp = {}

            
            auditoriasTemp.forEach(async (snapshot) => {
                auditTemp = { ...snapshot.data(), id: snapshot.id}
                auditoriasFix.push(auditTemp)

                if(auditTemp.actual === true){
                    setAuditoriaActual(auditTemp)
                    // // Traer libros de la auditorias actual
                    console.log({auditTemp})
                    const lib_mensualesTemp = await refFire.collection('lib_mensuales').where('auditoria_id', '==',  auditTemp.id).get()
                    let lib_mensuales = []
                    lib_mensualesTemp.forEach(snapMens => (
                        lib_mensuales.push({ ...snapMens.data(), id: snapMens.id })
                    ))
                    setLibMensuales(lib_mensuales)
                    console.log({lib_mensuales})
                }
            })
            
            setAuditorias(auditoriasFix)


            
        }

        traerDatos()

    }, [refFire])


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
        const res = await refFire.collection('lib_mensuales').doc().set({...datosNewLibroMes, auditoria_id: auditoriaActual.id})
        console.log(res)
        toast.success('Agregado.')
    }



    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Auditoria </h4>

                    <div>
                        {
                            auditorias && 
                            auditorias.map((audit) => {
                                return (
                                    <button key={audit.id} className="btn btn-primary">
                                        {audit.fecha}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Libros del mes</h5>
                    
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



                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Mes</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            libMensuales && 
                            libMensuales.map((libMensual, index) => {
                                return (
                                    <tr key={libMensual.id}>
                                        <td>{index + 1}</td>
                                        <td>{libMensual.mes}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DatosAuditorias