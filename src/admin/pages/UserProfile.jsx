import React, { useState } from 'react'
import Header from '../../frontend/components/Header'
import { useAuth } from '../../context/AuthContext'
import DataProfile from '../components/DataProfile';
import FavoriteBooksUser from '../components/FavoriteBooksUser';
import BorrowedBooks from '../components/BorrowedBooks';

export default function UserProfile() {
  let { user , logout} = useAuth()
  let [profileOption,setProfileOption] = useState(1)
  console.log(user);
  function logoutUser(){
    logout()
  }
  return (
    <>
      <Header />
      <div className='container' style={{ "marginTop": "5rem" }}>
        <h2>Mi perfil</h2>
        <p className='text-secondary'>Gestiona tu información personal y préstamos.</p>
        <div className='d-flex justify-content-between'>
          <div class="btn-group border" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light " onClick={()=>setProfileOption(1)}>Perfil</button>
          <button type="button" class="btn btn-light " onClick={()=>setProfileOption(2)}>Mis prestamos</button>
          <button type="button" class="btn btn-light " onClick={()=>setProfileOption(3)}>Mis favoritos</button>
        </div>
        <div>
          <button className='btn btn-danger' onClick={logoutUser}>Cerrar sesión</button>
        </div>
        </div>
        
        
        <div className="container rounded-4 bg-light rounded-2 border mt-5 p-3">
         {profileOption==1?<DataProfile/>:profileOption==2?<BorrowedBooks/>:profileOption==3?<FavoriteBooksUser/>:""}
         
        </div>
      </div>
    </>

  )
}
