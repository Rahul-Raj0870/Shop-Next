import React, { useState,useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import products from '../components/products.json'

import img1 from '../assets/images/0.jpg'//egg
import img2 from '../assets/images/1.jpg'//strawberry
import img3 from '../assets/images/6.jpg'//carrot
import img4 from '../assets/images/3.jpg'//beans
import img5 from '../assets/images/5.jpg'//orange
import img6 from '../assets/images/2.jpg'//lemone
import img7 from '../assets/images/7.jpg'//plums
import img8 from '../assets/images/4.jpg'//pears

import { addToCartAPI, getFromCartAPI } from '../services/allAPI'

const Home = ({ cartQuantity }) => {
  const [getCartItems,setGetCartItems] = useState([])
  // const [cartQuantity,setCartQuantity] = useState(1)

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
    setGetCartItems(allProducts.data)
    

  }catch(err){
    console.log(err);
    
  }


}
const checkProduct = (product)=>{
  console.log('state:');
  
  console.log(getCartItems);
  
  const inCart = getCartItems.some(value=>value.title==product.title)
  

  if(inCart){
    alert("Item is already in the cart")
  }else{
    addItems(product)
  }
}
const addItems = async (product)=>{

  try{
    const productWithQuantity = { ...product, quantity: 1 };
    const cartItems = await addToCartAPI(productWithQuantity)
    if(cartItems){
      alert("Item Added to cart")
      getAllProducts()
    }
      else{
      alert("Error adding item")
      }

    }
catch(err){
  console.log(err);
  
}

}

  return (
    <>
    <Header showSearch={true}/>
    <div style={{paddingTop:'120px',paddingBottom:'100px',fontFamily:'Alegreya',color:'#6c6bc3',backgroundColor:'#9494cc'}}>
      <div className=' row row-cols-5 row-gap-5 column-gap-4 mt-3 w-100' style={{paddingLeft:'180px'}} >
       {products.map(product=>( 
        <div className='col border border-dark rounded pt-3 bg-light shadow' key={product.title}>
          <img className='pe-2' style={{width:'250px',height:'250px'}} src={images[product.filename]} alt="" />
          <div className='mt-3'>
            <h4>Title :<span className='text-primary'> {product.title}</span> </h4>
            <h5>Price : <span className='text-danger'>{product.price}$</span></h5>
            <div className='d-flex justify-content-center my-3'><button onClick={()=> checkProduct(product)} className='btn btn-primary text-light fw-bolder'>Add to Cart</button></div>
          </div>
        </div>))}
     
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Home