import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CFormText,
  CFormGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useState } from 'react'
import { AuthService } from '../services/AuthService'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';



const schema = yup.object().shape({
  username: yup.string().required('Es requerido'),
  password: yup.string().required('Es requerido').min(3, 'Su contraseña debe tener al menos 3 caracteres'),
});

const Login = () => {

  const [valores, setValores] = useState({})
  
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  })


  const _onSubmit = (datos) => {
    console.log(datos)
    AuthService.login(datos)
  }
  


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(_onSubmit)}>
                    <h1>Login</h1>

                    <p className="text-muted">Sign In to your account</p>
                    <CFormGroup>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" {...register('username')} autoComplete="username" />
                      </CInputGroup>
                      <CFormText color="danger" className="help-block">{ errors.username?.message}</CFormText>
                    </CFormGroup>
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" {...register('password')} autoComplete="current-password" />
                    </CInputGroup>
                    <CFormText color="danger" className="text-danger help-block">{ errors.password?.message}</CFormText>
                    <CRow className="mt-4">
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
