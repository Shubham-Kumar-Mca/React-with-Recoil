import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import "./AddProduct.css";
import axios from 'axios';

const initialState = {
    "id": nanoid(),
    "title": "",
    "price": "",
    "rating": "",
    "brand": "",
    "thumbnail": "",
}

const AddProduct = () => {
    const Brands = ["Apple", "Samsung", "OPPO", "Huawei", "Microsoft Surface", "Infinix", "HP Pavilion", "Impression of Acqua Di Gio", "Royal_Mirage", "Fog Scent Xpressio", "Al Munakh", "Lord - Al-Rehab", "L'Oreal Paris", "Hemani Tea", "Dermive", "ROREC White Rice", "Fair & Clear", "Saaf & Khaas", "Bake Parlor Big", "Baking Food Items", "fauji", "Dry Rose", "Boho Decor", "Flying Wooden", "LED Lights", "luxury palace", "Golden",];   
    const [state, setState] = useState(initialState);

    const handelInputChange = (e) =>{
        const {name, value} = e.target
        const newValue = name === "price" ? Number(value) : name === "rating" ? Number(value) : value;
        setState({...state, [name] : newValue})
    }

    const InsertNewProduct = () =>{
        axios.post("http://localhost:3030/products", state).then(res=>{
            alert("Data Added Sucessfully!")
        }).catch(err=>{
            console.log(err);
        })
    }

    const handelSubmit = (e) =>{
        e.preventDefault();
        InsertNewProduct()
        setState(initialState)
    }

    return (
        <div className='Add_Product_Container'>
            <p className='title'>You Can Add Your Product here...</p>
            <form onSubmit={handelSubmit}>
                <div>
                    <input type="text" autoComplete='off' placeholder='Enter the Title' name='title' value={state.title} onChange = {handelInputChange}/>
                    {/* <label htmlFor="">Enter Something</label> */}
                </div>
                <div>
                    <input type="text" autoComplete='off' placeholder='Enter the Price' name='price' value={state.price} onChange = {handelInputChange}/>
                    {/* <label htmlFor="">Enter Something</label> */}
                </div>
                <div>
                    <input type="number" autoComplete='off' placeholder='Enter the Rating' name='rating' value={state.rating} onChange = {handelInputChange}/>
                    {/* <label htmlFor="">Enter Something</label> */}
                </div>
                <div>
                    <input type="text" autoComplete='off' placeholder='Enter the Image URL' name='thumbnail' value={state.thumbnail} onChange = {handelInputChange}/>
                    {/* <label htmlFor="">Enter Something</label> */}
                </div>
                <div>
                    <select name="brand" value={state.brand} onChange = {handelInputChange}>
                        <option value="">Select the Brand Name</option>
                        {Brands.map((brand, index) => (
                            <option value={brand} key={index}>{brand}</option>
                        ))}
                    </select>
                    {/* <label htmlFor="">Enter Something</label> */}
                </div>
                <input type="submit" value="Add Product" />
            </form>
        </div>
    )
}

export default AddProduct