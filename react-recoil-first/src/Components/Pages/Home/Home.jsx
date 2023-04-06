import React, { useEffect } from 'react'
import axios from 'axios';
import "./Home.css"
import SingleProduct from '../../SingleProduct/SingleProduct';
import Filter from '../../Filtering/Filter';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InitialProduct, filterByPrice, searchProduct } from '../../../Recoil/productRecoil';
import { useLocation, useSearchParams } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useRecoilState(InitialProduct);
    const filteredByPriceData = useRecoilValue(filterByPrice);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const searchProductsData = useRecoilValue(searchProduct);


    const handelApi = () => {
        axios.get("http://localhost:3030/products", {
            params: {
                brand: searchParams.getAll("brand"),
            }
        }).then(res => {
            setProducts(res.data)
        });
    }


    const handelDeleteProduct = (id) => {
        axios.delete(`http://localhost:3030/products/${id}`).then(res => {
            handelApi();
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (location || products.length === 0) {
            handelApi()
        }
    }, [products.length, location]);

    return (
        <div className='container'>
            <div className='filtering-section'>
                <h2>Filter By</h2>
                <Filter />
            </div>
            <div className='All-Product-show'>
                {filteredByPriceData.length === 0  ? <>{products?.map((product, index) => (
                    <SingleProduct key={index} {...product} handelDeleteProduct={handelDeleteProduct} />
                ))}</> : searchProductsData.length > 0 ?<>{searchProductsData.map((searchProductData, index)=>(
                    <SingleProduct key={index} {...searchProductData} handelDeleteProduct={handelDeleteProduct}/>
                ))}</> :<>{filteredByPriceData?.map((product, index) => (
                    <SingleProduct key={index} {...product} handelDeleteProduct={handelDeleteProduct} />
                ))}</>}
            </div>
        </div>
    )
}

export default Home