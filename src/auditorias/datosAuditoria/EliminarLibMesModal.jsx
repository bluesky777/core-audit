import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from "@coreui/react";

const EliminarLibMesModal = ({showDelModal, setShowDelModal, libMesSeleccionado, deleteLibMes}) => {


    return (<CModal show={showDelModal}
        onClose={setShowDelModal}>
        <CModalHeader closeButton>
            <CModalTitle>Eliminar libro mes</CModalTitle>
        </CModalHeader>
        <CModalBody>
            Desea eliminar mes
        </CModalBody>
        <CModalFooter>
            <CButton color="danger" onClick={() => deleteLibMes(libMesSeleccionado)}>Eliminar</CButton>
            {' '}
            <CButton color="secondary"
                onClick={
                    () => setShowDelModal(false)
            }>Cancelar</CButton>
        </CModalFooter>
    </CModal>)
}

export default EliminarLibMesModal;
