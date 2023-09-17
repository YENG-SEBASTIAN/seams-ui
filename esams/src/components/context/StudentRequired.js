
import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const StudentRequired = ({children}) => {
    const auth = useAuth();

    if(localStorage.getItem('userRole') !== 'Student' || localStorage.getItem('userRole') === null){
        return <Navigate to='/' />
    }
  return children
}

export default StudentRequired;
