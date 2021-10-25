import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import request from "../data/api";
// import { toast } from "react-toastify";
import { IglesiasRepo } from "../data/repositories/IglesiasRepo";
import Select from "react-select";


type IglesiaType = {
  id: Number,
  nombre: String,
  codigo: String,
}

const Iglesias = ({ history }) => {
  const [iglesias, setIglesias] = useState<IglesiaType>([]);
  const [distritos, setDistritos] = useState([]);

  const user = useSelector(state => state.AuthReducer.user)
  console.log(user)

  const traerDatos = useCallback(
    async () => {
      if (!user) return
      
      console.log(user)

      let res = await IglesiasRepo(request).get(user.asociacion_id);
      res = res.data.sort();
      const datosDistritos = res.map((distri) => {
        return {...distri, value: distri.id, label: distri.nombre}
      })
      setDistritos(datosDistritos);
    },
    [user],
  )

  useEffect(() => {
    traerDatos();
  }, [traerDatos]);

  const eliminar = async (id) => {
    const respuesta = window.confirm("Seguro que quiere eliminar?");
    if (respuesta) {
      //   await refFire.collection("iglesias").doc(id).delete();
      //   toast("Eliminado");
      //   const temp = iglesias.filter((iglesias) => {
      //     console.log(iglesias, id);
      //     return iglesias.id !== id;
      //   });
      // setIglesias(temp);
    }
  };

  const onSelectDistrito = (distrito)=>{
    setIglesias(distrito.iglesias)
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Iglesias</h2>
        <Link className="btn btn-primary" to="/iglesias/add">
          Crear
        </Link>

        <Select options={distritos} onChange={onSelectDistrito} />

        <table className="table table-sn">
          <thead>
            <tr>
              <th>Nro</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Distrito_id</th>
              <th>Tipo</th>
              <th>Zona</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {iglesias.map((iglesias, index) => (
              <tr key={iglesias.id}>
                <td>{index + 1}</td>
                <td>{iglesias.nombre}</td>
                <td>{iglesias.codigo}</td>
                <td>{iglesias.distrito_id}</td>
                <td>{iglesias.tipo}</td>
                <td>{iglesias.zona}</td>
                <td>
                  <button
                    onClick={() => {
                      history.push(`/iglesias/edit/${iglesias.id}`);
                    }}
                    className="btn btn-success btn-sm"
                  >
                    <i className="cil-peniel"></i>
                  </button>
                  <button
                    onClick={() => eliminar(iglesias.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="cil-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Iglesias;
