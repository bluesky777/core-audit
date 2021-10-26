import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import request from "../data/api";
import { toast } from "react-toastify";
import { IglesiasRepo } from "../data/repositories/IglesiasRepo";

const schema = yup.object().shape({
  nombre: yup.string().required("Es requerido"),
  codigo: yup.string(),
  presidente: yup.string(),
  pais: yup.string(),
});

const AddEditIglesia = ({ history, match }) => {
  const id = match.params.id;
  const isAddMode = !id;
console.log({id})
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (datos) => {
    return isAddMode ? crear(datos) : actualizar(datos);
  };

  const crear = async (datos) => {
    console.log(datos);
    await refFire.doc().set(datos);
    toast("Iglesia Creada.");
    history.push("/iglesias");
  };

  const actualizar = async (datos) => {
    console.log(datos);
    await refFire.doc(id).set(datos);
    toast("Unión Modificada.");
    history.push("/iglesias");
  };

  const onCancelar = () => {
    history.push("/iglesias");
  };

  useEffect(() => {
    const traerDatos = async () => {
      let res = await IglesiasRepo(request).find(id);
      const fields = ["nombre", "codigo", "distrito_id", "tipo", "zona"];
      fields.forEach((field) => setValue(field, res[field]));
    };

    if (!isAddMode) {
      traerDatos();
    }
  }, [setValue, isAddMode, id]);

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-gruop">
            <label>Nombre</label>
            <input className="form-control" {...register("nombre")} />
            <div className="text-danger">
              <small>{errors.nombre?.message}</small>
            </div>
          </div>
          <div className="input-gruop">
            <label>Código</label>
            <input className="form-control" {...register("codigo")} />
          </div>
          <div className="input-gruop">
            <label>Distrito_id</label>
            <input className="form-control" {...register("distrito_id")} />
          </div>
          <div className="input-gruop">
            <label>Tipo</label>
            <input className="form-control" {...register("tipo")} />
          </div>
          <div className="input-gruop">
            <label>Zona</label>
            <input className="form-control" {...register("zona")} />
          </div>

          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => onCancelar()}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditIglesia;
