import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { BookContext } from '../../context/BookContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function BookInformation() {
  let { id } = useParams()
  const { libros } = useContext(BookContext)
  const {user} = useContext(AuthContext)
  let navigate = useNavigate()
  const libro = libros.find((libro) => libro.idLibro == id);
 
  let reservarLibro = async (data) => {
    if (!user){
      alert("Debes iniciar sesion primero!")
    }else{
    let datosPrestamo = {
      "fechaInicioPrestamo": "",
      "fechaFinPrestamo": "",
      "estadoPrestamo": "por recoger",
      "idUsuario": user.idUsuario,
      "idLibro": libro.idLibro

    }
    try {
       let response = await axios.post("http://localhost:8080/prestamos",datosPrestamo,{
      headers:{
        "Content-Type":"application/json"
      }
    })
    } catch (error) {
      console.log(error);
    }
  }
  }


  return (
    <div>
      <Header />


      <div className="container" style={{ marginTop: "5rem" }}>
        <p> <Link to={"/explore"} className='text-secondary text-decoration-none'>Catalogo {">"}</Link>   {libro.tituloLibro}</p>
        <div className='container bg-light rounded-2 p-5 border'>
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <div className='d-flex justify-content-center'>
                <img className='img-fluid w-75 rounded-2 ' src={libro.urlImagenLibro} alt="libro" />

              </div>
              <p className='text-center my-3'><i className="bi bi-star text-warning" /><i className="bi bi-star text-warning" /><i className="bi bi-star text-warning" /><i className="bi bi-star text-warning" /><i className="bi bi-star text-warning" />
                <span className='fw-bold'> 4.5</span>
              </p>
              <p className='bg-dark text-white p-1 rounded-5 text-center' style={{ width: "fit-content", margin: "0 auto", fontSize: "12px" }}>{libro.categoriaLibro.nombreCategoriaLibro}</p>
              <button className='btn btn-primary w-100 rounded-2 mt-4' onClick={reservarLibro}><i class="bi bi-bookmark"> Reservar libro</i></button>
              <div className='d-flex flex-row mt-3 justify-content-around'>
                <button className='btn btn-white border rounded-2 w-100 '><i class="bi bi-heart"></i> Favorito</button>
                <button className='btn btn-white border rounded-2 w-100'><i class="bi bi-share"></i> Compartir</button>
              </div>
            </div>
            <div className="col-md-12 col-lg-8">
              <div className='border-bottom py-3 lh-1'>
                <h2>{libro.titulo}</h2>
                <p className='text-secondary fs-5'>{libro.autor.nombreAutor}</p>
              </div>
              <div className='border-bottom py-3'>
                <h4>Sinopsis</h4>
                <p className='fs-5 text-secondary'>{libro.descripcionLibro}</p>
              </div>
              <div className='d-flex border-bottom py-3 justify-content-around'>
                <div className='lh-1'>
                  <p className='text-secondary'>Año de publicación</p>
                  <p className='fw-bold'>2007{/* {libro.year} */}</p>
                </div>
                <div className='lh-1'>
                  <p>Disponibilidad</p>
                  {/* {libro.quantity>0?<p className='bg-success rounded'>Disponible</p>:<p className='bg-danger rounded-5 text-center text-white p-1'>Agotado</p>} */}
                  <p className='bg-success rounded-5 text-center text-white p-1'>Disponible</p>
                </div>
              </div>
              <div className='mt-3 bg-white p-3 rounded-2 border'>
                <h5><i class="bi bi-info-circle text-primary"> <span className='text-dark'>Información de préstamo</span> </i></h5>
                <ul className='lh-1'>
                  <li>
                    <p>Período máximo de préstamo: 15 días</p>
                  </li>
                  <li>
                    <p>Posibilidad de renovación: 2 veces</p>
                  </li>
                  <li>
                    <p>Multa por retraso: $1.00 por día</p>
                  </li>
                  <li>
                    <p>Ubicación en biblioteca: Sección Ficción, Estante 11</p>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
