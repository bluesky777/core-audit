import { CContainer, CRow, CCol, CCardGroup, CCard, CCardBody } from "@coreui/react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { attempLogout } from "../actions/AuthActions";


const Logout = () => {
    const dispatch = useDispatch();
    const loggedOut = useSelector(state => state.AuthReducer.loggedOut);
    const history = useHistory();

    useEffect(() => {
        console.log('saliendoo', {loggedOut});
        if(loggedOut) history.push("/login");
        dispatch(attempLogout())
        
    }, [dispatch, loggedOut, history]);
  
  
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    Saliendo...
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Logout;