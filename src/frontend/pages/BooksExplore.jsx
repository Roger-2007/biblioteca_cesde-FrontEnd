import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { BookContext } from '../../context/BookContext'
import Book from '../components/book'

export default function BooksExplore() {
  let { libros, categorias } = useContext(BookContext)
  let [librosMostrar, setLibrosMostrar] = useState(libros)
  let [searchBooks, setSearchBooks] = useState("")
  let [searchBooksCategories, setSearchBooksCategories] = useState(null)
  let [results, setResults] = useState([])


  let librosMostrarfunc = () => {
    if (searchBooksCategories != "0") {
      console.log(searchBooksCategories);
      let librosPorCategorias = libros.filter((libro) => (libro.categoriaLibro.idCategoriaLibro == (searchBooksCategories)))
      setLibrosMostrar(librosPorCategorias)
      console.log(librosMostrar);
    }
    else {
      setLibrosMostrar([])

    }
  }

  let inputChange = (e) => {
/*     console.log(e.target.value);
 */    setSearchBooks(e.target.value)
    const filtrados = libros.filter((libro) =>
      libro.tituloLibro.toLowerCase().includes(e.target.value.toLowerCase())

    );
    setResults(filtrados)

  }
  /* useEffect(() => {
    console.log("Buscando:", results);
  }, [searchBooks]); */


  return (
    <div>
      <Header />


      <div className='container mt-5'>


        <h2 className='mb-3 mt-5 fw-bold'>Catálogo de libros</h2>
        <p>{results.length || libros.length} libros encontrados</p>
        <div className='row'>
          <div className='col-sm-12 col-md-4'>
            <input type="text" name="" id="" placeholder={`Buscar libro...`} onChange={inputChange} className='form-control bg-light ' />
          </div>
          <div className='col-sm-12 col-md-8 justify-content-sm-center mt-sm-3 mt-md-0 justify-content-md-end d-flex gap-3'>
            <select className='form-select w-auto' defaultValue={"0"} onChange={(e) => { setSearchBooksCategories(e.target.value); librosMostrarfunc() }}>
              <option value="" disabled>Selecciona una opcion</option>
              <option value="0">Todas las categorias</option>
              {categorias.map((categoria, i) => (
                <option key={categoria.idCategoriaLibro} value={categoria.idCategoriaLibro}>{categoria.nombreCategoriaLibro}</option>
              ))}
            </select>
            <select className='form-select w-auto' name="cat" id="o">
              <option value="1">Relevancia</option>
            </select>
          </div>
        </div>

        <div className='container-fluid d-flex flex-column align-items-center'>
          <div className='row justify-content-center' style={{ "width": "90%" }}>
            {results.length == 0 && searchBooks.length == 0 ? libros.map((libro, i) => (
              <div key={i} className='col-sm-12 col-md-6 col-lg-3 my-3'>
                <Book libro={libro} />

              </div>
            )) : results.length == 0 && searchBooks.length != 0 ? <h2 className='text-center mt-5 col-12'>No se pudo encontrar el libro: {searchBooks}</h2> : results.map((libro, i) => (
              <div key={i} className='col-sm-12 col-md-6 col-lg-3'>
                <Book libro={libro} />

              </div>))}


          </div>
        </div>
      </div>



    </div>
  )
}
