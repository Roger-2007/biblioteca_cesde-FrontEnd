import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Aside() {
  
    let navigate = useNavigate()
    return (
    <div className='d-flex flex-column bg-light align-items-center p-3 z-1' style={{"width":"fit-content","height":"100dvh"}}>
        <h4 className='my-5 text-primary'>DASHBOARD</h4>
     
        <ul className=''>
            <li><Link style={{"textDecoration":"none","color":"black"}}>Administrar libros</Link></li>
            <li><Link style={{"textDecoration":"none","color":"black"}}>Administrar usuarios</Link></li>
            <li><Link style={{"textDecoration":"none","color":"black"}}>Administrar prestamos</Link></li>
            <li><Link style={{"textDecoration":"none","color":"black"}}>Editar perfil de administrador</Link></li>
        </ul>
        <button className='btn btn-warning position-absolute bottom-0' onClick={()=>{localStorage.setItem("isLogin",false); navigate("/") }}>Cerrar Sesion</button>
    </div>
  )
}
