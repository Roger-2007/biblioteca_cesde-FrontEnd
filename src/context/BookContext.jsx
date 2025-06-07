import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'

export const BookContext = createContext()
export default function BookProvider({ children }) {
  let [libros, setLibros] = useState([])
  let [autores, setAutores] = useState([])
  let [categorias, setCategorias] = useState([])

  let getLibros = async () => {
    try {
      let response = await axios.get("http://localhost:8080/libros")
      setLibros(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  let getAutores = async () => {
    try {
      let response = await axios.get("http://localhost:8080/autor")
      setAutores(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  let getCategorias = async () => {
    try {
      let response = await axios.get("http://localhost:8080/categorias")
      setCategorias(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BookContext.Provider value={{ libros, getLibros, autores, getAutores, categorias, getCategorias }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBook() {
  return useContext(BookContext)
}
