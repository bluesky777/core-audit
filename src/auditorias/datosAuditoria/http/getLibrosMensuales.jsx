import {firestoreDB} from '../../../firebaseConfig'


export default async function getLibrosMensuales(auditoria_id) {
    const lib_mensualesTemp = await firestoreDB.collection('lib_mensuales').where("auditoriaId", "==", auditoria_id).orderBy("fecha").get();

    return lib_mensualesTemp;

}
