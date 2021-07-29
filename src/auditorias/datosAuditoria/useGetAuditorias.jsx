import {useState} from 'react'
import {toast} from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { firestoreDB } from '../../firebaseConfig'


const useGetAuditorias = () => {

    const dispatch = useDispatch()


    const getAuditorias = async () => { // Traer auditorias y la actual
        const auditoriasFix = [];
        const auditoriasTemp = await firestoreDB.collection("auditorias").get();
        console.log({auditoriasTemp})
        let auditTemp = {};


        auditoriasTemp.forEach(async (snapshot) => {

            auditTemp = {
                ...snapshot.data(),
                id: snapshot.id
            };
            auditoriasFix.push(auditTemp);

            if (auditTemp.actual === true) {
                dispatch({type: "set", auditoriaActual: auditTemp});
                // Traer libros de la auditorias actual
                console.log({auditTemp});

            }
        });

        dispatch(({type: "set", auditoriasIglesia: auditoriasFix}));
        toast.info("Datos traídos.");
    };


    return getAuditorias
}

export default useGetAuditorias
