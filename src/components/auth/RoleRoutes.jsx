import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';

export default function RoleRoutes({ allowedRoles }) {
    let {user , loading} = useAuth();
    
    if (loading) {
        return <LoadingSpinner/>
    }
    if (!user) {
        return <Navigate to={"/"} replace />
    }

    if (!allowedRoles.includes(user.tipoUsuario)) {
        return <Navigate to={"/"} replace />

    }
    return <Outlet/>
}
