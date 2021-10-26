import { useCallback, useEffect, useState, FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import request from "../data/api";
// import { toast } from "react-toastify";
import { IglesiasRepo } from "../data/repositories/IglesiasRepo";
import Select from "react-select";
import { LocationState  } from "history"



const Iglesias = ({ history }) => {
  const [iglesias, setIglesias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  const user = useSelector(state => state.AuthReducer.user)

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
      if (localStorage.getItem('distrito_id-item-selected')){
        const distr_id = parseInt(localStorage.getItem('distrito_id-item-selected'))
        const distriFound = datosDistritos.find((elem) => elem.id == distr_id)
        setIglesias(distriFound.iglesias)
      }
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
    localStorage.setItem('distrito_id-item-selected', distrito.id)
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Iglesias</h2>
        <Link className="btn btn-primary" to="/iglesias/add">
          Crear
        </Link>

        <div style={{'margin': '10px 0px'}}>
          <label>Distrito</label>
          <Select options={distritos} onChange={onSelectDistrito} />
        </div>
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
            {iglesias.map((iglesia, index) => (
              <tr key={iglesia.id}>
                <td>{index + 1}</td>
                <td>{iglesia.nombre}</td>
                <td>{iglesia.codigo}</td>
                <td>{iglesia.distrito_id}</td>
                <td>{iglesia.tipo}</td>
                <td>{iglesia.zona}</td>
                <td>
                  <button
                    onClick={() => {
                      history.push(`/iglesias/edit/${iglesia.id}`);
                    }}
                    className="btn btn-success btn-sm"
                  >
                    <i className="cil-pen"></i>
                  </button>
                  <button
                    onClick={() => eliminar(iglesia.id)}
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
