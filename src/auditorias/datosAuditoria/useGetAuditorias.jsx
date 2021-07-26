import {useState} from 'react'
import {useFirestore} from "reactfire";
import {toast} from "react-toastify";



const useGetAuditorias = () => {


    const [auditorias, setAuditorias] = useState([]);
    const [auditoriaActual, setAuditoriaActual] = useState({});
    const refFire = useFirestore();


    const getAuditorias = async () => { // Traer auditorias y la actual
        const auditoriasFix = [];
        const auditoriasTemp = await refFire.collection("auditorias").get();
        let auditTemp = {};


        auditoriasTemp.forEach(async (snapshot) => {

            auditTemp = {
                ...snapshot.data(),
                id: snapshot.id
            };
            auditoriasFix.push(auditTemp);

            if (auditTemp.actual === true) {
                setAuditoriaActual(auditTemp);
                // // Traer libros de la auditorias actual
                console.log({auditTemp});

            }
        });

        setAuditorias(auditoriasFix);
        toast.info("Datos traídos.");
    };


    return [auditorias, getAuditorias, auditoriaActual]
}

export default useGetAuditorias
