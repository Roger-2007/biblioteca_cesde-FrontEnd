import React, { useContext, useState } from 'react'
import { BookContext } from '../../context/BookContext'
import Book from '../../frontend/components/book'
import { useForm } from 'react-hook-form'
import FormBookActions from './FormBookActions'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'




export default function BooksManagement() {
    let { libros, getLibros } = useContext(BookContext)
    let [pageBookState, setPageBookState] = useState(0)
    let [idLibro, setIdLibro] = useState(null)
    let { user } = useAuth()

    let cambiarEstadoLibroFunc = async (idLibro,estadoLibro) => {
        
        try {
            let response = await axios.put(`http://localhost:8080/libros/estado/${idLibro}`, estadoLibro, { headers: { "Content-Type": "application/json" } })
            console.log(response.data);
            getLibros()
        } catch (error) {
            console.log(error);
        }
    }
   

    return (
        <>
            {pageBookState == 0 ? <div className='container lh-1'>

                <div className='d-flex justify-content-between'>
                    <h4>Gestión de libros</h4>
                    {user.tipoUsuario == "admin" && <button className='btn btn-primary' onClick={() => setPageBookState(1)}><i className="bi bi-plus-lg"> Añadir libro</i></button>}
                </div>
                
                    <div className="row g-3 bg-white rounded-3 border my-3">
                        <div className="col">
                            <p>Titulo</p>
                        </div>
                            <div className="col ">
                                <p className='text-start'>Autor</p>
                            </div>
                            <div className="col">
                                <p>Categoria</p>
                            </div>
                            <div className="col">
                                <p>Estado</p>
                            </div>
                            <div className="col">
                                <p>Disponibles</p>
                            </div>
                            {user.tipoUsuario == "admin" && <div className="col">
                                <p>Acciones</p>
                            </div>}
                    </div>
                



                {libros.map((libro, i) => (
                    <div key={i} className="row">
                        <div className="col">
                            <p>{libro.tituloLibro}</p>
                        </div>
                        <div className="col">
                            <p>{libro.autor.nombreAutor}</p>
                        </div>
                        <div className="col">
                            <p>{libro.categoriaLibro.nombreCategoriaLibro}</p>
                        </div>
                        <div className="col justify-content-center">
                            {libro.libroActivo == 0 ? <p className='bg-danger text-white rounded-5 text-center p-2' style={{ width: "fit-content" }}>Inactivo</p> : <p className='bg-success text-white rounded-5 text-center p-2' style={{ width: "fit-content" }}>Activo</p>}
                        </div>
                        <div className="col">
                            <p className='bg-success rounded-5 text-white p-2' style={{ width: "fit-content" }}>{libro.librosDisponibles}/{libro.stockLibros}</p>
                        </div>
                        {user.tipoUsuario == "admin" && <div className="col-2 d-flex align-items-center gap-2">
                            <button className='btn btn-secondary' onClick={() => { setPageBookState(2); setIdLibro(libro.idLibro) }}><i class="bi bi-pencil-square"></i></button>
                            {libro.libroActivo == 1 ? <button className='btn btn-danger' onClick={() => { cambiarEstadoLibroFunc(libro.idLibro,"0") }}><i class="bi bi-trash"></i></button> : <button className='btn btn-success' onClick={() => { cambiarEstadoLibroFunc(libro.idLibro,"1") }}><i class="bi bi-check2-circle"></i></button>}
                        </div>}
                    </div>
                ))}
            </div> : <FormBookActions setPageBookState={setPageBookState} pageBookState={pageBookState} idLibro={idLibro} />}

        </>

    )
}

{/* <div className='container lh-1'>

                <div className='d-flex justify-content-between'>
                    <h4>Gestión de libros</h4>
                    <button className='btn btn-primary' onClick={()=>setCreateBookState(true)}><i class="bi bi-plus-lg"> Añadir libro</i></button>
                </div>

                <div className="row bg-white rounded-3 border my-3">
                    <div className="col-2 ">
                        <p>Titulo</p>
                    </div>
                    <div className="col-2">
                        <p>Autor</p>
                    </div>
                    <div className="col-2">
                        <p>Categoria</p>
                    </div>
                    <div className="col-2">
                        <p>Año</p>
                    </div>
                    <div className="col-2">
                        <p>Disponibles</p>
                    </div>
                    <div className="col-2">
                        <p>Acciones</p>
                    </div>
                </div>


                {libros.map((libro, i) => (
                    <div key={i} className="row ">
                        <div className="col-2 ">
                            <p>{libro.titulo}</p>
                        </div>
                        <div className="col-2">
                            <p>Autor</p>
                        </div>
                        <div className="col-2">
                            <p>Terror</p>
                        </div>
                        <div className="col-2">
                            <p>2019</p>
                        </div>
                        <div className="col-2">
                            <p className='bg-success rounded-5 text-white p-2' style={{ width: "fit-content" }}>2/3</p>
                        </div>
                        <div className="col-2 d-flex align-items-center gap-2">
                            <button className='btn btn-secondary'><i class="bi bi-pencil-square"></i></button>
                            <button className='btn btn-danger'><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                ))}
            </div> */}


/* let [createYear,setCreateYear] = useState("")
let [createSinposis,setCreateSinopsis] = useState("")
let [createCategoria,setCreateCategoria] = useState("")
let [createStock,setCreateStock] = useState() */