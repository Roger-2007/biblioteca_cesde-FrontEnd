import React from 'react'
import { Navigate , Outlet, redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';

export default function PublicRoutes() {
 let {user , loading} = useAuth();

 if (loading){
    return <LoadingSpinner/>
 }

 if (user){
    let redirectPath = user.tipoUsuario == "admin"? "/controlPanel/admin": user.tipoUsuario=="librarian" ? "/controlPanel/librarian": "/"
    if (user.tipoUsuario =="admin"||user.tipoUsuario=="librarian"){
    return <Navigate to={redirectPath} replace/>}
    else{
      return <Outlet/>
    }
 }
 
    return <Outlet/>
    
  
}
