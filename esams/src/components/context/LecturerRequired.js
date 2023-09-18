import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const LecturerRequired = ({children}) => {
    const auth = useAuth();

    if(localStorage.getItem('userRole') !== 'Lecturer' || localStorage.getItem('userRole') === null){
        return <Navigate to='/' />
    }
  return children
}

export default LecturerRequired;