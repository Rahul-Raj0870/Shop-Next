import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/cartlogo.png'
const Header = ({showSearch}) => {


  return (
    <div className='position-fixed w-100 top-0 py-2' style={{backgroundColor:'#615aa5',fontFamily:'Alegreya'}}>
    
      <div className='d-flex justify-content-between align-items-center pt-2 mx-5'>
        <div>
          <Link style={{textDecoration:'none'}} to={'/home'}><img style={{height:'40px',paddingRight:'8px',marginTop:'-25px'}} src={logo} alt=""/><span className='text-white fs-2' style={{fontFamily:'Noto Serif Display',fontStyle:'italic',fontWeight:'600'}}> SHOPNEST</span></Link>
          {showSearch && <input style={{marginLeft:'200px',width:'40vw',border:'none',height:'35px',marginBottom:'10px'}} className='rounded p-3' type="text"  placeholder='Search products here....'/>}
        </div>
        <div>
          
          <Link style={{textDecoration:'none'}} className='pe-4 text-light fs-5' to={'/cart'} ><i style={{color:'#49be25'}} className='fa-solid fa-cart-plus pe-1' ></i> <span className='fs-3 '>Cart</span></Link>
          <Link style={{textDecoration:'none'}} className='text-light fs-5' to="/"><i style={{color:'#f33537'}} className ="fa-solid fa-arrow-right-from-bracket pe-1 "></i> <span className='fs-3'>Logout</span></Link>
        </div>
      </div>
    
    </div>
  )
}

export default Header