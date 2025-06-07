

//import './App.css'

import { Route, Routes } from "react-router-dom"
import HomePage from "./frontend/pages/HomePage"
import { useContext, useEffect, useState } from 'react'
import AdminPanel from './admin/pages/AdminPanel'
import BookInformation from './frontend/pages/BookInformation'
import BooksExplore from './frontend/pages/BooksExplore'
import PublicRoutes from "./components/auth/PublicRoutes"
import PrivateRoutes from "./components/auth/PrivateRoutes"
import RoleRoutes from "./components/auth/RoleRoutes"
import LibrarianPanel from "./admin/pages/LibrarianPanel"
import UserProfile from "./admin/pages/UserProfile"
import AuthProvider, { useAuth } from "./context/AuthContext"
import { BookContext } from "./context/BookContext"
import data from "./assets/data.json"

function App() {
  /* let [isLogin, setisLogin] = useState(localStorage.getItem("isLogin") == false) */

  let { getLibros , getAutores , getCategorias } = useContext(BookContext)
  

  useEffect(() => {
    getLibros()
    getAutores()
    getCategorias()
    
  }, [])


  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoutes />}>

          <Route path="/*" element={<HomePage />} />
          <Route path='/explore' element={<BooksExplore />} />
          <Route path='/explore/:id' element={<BookInformation />} />

        </Route>

        <Route element={<PrivateRoutes />}>
          
          <Route element={<RoleRoutes allowedRoles={["admin"]} />}>
            <Route path="/controlPanel/admin" element={<AdminPanel />} />
          </Route>
          <Route element={<RoleRoutes allowedRoles={["librarian"]} />}>
            <Route path="/controlPanel/librarian" element={<LibrarianPanel />} />
          </Route>
          <Route element={<RoleRoutes allowedRoles={["usuario"]} />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>

        </Route>
      </Routes>
    </AuthProvider>

  )
}

export default App

