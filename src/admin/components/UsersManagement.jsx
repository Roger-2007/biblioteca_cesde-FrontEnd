import React, { useEffect, useState } from 'react'
import data from "../../assets/data.json"
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

export default function UsersManagement() {
    let { user } = useAuth()
    let  [users,setUsers]  = useState([])

    let getUsers = async () => {
        try {
            let response = await axios.get("http://localhost:8080/usuarios")
            console.log(response.data);
            setUsers(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getUsers()
    },[])

    return (
        <div className='container lh-1'>


            <h4>Gestión de Usuarios</h4>



            <div className="row bg-white rounded-3 border my-3">
                <div className="col-2 ">
                    <p>Usuario</p>
                </div>
                <div className="col-2">
                    <p>Rol</p>
                </div>
                <div className="col-2">
                    <p>Estado</p>
                </div>
                <div className="col-2">
                    <p>Registro</p>
                </div>
                <div className="col-2">
                    <p>Prestamos</p>
                </div>
                <div className="col-2">
                    <p>Acciones</p>
                </div>
            </div>


            {users.map((user, i) => (

                <div key={i} className="row ">
                    <div className="col-2 lh-1">
                        <p className='fw-bold'>{user.nombreUsuario} {user.apellidoUsuario}</p>
                        <p>{user.correoUsuario}</p>
                    </div>
                    <div className="col-2">
                        <p>{user.tipoUsuario}</p>
                    </div>
                    <div className="col-2">
                        {user.usuarioActivo==1?<p>Activo</p>:<p>Inactivo</p>}
                    </div>
                    <div className="col-2">
                        <p>{user.fechaRegistroUsuario}</p>
                    </div>
                    <div className="col-2">
                        <p className=''>{user.prestamos.length}</p>
                    </div>
                    <div className="col-2 d-flex align-items-center gap-2">
                        <button className='btn btn-secondary'><i class="bi bi-pencil-square"></i></button>
                        <button className='btn btn-danger'><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            ))}
        </div>
    )
}
