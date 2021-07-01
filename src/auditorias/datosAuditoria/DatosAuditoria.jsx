import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import { toast } from "react-toastify";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import SelectAnio from "./SelectAnio";

const DatosAuditoria = ({ history }) => {
  const refFire = useFirestore();

  const [auditorias, setAuditorias] = useState([]);
  const [auditoriaActual, setAuditoriaActual] = useState({});
  const [libMensuales, setLibMensuales] = useState([]);

  useEffect(() => {
    const traerDatos = async () => {
      // Traer auditorias y la actual
      const auditoriasFix = [];
      const auditoriasTemp = await refFire.collection("auditorias").get();
      let auditTemp = {};

      auditoriasTemp.forEach(async (snapshot) => {
        auditTemp = { ...snapshot.data(), id: snapshot.id };
        auditoriasFix.push(auditTemp);

        if (auditTemp.actual === true) {
          setAuditoriaActual(auditTemp);
          // // Traer libros de la auditorias actual
          console.log({ auditTemp });
          const lib_mensualesTemp = await refFire
            .collection("lib_mensuales")
            .where("auditoria_id", "==", auditTemp.id)
            .get();
          let lib_mensuales = [];
          lib_mensualesTemp.forEach((snapMens) =>
            lib_mensuales.push({ ...snapMens.data(), id: snapMens.id })
          );
          setLibMensuales(lib_mensuales);
          console.log({ lib_mensuales });
        }
      });

      setAuditorias(auditoriasFix);
      toast.info("Datos traídos.");
    };

    traerDatos();
  }, [refFire]);

  return (
    <div>
      <CCard>
        <CCardHeader>Datos Auditoria</CCardHeader>
        <CCardBody>
          <div>
            {auditorias &&
              auditorias.map((audit) => {
                return (
                  <button key={audit.id} className="btn btn-primary">
                    {audit.fecha}
                  </button>
                );
              })}
          </div>
        </CCardBody>
      </CCard>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Libros del mes</h5>

          <SelectAnio auditoriaId={auditoriaActual.id} />

          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Nro</th>
                <th>Mes</th>
              </tr>
            </thead>
            <tbody>
              {libMensuales &&
                libMensuales.map((libMensual, index) => {
                  return (
                    <tr key={libMensual.id}>
                      <td>{index + 1}</td>
                      <td>{libMensual.mes}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatosAuditoria;

