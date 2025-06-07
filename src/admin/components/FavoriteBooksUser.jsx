import React, { useContext } from 'react'
import { BookContext } from '../../context/BookContext'
import Book from '../../frontend/components/book'

export default function FavoriteBooksUser() {
    let {libros} = useContext(BookContext)
    return (
    <div className='container'>
        <h4>Mis libros favoritos</h4>
        <div className="row">
            {libros.map((libro,i)=>(
                <div key={i} className='col-sm-12 col-md-4 col-lg-3 my-3 position-relative'>
                    <button className='btn btn-danger  position-absolute z-1 top-0'>
                    <i class="bi bi-heartbreak fs-4"></i>

                    </button>
                    <Book libro={libro}/>
                </div>
            ))}
        </div>
    </div>
  )
}
