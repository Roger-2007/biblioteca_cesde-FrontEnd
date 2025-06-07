import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function DataProfile() {
  let { user } = useAuth()
    return (
    <>
     <div className="row">
            <div className="col-sm-12 col-md-4">
              <div className='border-bottom'>
                <img className='img-fluid w-50' src={"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} alt="profile" />
                <h4>{user.nombreUsuario} {user.apellidoUsuario}</h4>
                <p className='text-secondary'>{user.correoUsuario}</p>
              </div>
              <div className='mt-3'>
                <div className='d-flex justify-content-between'>
                  <p>Préstamos activos</p>
                  <p className='fw-bold'>2</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Libros favoritos</p>
                  <p className='fw-bold'>2</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Historial de préstamos</p>
                  <p className='fw-bold'>2</p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-8 p-3">
              <div className='d-flex justify-content-between'>
                <h4>Información Personal</h4>
                <button className='btn btn-primary'><i class="bi bi-pencil-square"> Editar</i></button>
              </div>

              <div>
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-6"><label className='text-secondary'>Nombre</label> <p className='fs-5'>{user.nombreUsuario}</p></div>
                    <div className="col-6"><label className='text-secondary'>Apellido</label> <p className='fs-5'>{user.apellidoUsuario}</p></div>
                  </div>
                  <div className="row">
                    <div className="col-6"><label className='text-secondary'>Email</label> <p className='fs-5'>{user.correoUsuario}</p></div>
                    <div className="col-6"><label className='text-secondary'>Telefono</label> <p className='fs-5'>{user.telefonoUsuario}</p></div>
                  </div>
                  <div className="row">
                    <div className="col-12"><label className='text-secondary'>Dirección</label><p className="fs-5">{user.direccionUsuario}</p></div>
                  </div>


                </div>



              </div>

            </div>
          </div>
    </>
  )
}
