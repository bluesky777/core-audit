import {useEffect, useState} from "react";
import {useFirestore} from "reactfire";
import {toast} from "react-toastify";
import useGetAuditorias from './useGetAuditorias'
import EliminarLibMesModal from './EliminarLibMesModal'
import CardHeaderDatosAudit from './CardHeaderDatosAudit'
import RowLibMes from './RowLibMes'


import SelectAnioMes from "./SelectAnioMes";

const DatosAuditoria = ({history}) => {
    const refFire = useFirestore();


    const [libMensuales, setLibMensuales] = useState([]);
    const [showDelModal, setShowDelModal] = useState(false)
    const [auditorias, getAuditorias, auditoriaActual] = useGetAuditorias()
    const [libMesSeleccionado, setLibMesSeleccionado] = useState(null)


    useEffect(() => {
        getAuditorias();
    }, []);


    useEffect(() => {

        if (auditoriaActual !== {}) {
            getLibrosMensuales()
        }

    }, [auditoriaActual]);


    const getLibrosMensuales = async () => {
        console.log({auditoriaActual})
        if (auditoriaActual.id) {
            const lib_mensualesTemp = await refFire.collection("lib_mensuales").where("auditoriaId", "==", auditoriaActual.id).orderBy("fecha").get();
            let lib_mensuales = [];
            lib_mensualesTemp.forEach((snapMens) => lib_mensuales.push({
                ...snapMens.data(),
                id: snapMens.id
            }));
            setLibMensuales(lib_mensuales);
            console.log({lib_mensuales});
        }

    }


    const handlerInputChange = (e, libMensual, tipo) => {

        const {value} = e.target
        libMensual[tipo] = value
        console.log({libMensual})


        const tempoLibros = libMensuales.map((libMens) => {
            return libMens.id === libMensual.id ? libMensual : libMens
        })

        setLibMensuales(tempoLibros)

    }

    const handleClickDeleteLibMes = async (libMensual) => {
        setLibMesSeleccionado(libMensual)
        setShowDelModal(true)

    }

    const deleteLibMes = async (libMensual) => {
        try {

            await refFire.collection("lib_mensuales").doc(libMensual.id).delete();
            toast.info('Libro eliminado')
            getLibrosMensuales()
            setShowDelModal(false)

        } catch (error) {
            toast.error('Error al eliminar libro')
        }
    }


    return (
        <div>

            <CardHeaderDatosAudit auditorias={auditorias}/>

            <EliminarLibMesModal showDelModal={showDelModal}
                setShowDelModal={setShowDelModal}
                libMesSeleccionado={libMesSeleccionado}
                deleteLibMes={deleteLibMes}/>


            <div className="card">
                <div className="card-body">

                    <h5 className="card-title">Libros del mes</h5>

                    {
                    auditoriaActual.id ? <SelectAnioMes getLibrosMensuales={getLibrosMensuales}
                        auditoriaId={
                            auditoriaActual.id
                        }/> : 'Establezca auditoría actual.'
                }

                    <table className="table table-responsive table-condensed">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Año</th>
                                <th>Mes</th>
                                <th>Diezmos</th>
                                <th>Ofrendas</th>
                                <th>Especial</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>{
                            libMensuales ? (libMensuales.map((libMensual, index) => <RowLibMes key={
                                    libMensual.id
                                }
                                libMensual={libMensual}
                                index={index}
                                handlerInputChange={handlerInputChange}
                                handleClickDeleteLibMes={handleClickDeleteLibMes}/>)) : <tr>
                                <td>Nada aún</td>
                            </tr>
                        }</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DatosAuditoria;
