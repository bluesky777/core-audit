import { useEffect, useState} from 'react';
import { useFirestore } from 'reactfire';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa'


const Auditorias = ({history}) => {

    const refFire = useFirestore();
    const [auditorias, setAuditorias] = useState([])

    useEffect(() =>{
        const traerDatos = async () => {
            const temporales = []
            const snapshot = await refFire.collection('auditorias').get()
            snapshot.docs.forEach((doc)=>{
                const elem = {
                    id: doc.id,
                    ...doc.data()
                }
                temporales.push(elem)
            })
            setAuditorias(temporales)
        } 

        traerDatos()
    }, [refFire])
    
    const eliminar = async (id) => {
        const respuesta = window.confirm('Seguro que quiere eliminar?');
        if (respuesta) {
            await refFire.collection('auditorias').doc(id).delete();
            toast('Eliminado')
            const temp = auditorias.filter((auditorias)=> {
                console.log(auditorias, id)
                return auditorias.id !== id
            })
            setAuditorias(temp)
            
        }
    }

    const setActual = async(id) => {
        let batch = refFire.batch();
        auditorias.forEach( (audit) => {
            let elem = refFire.collection('auditorias').doc(audit.id)
            const actual = audit.id === id ? true : false;
            batch.update(elem, { actual})
        })
        await batch.commit();
        // await refFire.collection('auditorias').doc(id).update({actual: true})
        toast('Actualizado')
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Auditoria </h2>
                <Link className="btn btn-primary" to="/auditorias/add">
                    <FaPlus style={{ marginRight: '5px', marginTop: '-3px' }} />
                    Crear
                </Link>

                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Fecha</th>
                                <th>Iglesia</th>
                                <th>Actual</th>
                                <th>Activo</th>
                                <th>Editar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                auditorias.map((audit, index) => (
                                    <tr key ={audit.id}>
                                        <td>{index + 1}</td>
                                        <td>{audit.fecha}</td>
                                        <td>{}</td>
                                        <td>
                                            {audit.actual 
                                            ?
                                                'Actual'
                                            :
                                            <button onClick={()=> setActual(audit.id)} className="btn  btn-primary btn-xm" >
                                                Poner como actual
                                            </button>
                                            }
                                        </td>
                                        <td>{audit.activo ? 'Si' : 'No'}</td>
                                        <td>
                                            <button onClick={ () => {
                                                history.push(`/auditorias/edit/${audit.id}`)
                                            }} 
                                            className="btn btn-success btn-sm">
                                                <FaPen />
                                            </button>
                                            <button onClick={() => eliminar(audit.id)} className="btn btn-danger btn-sm"> 
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
            </div>
        </div>
    )
}

export default Auditorias;