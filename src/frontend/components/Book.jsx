import React from 'react'
import { Link } from 'react-router-dom'

export default function Book({ libro }) {
/*    console.log(libro);
 */    let pathVariable = ""
    
    if (libro.idLibro){
        pathVariable = `/explore/${libro.idLibro}`
    }
    return (

        <div className='card' style={{ "backgroundColor": "rgb(224, 224, 224)" }}>
            <Link to={pathVariable} className='d-flex justify-content-center object-fit-fill'>
                <img className='card-img-top' src={libro.urlImagenLibro} alt="libro" style={{ "width": "100%", "aspectRatio": "1/1.3" }} />
            </Link>
            <div className="card-body bg-white">
                <div className='card-title text-start'><h4>{libro.tituloLibro}</h4>
                    <p className='text-secondary'>{libro.autor.nombreAutor||"Autor"}</p>
                    <div className='d-flex justify-content-between align-items-center'>
                    <i className="bi bi-star text-warning"> <span className='text-dark'>{libro.calificacionLibro}</span></i>
                    {}<p className='text-primary px-2 py-1 rounded-5' style={{backgroundColor:"rgb(188, 222, 245)"}}>{libro.categoriaLibro.nombreCategoriaLibro}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
