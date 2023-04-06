import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import { useRecoilState, useRecoilValue } from 'recoil'
import { searchFunctionality, searchProduct } from '../../Recoil/productRecoil'

const Navbar = () => {
  const [textSearchFunctionality, setTextSearchFunctionality] = useRecoilState(searchFunctionality);
  const searchProductsData = useRecoilValue(searchProduct);


  const handelClicking = (title) =>{
    setTextSearchFunctionality(title);
  }

  return (
    <div className='Navbar-container'>
      <div className='logoTitle'>
        <Link to="/">CRUD</Link>
      </div>
      <div className='search-container'>
        <div className='SearchBox'>
          <input type="text" placeholder='Search Product By Name' value={textSearchFunctionality} onChange={e => setTextSearchFunctionality(e.target.value)} />
        </div>
        <div className='SearchData' style={{marginTop : searchProductsData.length > 0 ? "1.5rem" : null}}>
          {searchProductsData.length > 0 ? searchProductsData.map((searchProductData, index) => (
            <div key={index} className='singleSearchProductData' onClick={()=>handelClicking(searchProductData.title)}>
              <img src={searchProductData.thumbnail} alt="" width="20px" height="20px"/>
              <p>{searchProductData.title}</p>
            </div>
          )) : null}
        </div>
      </div>
      <div className='addProductBtn'>
        <Link to="/addProduct">Add Products</Link>
      </div>
    </div>
  )
}

export default Navbar