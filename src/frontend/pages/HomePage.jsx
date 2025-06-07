import React, { useContext, useEffect } from 'react'
import Book from '../components/book'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { BookContext } from '../../context/BookContext'

export default function () {
  const { libros } = useContext(BookContext)
  

  return (
    <>
      <Header/>
     
        <div className='row bg-light container-fluid justify-content-center'>
          <div className="col-sm-12 col-md-6 p-5">
            <h1 className='fw-bold my-5' style={{ "fontFamily": "Castoro"}}>Descubre mundos a través de las páginas</h1>
            <h4 className='text-gray' style={{ "fontFamily": "Roboto"}}>Explora nuestra colección de más de 10,000 libros, desde clásicos atemporales hasta las últimas novedades editoriales.</h4>

            <div className='my-3 d-flex flex-md-column flex-lg-row gap-3'>
              <Link to={"/explore"} className='btn btn-lg  btn-primary ' >Explorar Catálogo</Link>
              <Link to={"/explore"} className='btn btn-lg  border-2 btn-light border-secondary'>Conocer más</Link>
            </div>




          </div>
        </div>

    <div className='container-fluid d-flex flex-column align-items-center my-5'>
       <h2>Libros Destacados</h2>
        <div className='container row row-cols-1 row-cols-md-3'>

          {libros.filter((libro)=>libro.libroActivo==1).map((libro, i) => (

            i < 6 && <div key={i} className='col my-3'>
              <Book libro={libro} />
            </div>
          ))}
        </div>


    </div>
    </>

  )
}
