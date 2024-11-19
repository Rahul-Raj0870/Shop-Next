import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

// Save credentials - POST
export const saveLoginDataAPI = async (credentilas)=>{
    return await commonAPI("POST",`${SERVERURL}/userdetails`,credentilas)

}

// Save credentials - GET
export const getLoginDataAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/userdetails`,"")

}

// Add product to cart 
export const addToCartAPI = async(item)=>{
    return await commonAPI("POST",`${SERVERURL}/cart`,item)
}
// Get products from cart
export const getFromCartAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/cart`)
}
// Delete product from cart 
export const removeItemAPI = async (id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/cart/${id}`,{})
}

// Update product quantity in cart
export const updateItemAPI = async (id, updatedItem) => {
    return await commonAPI("PUT", `${SERVERURL}/cart/${id}`, updatedItem);
}