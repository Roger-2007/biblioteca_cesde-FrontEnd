import React, { useContext, useState } from 'react'
import Book from '../../frontend/components/book'
import { useForm } from 'react-hook-form'
import { BookContext } from '../../context/BookContext'
import BooksManagement from '../components/BooksManagement'
import { useAuth } from '../../context/AuthContext'
import UsersManagement from '../components/UsersManagement'
import BorrowedBooks from '../components/BorrowedBooks'

export default function LibrarianPanel() {
  
      let { libros } = useContext(BookContext)
      let [adminOption, setAdminOption] = useState(1)
      let {logout} = useAuth()
    
      function logoutAdmin(){
        logout()
      }
    
      return (
        <div className='container mt-5'>
          <div className='d-flex justify-content-between'>
            <h2>Panel de Biliotecario</h2>
            <button className='btn btn-danger' onClick={logoutAdmin}>Cerrar sesión</button>
          </div>
    
          <p className='text-secondary'>Revisa libros, usuarios y préstamos </p>
          <div className="btn-group border">
            
            <button className='btn btn-light' onClick={() => setAdminOption(1)}>Libros</button>
            <button className='btn btn-light' onClick={() => setAdminOption(2)}>Usuarios</button>
            <button className='btn btn-light' onClick={() => setAdminOption(3)}>Prestamos</button>
          </div>
          <div className="container bg-light border rounded-3 mt-5 p-3">
            {adminOption == 1 ? <BooksManagement /> : adminOption==2?<UsersManagement/>:<BorrowedBooks/>}
          </div>
    
    
        </div>
  )
}
