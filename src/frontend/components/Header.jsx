import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AuthContext, useAuth } from '../../context/AuthContext'
import axios from 'axios'
/* import dataBase from "../../assets/data.json"
 */


export default function Header({ isLogin, setLogin }) {
  let { login, user } = useAuth()
  let { register: loginRegister, handleSubmit: loginHandleSubmit, formState: { errors: loginErrors }, setError: loginSetError } = useForm()
  let { register: regRegister, handleSubmit: regHandleSubmit, formState: { errors: regErrors } } = useForm()
  
 
  let navigate = useNavigate()

  let onSubmitLogin = async (data) => {

    let loginData = {
      "correoUsuario": data.correo,
      "passwordUsuario": data.contra
    }
    try {
      let response = await axios.post("http://localhost:8080/usuarios/login", loginData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      login(response.data)
      location.reload()
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
    console.log(data);


  }

  let onSubmitRegister = async (data) => {

    let fechaHoy = new Date()
    let nuevoUsuario = {
      "idUsuario": data.id,
      "nombreUsuario": data.nombre,
      "apellidoUsuario": data.apellido,
      "correoUsuario": data.correo,
      "passwordUsuario": data.contra,
      "direccionUsuario": data.direccion,
      "telefonoUsuario": data.celular,
      "tipoUsuario": "usuario",
      "usuarioActivo": "1",
      "fechaRegistroUsuario": fechaHoy.toISOString().split("T")[0]
    }
    try {
      const response = await axios.post("http://localhost:8080/usuarios", nuevoUsuario, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      login(response.data)

    } catch (error) {
      console.log(error.response || error.message);

    }
    /* console.log(data);
    console.log(nuevoUsuario); */
  }

  return (
    <>

      <div className='d-flex w-100 bg-white top-0 z-2 nav justify-content-around py-2 px-5 align-items-center border-bottom position-fixed' id='menuPrincipal'>
        <i className="bi bi-book text-primary fs-5"> <span className='text-dark'>La magia de los libros</span> </i>

        <div className='d-flex decoration-none gap-3 text-decoration-none'>
          <Link to={"/"} className='text-decoration-none text-dark'>Inicio</Link>
          <Link to={"/explore"} className='text-decoration-none text-dark'>Catalogo</Link>
          <Link className='text-decoration-none text-dark'>Sobre Nosotros</Link>
        </div>

        {user ? <Link to={"/profile"} className='btn btn-primary '><i class="bi bi-person-circle"></i></Link> : <div> <button type='button' data-bs-toggle="modal" data-bs-target="#miModal" className='btn btn-primary mx-3'>Iniciar sesion</button> <button type='button' data-bs-toggle="modal" data-bs-target="#registerModal" className='btn btn-success'>Registrarse</button> </div>}




        {/* <div className='d-flex justify-content-between align-items-start'>
                      <h2>INICIA SESION</h2>
                      <Link to={"/"} className='btn btn-warning'>Regresar al inicio</Link>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} >
                      <label className='form-label'>Correo electronico</label>
                      <input className='form-control' {...register("correo", { required: true })} type="email"/>
                      {errors.correo && <p className='text-danger'>Debes escribir un correo*</p>}
                      <label className='form-label'>Contraseña</label>
                      <input className='form-control'{...register("contra", { required: true })} type="password"/>
                      {errors.contra && <p className='text-danger'>Debes escribir una contraseña*</p>}
                      <button type='submit' className='btn btn-primary my-4'>Iniciar sesión</button>
                  </form> */}
      </div>


      {/* Modal Login */}
      <div
        className="modal fade"
        id="miModal"
        tabIndex="-1"
        aria-labelledby="miModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="miModalLabel">Iniciar Sesion</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={loginHandleSubmit(onSubmitLogin)} >
                <label className='form-label'>Correo electronico</label>
                <input className='form-control' {...loginRegister("correo", { required: true })} type="email" />
                {loginErrors.correo && <p className='text-danger'>Debes escribir un correo*</p>}
                <label className='form-label'>Contraseña</label>
                <input className='form-control'{...loginRegister("contra", { required: true })} type="password" />
                {loginErrors.contra && <p className='text-danger'>Debes escribir una contraseña*</p>}
                <div className='d-flex align-items-center justify-content-end gap-3 mt-4'>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type='submit' className='btn btn-primary'>Iniciar sesión</button>
                </div>



              </form>
            </div>

            <div className="border-top d-flex flex-column align-items-center">
              <p className='text-center mt-3 text-gray'>¿No tienes una cuenta?</p>
              <button className='btn btn-success w-25 mb-4' data-bs-toggle="modal" data-bs-target="#registerModal">Registrarse</button>
            </div>

          </div>
        </div>
      </div>


      {/* Modal Register */}

      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="registerModaLabel">Crear una cuenta</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={regHandleSubmit(onSubmitRegister)}>
                <div className="row">
                  <div className="col-6"><label className='form-label'>Nombre</label> <input type="text" className='form-control' placeholder='Ingrese su nombre' {...regRegister("nombre", { required: true })}

                  />{regErrors.nombre && <p className='text-danger'>Debe ingresar su nombre*</p>}</div>
                  <div className="col-6"><label className='form-label'>Apellido</label> <input type="text" className='form-control' placeholder='Ingrese su apellido' {...regRegister("apellido", { required: true })} /> {regErrors.apellido && <p className='text-danger'>Debe ingresar su apellido*</p>}</div>
                </div>
                <label className='form-label'>Correo electronico</label>
                <input className='form-control' placeholder='Ingrese su correo electronico' {...regRegister("correo", { required: true })} type="email" />
                {regErrors.correo && <p className='text-danger'>Debes escribir un correo*</p>}
                <label className='form-label'>Contraseña</label>
                <input className='form-control' placeholder='Ingrese su contraseña' {...regRegister("contra", { required: true })} type="password" />
                {regErrors.contra && <p className='text-danger'>Debes escribir una contraseña*</p>}
                <div className="row">
                  <div className="col-6"><label className='form-label'>Numero de identificacion</label>
                    <input className='form-control' placeholder='Ingrese su numero de identificacion' {...regRegister("id", { required: true })} type="number" />
                    {regErrors.celular && <p className='text-danger'>Debes escribir una id*</p>}</div>
                  <div className="col-6"><label className='form-label'>Numero celular</label>
                    <input className='form-control' placeholder='Ingrese su numero celular' {...regRegister("celular", { required: true })} type="text" />
                    {regErrors.celular && <p className='text-danger'>Debes escribir un numero celular*</p>}</div>
                </div>
                <label className='form-label'>Direccion</label>
                <input className='form-control' placeholder='Ingrese su direccion' {...regRegister("direccion", { required: true })} type="text" />
                {regErrors.direccion && <p className='text-danger'>Debes escribir una direccion*</p>}
                <div className='d-flex align-items-center justify-content-end gap-3'>
                  <button type="button" className="btn btn-secondary w-25" data-bs-dismiss="modal">Cancelar</button>
                  <button type='submit' className='btn btn-primary my-4 w-75'>Crear Cuenta</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

