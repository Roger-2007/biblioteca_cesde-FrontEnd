import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Book from '../../frontend/components/book';
import axios from 'axios';
import { BookContext } from '../../context/BookContext';

export default function FormBookActions({ pageBookState, setPageBookState , idLibro}) {
    let { register, handleSubmit, formState: { errors } } = useForm()
    let { autores, categorias } = useContext(BookContext)

    let [createTitulo, setCreateTitulo] = useState("Titulo libro")
    let [createAutor, setCreateAutor] = useState("autor")
    let [createCategoria, setCreateCategoria] = useState("categoria")
    let [createCalificacion, setCreateCalificacion] = useState("0.0")
    let [createImg, setCreateImg] = useState("")

    let libro = {
        tituloLibro: createTitulo,
        autor: createAutor,
        calificacionLibro: createCalificacion,
        categoriaLibro: {
            nombreCategoriaLibro: createCategoria
        },
        /* año:createYear,
        descripcion:createSinposis,
        
        stock:createStock, */
        urlImagenLibro: createImg
    }


    async function createBookData(data) {
        console.log(data);
        try {
            let idAutor = parseInt(data.autor)
            let idCategoria = parseInt(data.categoria)
            let nuevoLibro = {
                "tituloLibro": data.titulo,
                "descripcionLibro": data.sinopsis,
                "yearPublicacionLibro": data.year,
                "urlImagenLibro": data.imagen,
                "stockLibros": parseInt(data.stock),
                "librosDisponibles": parseInt(data.stock),
                "calificacionLibro": parseFloat(data.calificacion),
                "libroActivo": "1",
                "idAutor": idAutor,
                "idCategoriaLibro": idCategoria
            }
            const response = await axios.post("http://localhost:8080/libros", nuevoLibro, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data);
            console.log(nuevoLibro);
            setPageBookState(0)
        } catch (error) {
            console.log(error || error.message);
        }


    }
    async function updateBookData(data) {
        console.log(data);
        console.log("Actualizo baby");
        let idAutor = parseInt(data.autor)
        let idCategoria = parseInt(data.categoria)
        let libroActualizacion = {
            "tituloLibro": data.titulo,
            "descripcionLibro": data.sinopsis,
            "yearPublicacionLibro": parseInt(data.year),
            "urlImagenLibro": data.imagen,
            "stockLibros": parseInt(data.stock),
            "librosDisponibles": parseInt(data.stock),
            "calificacionLibro": parseFloat(data.calificacion),
            "libroActivo": "1",
            "idAutor": idAutor,
            "idCategoriaLibro": idCategoria
        }
        try {
            let response = await axios.put(`http://localhost:8080/libros/${idLibro}`,libroActualizacion)
            console.log(response.data);
            setPageBookState(0)
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <>
            <div className='container lh-1'>
                {pageBookState == 1 ? <h4>Añadir nuevo libro</h4> : <h4>Editar libro</h4>}
                <div className="row">
                    <div className="col-8">
                        <form onSubmit={pageBookState == 1 ? handleSubmit(createBookData) : handleSubmit(updateBookData)}>
                            <label className='form-label'>Titulo</label>
                            <input type="text" className='form-control' {...register("titulo", { required: true })} onChange={(e) => setCreateTitulo(e.target.value)} />

                            <div className='row'>
                                <div className='col-6'>
                                    <label className='form-label'>Año de publicación</label>
                                    <input type="number" className='form-control' min={1500} max={2025} {...register("year", { required: true })} /* onChange={(e) => setCreateYear(e.target.value)} */ />

                                </div>

                                <div className="col-6">
                                    <label className="form-label">Calificacion</label>
                                    <input type="number" min={0.1} max={5} className='form-control' {...register("calificacion", { required: true })} step={0.1} onChange={(e) => setCreateCalificacion(e.target.value)} /></div>

                            </div>
                            <div className='row'>

                                <div className='col-6'>
                                    <label className='form-label'>Autor</label>
                                    <select className='form-control' defaultValue="" {...register("autor", { required: true })}>
                                        <option value="" disabled>Selecciona una opcion</option>
                                        {
                                            autores.map((autor, i) => (
                                                <option key={autor.idAutor} value={autor.idAutor} >{autor.nombreAutor}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.autor && <p className='text-danger'>Este campo es obligatorio</p>}
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>Categoría</label>
                                    <select className='form-control' defaultValue="" onChange={(e) => setCreateCategoria(e.target.value)} {...register("categoria", { required: true })}>
                                        <option value="" disabled>Selecciona una opcion</option>
                                        {
                                            categorias.map((categoria, i) => (
                                                <option key={i} value={categoria.idCategoriaLibro}>{categoria.nombreCategoriaLibro}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <label className='form-label'>Sinopsis</label>
                            <textarea className='form-control' {...register("sinopsis", { required: true })} /* onChange={(e) => setCreateSinopsis(e.target.value)} */></textarea>

                            <label className='form-label'>Stock</label>
                            <input type="number" className='form-control' {...register("stock", { required: true })} /* onChange={(e) => setCreateStock(e.target.value)} */ />
                            <label className='form-label' >Url de imagen</label>
                            <input type="text" className='form-control' {...register("imagen", { required: true })} onChange={(e) => setCreateImg(e.target.value)} />
                            <div className='d-flex justify-content-end gap-3 mt-4'>
                                <button type='button' className='btn btn-secondary' onClick={() => setPageBookState(0)}>Cancelar</button>
                                {pageBookState == 1 ? <button type='submit' className='btn btn-primary'>Crear libro</button> : <button type='submit' className='btn btn-success'>Actualizar libro</button>}
                            </div>

                        </form>

                    </div>
                    <div className="col-4">
                        {/* <Book libro={libro} /> */}
                    </div>
                </div>

            </div>
        </>
    )
}
