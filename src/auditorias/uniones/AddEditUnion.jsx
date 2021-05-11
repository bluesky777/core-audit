import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestore } from 'reactfire'
import { useEffect } from 'react';
import { toast } from 'react-toastify'


const schema = yup.object().shape({
    nombre: yup.string().required('Es requerido'),
    codigo: yup.string().required('Es requerido'),
    presidente: yup.string(),
    pais: yup.string(),
  });


const AddEdditUnion = ({history, match})=> {
    const { id } = match.params
    const isAddMode = !id;
    const refFire = useFirestore().collection('uniones')

    const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (datos)=> {
        return isAddMode
        ? createUnion(datos)
        : updateUnion(id, datos)
    }

    const createUnion = async (datos)=> {
        console.log(datos)
        await refFire.doc().set(datos)
        toast('Unión creada.')
        history.push('..')
    }

    const updateUnion = async (id, datos)=> {
        await refFire.doc(id).update(datos)
        toast('Unión editada.')
        history.push('..')
    }

    const onCancelar = ()=> {
        history.push('/uniones')
    }


    useEffect(() => {
        const traerDatos = async ()=> {
            const res = await (await refFire.doc(id).get()).data()
            const fields = ['nombre', 'codigo', 'presidente', 'pais']
            fields.forEach(field => setValue(field, res[field]))
        }

        if (!isAddMode)  {
            traerDatos()
        }

    }, [refFire, setValue, isAddMode, id])

    return (
        <div className="card">
        <div className="card-body">
            <h3 className="card-title">Crear unión</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-gruop">
                        <label>Nombre</label>
                        <input className="form-control" {...register('nombre')} />
                        <div className="text-danger">
                            <small>{ errors.nombre?.message}</small>
                        </div>
                    </div>
                    <div className="input-gruop">
                        <label>Código</label>
                        <input className="form-control" {...register('codigo')} />
                        { errors.codigo ? (<div className="text-danger">
                            <small>{errors.codigo.message}</small>
                        </div>)
                        : ''}
                    </div>
                    <div className="input-gruop">
                        <label>Presidente</label>
                        <input className="form-control" {...register('presidente')} />
                    </div>
                    <div className="input-gruop">
                        <label>País</label>
                        <input className="form-control" {...register('pais')} />
                    </div>

                    <div className="text-center mt-3">
                        <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                        <button className="btn btn-primary" type="submit">
                            <i className="cil-save"></i>
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEdditUnion