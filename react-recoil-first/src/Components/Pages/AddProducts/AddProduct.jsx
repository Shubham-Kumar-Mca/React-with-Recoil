import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import "./AddProduct.css";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { initialState } from '../../../Recoil/productRecoil';

// const initialState = {
//     title: "",
//     price: "",
//     rating: "",
//     brand: "",
//     thumbnail: "",
//     errors: {
//         title: "",
//         price: "",
//         rating: "",
//         brand: "",
//         thumbnail: "",
//     }
// }


const AddProduct = () => {
    const Brands = ["Apple", "HP", "Lenovo", "Samsung", "OPPO", "Huawei", "Microsoft Surface", "Infinix", "HP Pavilion", "Impression of Acqua Di Gio", "Royal_Mirage", "Fog Scent Xpressio", "Al Munakh", "Lord - Al-Rehab", "L'Oreal Paris", "Hemani Tea", "Dermive", "ROREC White Rice", "Fair & Clear", "Saaf & Khaas", "Bake Parlor Big", "Baking Food Items", "fauji", "Dry Rose", "Boho Decor", "Flying Wooden", "LED Lights", "luxury palace", "Golden",];
    const [state, setState] = useRecoilState(initialState);

    const handelInputChange = (e) => {
        const { name, value } = e.target
        const newValue = name === "price" ? Number(value) : name === "rating" ? Number(value) : value;
        setState({ ...state, [name]: newValue })
    }

    const InsertNewProduct = (productData) => {
        axios.post("http://localhost:3030/products", productData).then(res => {
            alert("Data Added Sucessfully!")
        }).catch(err => {
            console.log(err);
        })
    }

    const handelSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        let isValid = true;

        if (!state.title) {
            errors.title = "Please Enter the Product Title";
            isValid = false
        }
        if (!state.price) {
            errors.price = "Please Enter the Product Price";
            isValid = false
        }

        if (!state.rating) {
            errors.rating = "Please Enter the Product Rating";
            isValid = false
        }

        if (!state.thumbnail) {
            errors.thumbnail = "Please Enter the Product Image URL";
            isValid = false
        }

        if (!state.brand) {
            errors.brand = "Please Select the Product Brand Name";
            isValid = false
        }

        setState({ ...state, errors })
        if (isValid) {
            const productData = {
                "id": nanoid(),
                "title": state.title,
                "price": state.price,
                "rating": state.rating,
                "brand": state.brand,
                "thumbnail": state.thumbnail
            }
            InsertNewProduct(productData)
            setState({
                title: "",
                price: "",
                rating: "",
                brand: "",
                thumbnail: "",
                errors: {
                    title: "",
                    price: "",
                    rating: "",
                    brand: "",
                    thumbnail: "",
                }
            })
        }

    }
    console.log(state);

    return (
        <div className='Add_Product_Container'>
            <p className='title'>You Can Add Your Product here...</p>
            <form onSubmit={handelSubmit}>
                <div>
                    <input type="text" autoComplete='off' placeholder='Enter the Title' name='title' value={state.title} onChange={handelInputChange} />
                    {state.errors.title && <label htmlFor="">{state.errors.title}</label>}
                </div>
                <div>
                    <input type="text" autoComplete='off' placeholder='Enter the Price' name='price' value={state.price} onChange={handelInputChange} />
                    {state.errors.price && <label htmlFor="">{state.errors.price}</label>}
                </div>
                <div>
                    <input type="number" autoComplete='off' placeholder='Enter the Rating' name='rating' value={state.rating} onChange={handelInputChange} />
                    {state.errors.rating && <label htmlFor="">{state.errors.rating}</label>}
                </div>
                <div>
                    <input type="text" autoComplete='off' placeholder='Enter the Image URL' name='thumbnail' value={state.thumbnail} onChange={handelInputChange} />
                    {state.errors.thumbnail && <label htmlFor="">{state.errors.thumbnail}</label>}
                </div>
                <div>
                    <select name="brand" value={state.brand} onChange={handelInputChange}>
                        <option value="">Select the Brand Name</option>
                        {Brands.map((brand, index) => (
                            <option value={brand} key={index}>{brand}</option>
                        ))}
                    </select>
                    {state.errors.brand && <label htmlFor="">{state.errors.brand}</label>}
                </div>
                <input type="submit" value="Add Product" />
            </form>
        </div>
    )
}

export default AddProduct