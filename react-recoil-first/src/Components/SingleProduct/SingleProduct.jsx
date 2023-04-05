import React from 'react';
import { Link } from 'react-router-dom';
import "./singleProduct.css";


const SingleProduct = ({thumbnail, title, rating, price, id, handelDeleteProduct}) => {

    return (
        <div className='singleProduct'>
            <img src={thumbnail} alt={`${title}_images`} />
            <h4>{title}</h4>
            <p>Rating : {rating}</p>
            <p>Price : ₹{price}</p>
            <div className='SingProduct-Btn-section'>
                <Link to={`/editproduct/${id}`}>Edit</Link>
                <button onClick={()=>handelDeleteProduct(id)}>Delete</button>
            </div>
        </div>
    )
}

export default SingleProduct