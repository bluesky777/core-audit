import getLibrosMensuales from "./http/getLibrosMensuales";
import { useDispatch } from 'react-redux'


const useGetLibrosMensuales = (auditoriaActual) => {

    const dispatch = useDispatch()
    // console.log({auditoriaActual})
    // if (!auditoriaActual || !auditoriaActual.id) {
    //     return [];
    // }
    // console.log({auditoriaActual})
    const getLibros = async () => {

        const lib_mensualesTemp =  await getLibrosMensuales(auditoriaActual.id)
        let libMensuales = [];
        lib_mensualesTemp.forEach((snapMens) => libMensuales.push({
            ...snapMens.data(),
            id: snapMens.id
        }));
        dispatch({type: 'set', libMensuales});
    };

    return getLibros;

}

export default useGetLibrosMensuales
