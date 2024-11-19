import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getFromCartAPI, removeItemAPI,updateItemAPI } from '../services/allAPI'

import img1 from '../assets/images/0.jpg'//egg
import img2 from '../assets/images/1.jpg'//strawberry
import img3 from '../assets/images/6.jpg'//carrot
import img4 from '../assets/images/3.jpg'//beans
import img5 from '../assets/images/5.jpg'//orange
import img6 from '../assets/images/2.jpg'//lemone
import img7 from '../assets/images/7.jpg'//plums
import img8 from '../assets/images/4.jpg'//pears
 
const Cart = () => {
  const images = {
    "0.jpg":img1,
    "1.jpg":img2,
    "2.jpg":img3,
    "3.jpg":img4,
    "4.jpg":img5,
    "5.jpg":img6,
    "6.jpg":img7,
    "7.jpg":img8,
  }
  const [cartItem,setCartItem] = useState([])
  
  useEffect(()=>{
    
    getAllProducts()
   
  },[])
  const getAllProducts = async ()=>{
    try{
      const allProducts = await getFromCartAPI()
      console.log('products');
      
      console.log(allProducts);
      console.log('data');
      
      console.log(allProducts.data);
     setCartItem(allProducts.data)
      
  
    }catch(err){
      console.log(err);
      
    }
  
  
  }
  const deleteItem = async (id)=>{
    const removeFromCart = await removeItemAPI(id)
    if(removeFromCart.status>=200 && removeFromCart.status<300){
      alert("Item removed from cart")
      setCartItem(prevItems => prevItems.filter(item => item.id != id))
      

    }
    else {
      alert("Failed to remove item from cart");
  }
  }

  const increaseQuantity = async (id) => {
    setCartItem(prevItems => {
        const updatedItems = prevItems.map(item => {
            if (item.id == id) {
              
                const newQuantity = item.quantity + 1;
                // Call the API to update the quantity on the server
                updateItemAPI(id, { ...item, quantity: newQuantity })
                
                return { ...item, quantity: newQuantity }
            }
            return item
        })
        return updatedItems;
    })
}

const decreaseQuantity = async (id) => {
    setCartItem(prevItems => {
        const updatedItems = prevItems.map(item => {
          
            if (item.id == id && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                // Call the API to update the quantity on the server
                updateItemAPI(id, { ...item, quantity: newQuantity });
                
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        return updatedItems;
    });
};

const calculateTotalAmount = () => {
  return cartItem.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}
  return (
    <> <Header />
      <div className='container-fluid' style={{paddingTop:'120px',paddingBottom:'100px',fontFamily:'Alegreya',color:'#6c6bc3',backgroundColor:'#9494cc',height:'100vh'}}>
  {
    cartItem?.length>0?
    <div className='row row-cols-3 column-gap-4 w-100'>
    <div className='col col-7 ms-5 '>
      
      <table style={{marginTop:'30px'}} className="table table-striped fs-5 ">
        <thead>
          <tr >
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">...</th>
          </tr>
        </thead>
        <tbody>
          {cartItem?.map((item,index)=>(
          <tr className=''>
            <th scope="row">{index+1}</th>
            <td>{item?.title}</td>
            <td><img style={{width:'60px',height:'50px',objectFit:'cover'}} src={images[item?.filename]} alt="" /></td>
            <td><button onClick={() => decreaseQuantity(item.id)} className='btn border fw-bolder'>-</button><input className='bg-secondary text-light rounded border-0' value={item.quantity}  style={{width:'40px',height:'35px',padding:'12px',marginInline:'5px'}} type="text" readOnly /><button onClick={() => increaseQuantity(item?.id)} className='btn border'>+</button></td>
            <td><span className='text-primary'>${(item.price * item.quantity).toFixed(2)}</span></td>
            <td><button onClick={()=>deleteItem(item?.id)} className='btn text-danger'><i className="fa-solid fa-trash"></i></button></td>
          </tr>))}
          
        </tbody>
      </table>
      
    </div>
    <div style={{height:'200px',marginTop:'30px'}} className='col col ms-5 bg-light text-center p-4'>
    <h1>Total Amount:<span className='text-danger ps-3'>${calculateTotalAmount()}</span></h1>
    <button style={{width:'250px',height:'50px',marginTop:'20px'}} className='btn btn-success'>Buy Now</button>
    </div>
  </div>
  :
  <div className='row row-cols-3  w-100 '>
    <div className="col"></div>
      <div className='col'>
        <img style={{width:'300px'}}  src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png" alt="" />
        <h1 className=' text-danger text-center mt-3'>Your Wishlist is Empty!!!</h1>
      </div>
    </div>
  }
  
        
      </div>
      <Footer />
    </>
  )
}

export default Cart