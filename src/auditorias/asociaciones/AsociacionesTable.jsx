import {useFirestore} from 'reactfire'
import {useEffect, useState} from 'react'
import 'firebase/firestore'
import {Link} from 'react-router-dom';

const AsociacionesTable = ({history}) => {

    const refFire = useFirestore();
    const [asociaciones, setAsociaciones] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosAsociaciones = []
            const snapshots = await refFire.collection('asociaciones').get();
            snapshots.docs.forEach(snap => {
                datosAsociaciones.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            setAsociaciones(datosAsociaciones)
        }

        traerDatos()

    }, [refFire])

    return (
        <div className="card">
            <div className="card-body">

                <h2 className="card-title">Asociaciones</h2>
                <Link className="btn btn-primary" to="/asociaciones/add">Crear</Link>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Presidente</th>
                            <th>País</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>{
                        asociaciones.map((union, index) => (
                            <tr key={union.id}>
                                <td>{
                                    index + 1
                                }</td>
                                <td>{
                                    union.nombre
                                }</td>
                                <td>{
                                    union.codigo
                                }</td>
                                <td>{
                                    union.presidente
                                }</td>
                                <td>{
                                    union.pais
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push(`/asociaciones/edit/${union.id}`)
                                    }} className="btn btn-success btn-sm">
                                        <i className="cil-pencil"></i>
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        <i className="cil-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }</tbody>
                </table>
            </div>
        </div>
    )
}

export default AsociacionesTable
