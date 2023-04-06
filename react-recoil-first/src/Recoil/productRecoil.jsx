import { atom, selector } from "recoil";

/* Products Start */
export const InitialProduct = atom({
    key: "initialProduct",
    default: []
});

/* Products End */

/* Searching With Title Start*/
export const searchFunctionality = atom({
    key : "searchFunctionality",
    default : ""
});

export const searchProduct = selector({
    key : "searchProduct",
    get : ({get})=>{
        const textSearchFunctionality = get(searchFunctionality);
        const productsData = get(InitialProduct);
        if(textSearchFunctionality === ""){
            return []
        }else{
            const filterdProductData = productsData.filter(product=>product.title.toLowerCase().includes(textSearchFunctionality.toLowerCase()));
            return filterdProductData;
        }
    }
});

/* Searching With Title End*/

/* Filter Data With Price Start */
export const productPrice = atom({
    key : "initialPrice",
    default : "all"
})

export const filterByPrice = selector({
    key : "filterByPrice",
    get : ({get}) =>{
        const price  = get(productPrice);
        const products = get(InitialProduct)
        
        const ProductFilterByPrice = products.filter((product)=>{
            switch (price) {
                case "under500":
                    return product.price < 500;
                case "between500to1000":
                    return product.price >= 500 && product.price <= 1000;
                case "over1000":
                    return product.price > 1000;
                default :
                    return product
            }
        })
        return ProductFilterByPrice
    }
})

/* Filter Data With Price End */



/* Filter Data With Brand Start */
export const productBrand = atom({
    key : "initailBrand",
    default : []
})
/* Filter Data With Brand End */



/* Validation Start */
export const initialState = atom({
    key: "initialState",
    default: {
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
    }
});
/* Validation End */