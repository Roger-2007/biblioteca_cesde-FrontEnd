import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../../context/BookContext'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

export default function BorrowedBooks() {
    let { libros , getLibros } = useContext(BookContext)
    let { user } = useAuth()
    let [prestamos, setPrestamos] = useState([])
    let [cambiarEstado, setCambiarEstado] = useState(false)

    let getPrestamos = async () => {
        try {
            let response = await axios.get("http://localhost:8080/prestamos")
            console.log(response.data);
            setPrestamos(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    let cambiarEstadoPrestamo = async (idPrestamo, estadoPrestamo, retornarLibro) => {
        let datosCambiar = {
            "fechaInicioPrestamo": "",
            "fechaFinPrestamo": "",
            "estadoPrestamo": estadoPrestamo,
            "retornarLibro": retornarLibro
        }
        
        try {
            let response = await axios.put(`http://localhost:8080/prestamos/estado/${idPrestamo}`, datosCambiar, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data);
            getPrestamos()
            getLibros()
            setCambiarEstado(false)
        }
        catch (error) {
            console.log(error);
            console.log(idPrestamo);
            
        }
    }


    useEffect(() => {
        getPrestamos()
    }, [])

    return (
        <div className='container'>
            <h4>Gestor de prestamos</h4>
            <div className="row g-3 bg-white rounded-3 border my-3">
                
                 
                    <><div className="col">
                        <p>Libro</p>
                    </div>
                        <div className="col">
                            <p>Usuario</p>
                        </div>
                        <div className="col">
                            <p>Fecha Prestamo</p>
                        </div>
                        <div className="col">
                            <p>Fecha Devolución</p>
                        </div>
                        <div className="col">
                            <p>Estado</p>
                        </div>
                        {user.tipoUsuario=="librarian"&&<div className="col">
                            <p>Acciones</p>
                        </div>}</>
            </div>
            {prestamos.map((prestamo, i) => (
                    <div key={i} className="row">
                        <div className="col">
                            <p>{prestamo.libro.tituloLibro}</p>
                        </div>
                        <div className="col">
                            <p className='fw-bold'>{prestamo.usuario.nombreUsuario} {prestamo.usuario.apellidoUsuario}</p>
                            <p>{prestamo.usuario.correoUsuario}</p>
                        </div>
                        <div className="col">
                            <p>{prestamo.fechaInicioPrestamo}</p>
                        </div>
                        <div className="col">
                            <p>{prestamo.fechaFinPrestamo}</p>
                        </div>
                        <div className="col d-flex  gap-2 align-items-center">
                            {cambiarEstado ? <div>{prestamo.estadoPrestamo == "activo" && <div><button>Entregado</button><button>No entregado</button></div>}{prestamo.estadoPrestamo == "por recoger" && <div className='d-flex flex-column gap-2'><button onClick={() => cambiarEstadoPrestamo(prestamo.idPrestamo, "activo", false)} className='btn btn-success text-center w-100'>Recogido</button><button className='btn btn-danger text-center w-100' onClick={() => cambiarEstadoPrestamo(prestamo.idPrestamo, "Finalizado", true)}>Cancelar prestamo</button></div>}</div> : <p className='bg-success rounded-5 text-white p-2' style={{ width: "fit-content" }}>{prestamo.estadoPrestamo}</p>}

                        </div>
                        {user.tipoUsuario=="librarian"&&<div className="col">
                            {!cambiarEstado && prestamo.estadoPrestamo != "Finalizado" ? <button className='btn btn-secondary' onClick={() => setCambiarEstado(true)}>Cambiar estado</button> : cambiarEstado && prestamo.estadoPrestamo != "Finalizado" ?
                                <button className='btn btn-danger' onClick={() => setCambiarEstado(false)}>Cancelar</button> : ""}
                        </div>}
                    </div>))}
        </div>
    )
}
