import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import EditProduct from './EditProduct/EditProduct'
import AddProduct from './AddProducts/AddProduct'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/editproduct/:id' element={<EditProduct />} />
      </Routes>
    </div>
  )
}

export default AllRoutes