import React, { useCallback, useEffect, useState } from 'react'
import "./Filter.css"
import { useRecoilState, useRecoilValue } from 'recoil';
import { InitialProduct, filterdData } from '../../Recoil/productRecoil';
import { useSearchParams } from 'react-router-dom';

const Filter = () => {
  const allBrand = ["Apple", "Samsung", "OPPO", "Huawei", "Microsoft Surface", "Infinix", "HP Pavilion", "Impression of Acqua Di Gio", "Royal_Mirage", "Fog Scent Xpressio", "Al Munakh", "Lord - Al-Rehab", "L'Oreal Paris", "Hemani Tea", "Dermive", "ROREC White Rice", "Fair & Clear", "Saaf & Khaas", "Bake Parlor Big", "Baking Food Items", "fauji", "Dry Rose", "Boho Decor", "Flying Wooden", "LED Lights", "luxury palace", "Golden",];
  const products = useRecoilValue(InitialProduct);
  const [productData, setproductsData] = useRecoilState(filterdData);
  const [serachParams, setSearchParams] = useSearchParams();
  const initialBrand = serachParams.getAll("brand");
  const initialPrice = serachParams.get("price");
  const [price, setPrice] = useState(initialPrice || "all");
  const [brand, setBrand] = useState(initialBrand || []);


  const sortByPrice = useCallback(() => {
   
    const filterByPrice = products.filter((product) => {
      if (price === "under500") {
        return product.price < 500;
      } else if (price === "between500to1000") {
        return product.price >= 500 && product.price <= 1000;
      } else if (price === "over1000") {
        return product.price > 1000;
      }else{
        return product
      }
    })

    setproductsData(filterByPrice);
  }, [price, products, setproductsData]);


  const handelInputChange = (e) => {
    const newBrand = [...brand];
    if (newBrand.includes(e.target.value)) {
      newBrand.splice(newBrand.indexOf(e.target.value), 1);
    } else {
      newBrand.push(e.target.value);
    }
    setBrand(newBrand);
  }

  const filterByCheckBox = () =>{
    if(brand.length === 0){
      setproductsData(productData)
    }
    setproductsData(products.filter(product=>brand.includes(product.brand)))
  }


  useEffect(() => {
    sortByPrice();
  }, [price, sortByPrice]);

  useEffect(() => {
    const params = {};
    params.brand = brand;
    price && (params.price = price);
    setSearchParams(params)
  }, [brand, price, setSearchParams])

  useEffect(()=>{
    filterByCheckBox()
  },[brand])


  return (
    <div className='filter-container'>
      <div className='price-container'>
        <h3>&#128073; Price</h3>
        <div className='price-section'>
          <div>
            <input type="radio" name="byProductPrice" id='all' checked={price === "all"} value="all" onChange={() => setPrice("all")} />
            <label htmlFor="all">All</label>
          </div>

          <div>
            <input type="radio" name="byProductPrice" id='unsder500' checked={price === "under500"} value="under500" onChange={() => setPrice("under500")} />
            <label htmlFor="unsder500">Under 500</label>
          </div>

          <div>
            <input type="radio" name="byProductPrice" id='500To1000' checked={price === "between500to1000"} value="between500to1000" onChange={() => setPrice("between500to1000")} />
            <label htmlFor="500To1000">500 - 1000</label>
          </div>

          <div>
            <input type="radio" name="byProductPrice" id='over1000' checked={price === "over1000"} value="over1000" onChange={() => setPrice("over1000")} />
            <label htmlFor="over1000">Over 1000</label>
          </div>
        </div>
      </div>

      <div className='brand-container'>
        <h3>&#128073; Brand</h3>
        <div className='brand-section'>
          {allBrand && allBrand.map((ele, index) => (
            <div className='singleBrand' key={index}>
              <input type='checkbox' id={ele} checked={brand.includes(ele)} value={ele} onChange={handelInputChange} />
              <label htmlFor={ele}>{ele}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filter