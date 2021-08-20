import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserFromToken } from '../actions/AuthActions'
import {
  TheSidebar,
  TheHeader,
  TheContent,
  TheFooter
} from './index'

const TheLayout = () => {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.AuthReducer)

  useEffect(() => {
    
    dispatch(loadUserFromToken())

  }, [])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
