import getLibrosMensuales from "./http/getLibrosMensuales";


const useGetLibrosMensuales = (auditoriaActual) => {

    if (!auditoriaActual.id) {
        return [];
    }
    console.log(auditoriaActual.id)
    const getLibros = async () => {

        const lib_mensualesTemp =  await getLibrosMensuales(auditoriaActual.id)
        let lib_mensuales = [];
        lib_mensualesTemp.forEach((snapMens) => lib_mensuales.push({
            ...snapMens.data(),
            id: snapMens.id
        }));
        console.log({lib_mensuales});

        return lib_mensuales;
    };

    return getLibros;

}

export default useGetLibrosMensuales
