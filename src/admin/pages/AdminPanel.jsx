import React, { useContext, useState } from 'react'
import Book from '../../frontend/components/book'
import { useForm } from 'react-hook-form'
import { BookContext } from '../../context/BookContext'
import BooksManagement from '../components/BooksManagement'
import { useAuth } from '../../context/AuthContext'
import UsersManagement from '../components/UsersManagement'
import BorrowedBooks from '../components/BorrowedBooks'
import saveAs from 'file-saver'
import axios from 'axios'

export default function ControlPanelBooks() {
  let { libros } = useContext(BookContext)
  let [adminOption, setAdminOption] = useState(1)
  let { logout } = useAuth()

  function logoutAdmin() {
    logout()
  }

  let descargarCSV = async () => {
    try {

      let response = await axios.get("http://localhost:8080/prestamos/csv", {
        responseType: "blob"
      })
      const blob = new Blob([response.data], { type: "text/csv" });
      saveAs(blob, "datosPrestamos.csv")
      console.log(response);

    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between'>
        <h2>Panel de Administración</h2>
        <div className='d-flex align-items-center gap-2'>
          <button className='btn btn-primary' onClick={descargarCSV}>Descargar CSV</button>
          <button className='btn btn-danger' onClick={logoutAdmin}>Cerrar sesión</button>
        </div>
      </div>

      <p className='text-secondary'>Gestiona libros, usuarios, préstamos y más.</p>
      <div className="btn-group border">
        <button className='btn btn-light' onClick={() => setAdminOption(1)}>Resumen</button>
        <button className='btn btn-light' onClick={() => setAdminOption(2)}>Libros</button>
        <button className='btn btn-light' onClick={() => setAdminOption(3)}>Usuarios</button>
        <button className='btn btn-light' onClick={() => setAdminOption(4)}>Prestamos</button>
      </div>
      <div className="container bg-light border rounded-3 mt-5 p-3">
        {adminOption == 2 ? <BooksManagement /> : adminOption == 3 ? <UsersManagement /> : adminOption == 4 ? <BorrowedBooks /> : ""}
      </div>


    </div>
  )
}
