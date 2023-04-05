import React, { useEffect, useState } from 'react'
import "./EditProduct.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const navigate = useNavigate()

  const handelAPI = (id) => {
    axios.get(`http://localhost:3030/products/${id}`).then(res => {
      setSingleProduct(res.data)
    })
  }

  const handelInputChange = (e) => {
    const { name, value } = e.target
    const newValue = name === "price" ? Number(value) : name === "rating" ? Number(value) : value;
    setSingleProduct({ ...singleProduct, [name]: newValue })
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:3030/products/${id}`, singleProduct).then(res => {
      alert("Data Update Sucessfully!")
      navigate("/")
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    handelAPI(id)
  }, [])

  return (
    <div className='editProduct-container'>
      <p className='title'>You Can Edit Your Product here...</p>
      <form onSubmit={handelSubmit}>
        <input type="text" name='brand' value={singleProduct.brand} onChange={handelInputChange} />
        <input type="text" name='price' value={singleProduct.price} onChange={handelInputChange} />
        <input type="text" name='rating' value={singleProduct.rating} onChange={handelInputChange} />
        <input type="text" name='thumbnail' value={singleProduct.thumbnail} onChange={handelInputChange} />
        <input type="submit" value="Update Product" />
      </form>
    </div>
  )
}

export default EditProduct