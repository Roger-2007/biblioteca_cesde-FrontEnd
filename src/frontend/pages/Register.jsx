import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  let { register, handleSubmit, formState: { errors } } = useForm()
  let navigate = useNavigate()
  let onSubmit = (data)=>{
    console.log(data);
    navigate("/")
  }
  return (
    <div className='container text-white my-5 col-lg-4 col-12 border rounded p-4'>
      <div className='d-flex justify-content-between align-items-start'>
        <h2>Registrate</h2>
        <Link to={"/"} className='btn btn-warning'>Regresar al inicio</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <label className='form-label'>Nombre de usuario</label>
        <input className='form-control' {...register("nombre", { required: true })} type="text" />
        {errors.nombre && <p className='text-danger'>Debes escribir un nombre de usuario*</p>}
        <label className='form-label'>Correo electronico</label>
        <input className='form-control' {...register("correo", { required: true })} type="email" />
        {errors.correo && <p className='text-danger'>Debes escribir un correo*</p>}
        <label className='form-label'>Contraseña</label>
        <input className='form-control'{...register("contra", { required: true })} type="password" />
        {errors.contra && <p className='text-danger'>Debes escribir una contraseña*</p>}
        <button type='submit' className='btn btn-primary my-4'>Registrarse</button>
      </form>
    </div>
  )
}
