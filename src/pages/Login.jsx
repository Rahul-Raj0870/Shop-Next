import React, {useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { saveLoginDataAPI,getLoginDataAPI } from '../services/allAPI'
import logo from '../assets/logo.png'

const Login = () => {
  const [newUser,setNewUser] = useState(false)
  const [userDetails,setUserDetails] = useState({name:"",email:"",password:""})
  const [loginDetails,setLoginDetails] = useState({email:"",password:""})
  const [showPassword, setShowPassword] = useState(false)
  const [emailValidity, setEmailValidity] = useState({ login: true, newUser:  true })
  const [errorMessages, setErrorMessages] = useState({ name: "", email: "", password: "", loginEmail: "", loginPassword: "" })


 


  const navigate = useNavigate(); // Initialize useNavigate

  const validity = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Saving New user Details
  
  const handleNewUser = async ()=>{
    setErrorMessages({ name: "", email: "", password: "" })
    let hasError = false;
    if (!userDetails.name && !userDetails.email && !userDetails.password) {
      setErrorMessages(prev => ({
        ...prev,
        name:  "username is Required.",
        email:  "E-mail is Required.",
        password:  "Password is Required."
      }))
      hasError = true

    }else if(!userDetails.name){
      setErrorMessages(prev => ({
        ...prev,
        name:  "username is Required."
      }));
      return;

    }else if(!userDetails.email){
      setErrorMessages(prev => ({
        ...prev,
        email:  "E-mail is Required."
      }));
      return;

    }
    
    else if(!userDetails.password){
      setErrorMessages(prev => ({
        ...prev,
        password:  "Password is Required."
      }));
      return;

    }else if(hasError) return

    else{
      if(emailValidity.newUser){
        const newUserData = {...userDetails}
        const result = await saveLoginDataAPI(newUserData)
        if(result.status>=200 && result.status<300){
          alert("New user Registered succefully")
          console.log(result.data);
          setLoginDetails({email:"", password:""})
          setNewUser(false)
          
        }else{
          alert("Error registering new user")
        }
    
        }
        else{
          alert('invalid Email')
        }
    }
    
    

  }
  // Reset logic
  const handleReset = ()=>{
    setLoginDetails({email: "", password: ""})
    setUserDetails({ name: "", email: "", password: "" })
    setErrorMessages({ name: "", email: "", password: "", loginEmail: "", loginPassword: "" })

    // Navigate back to the login page
    setNewUser (false);
  }

  // login details
  const checkUser = async ()=>{
    setErrorMessages({ loginEmail: "", loginPassword: "" }); // Reset error messages
    let hasError = false;
    if (!loginDetails.email && !loginDetails.password) {
      setErrorMessages(prev => ({
        ...prev,
        loginEmail: "E-mail is required",
        loginPassword: "Password is required"}));
        hasError(true)
    }
    else if (!emailValidity.login) {
      setErrorMessages(prev => ({
        ...prev,
        loginEmail: "E-mail is required"
      }));
      hasError(true)
    }else if (!loginDetails.password) {
      setErrorMessages(prev => ({
        ...prev,
        loginPassword: "Password is required"
      }));
      hasError(true)
    }else if(hasError) return
     else{
      try{
        const result = await getLoginDataAPI()
        // console.log( result.data);
        console.log(loginDetails);
  
        const userEmail = result.data.map(data=>data.email)
        const userPass = result.data.map(data=>data.password)
        console.log(userEmail);
        console.log(userPass);
        
        
        // Check the data is available
        if(result.data.length>0){
          if(userEmail.includes(loginDetails.email) && userPass.includes(loginDetails.password)){
            console.log('working');
            alert("Data is valid ")
            navigate('/home')
  
          }else{
            console.log('Not working');
            alert("Invalid username or password")
    
          }
          
  
        }
  
      }catch(err){
        console.log(err);
        
      }
    }
    
 }

    // Handle email change for login with validation
  const handleEmailChangeLogin = (e) => {
    const email = e.target.value;
    setLoginDetails({ ...loginDetails, email });
    setEmailValidity({ ...emailValidity, login: validity.test(email) }); // Validate email
  };

  // Handle email change for new user with validation
  const handleEmailChangeNewUser  = (e) => {
    const email = e.target.value;
    setUserDetails({ ...userDetails, email });
    setEmailValidity({ ...emailValidity, newUser:  validity.test(email) }); // Validate email
  };
    
  return (
    <>
    <div className='containers' style={{fontFamily:'Alegreya'}}>
      <div  className='position-relative'>
        <div  className='cont-login '>
          <div className='div-white'></div>
          <div className='div-dark1'></div>
          <div className='div-dark2'></div>
          <div className='div-light'></div>
          <div className='div-head '><img src={logo} alt="" /><h3>SHOPNEXT</h3></div>
          {/* Login Details */}
          { !newUser?(<div className='user-data'>
            <div>
              <input required onChange={handleEmailChangeLogin} value={loginDetails.email}style={{borderRadius:'50px',border:'solid #6c6bc3 2px'}} 
              className='form-control px-3 my-4' type="email" placeholder='Enter your E-Mail' />
              {loginDetails.email.length > 0 && !emailValidity.login && (
                    <div style={{ marginTop: '-20px', marginLeft: '10px', color: 'red' }}>*Enter a valid Email</div>
                  )}
              {errorMessages.loginEmail && (
                    <div style={{ marginTop: '-5px', marginLeft: '10px', color: 'red' }}>{errorMessages.loginEmail}</div>
                  )}
              
              <input required onChange={e => setLoginDetails({...loginDetails, password: e.target.value})} value={loginDetails.password} style={{borderRadius:'50px',border:'solid #6c6bc3 2px'}} className='form-control px-3 mb-3' type={showPassword ? 'text' : 'password'} placeholder='Enter your password' /><button onClick={toggleShowPassword} style={{marginTop:'-53px',position:'absolute',marginLeft:'210px',cursor:'pointer'}} className='btn '>  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
              {errorMessages.loginPassword && (
                    <div style={{ marginTop: '-20px', marginLeft: '10px', color: 'red' }}>{errorMessages.loginPassword}</div>
                  )}
              
              <Link style={{textDecoration:'none'}} className='ps-2 pe-5'>forget password</Link>
              <Link onClick={()=>setNewUser(true)} style={{textDecoration:'none'}}>new user</Link>
              <button onClick={checkUser} className='d-block btn btn-primary w-50 mt-3 ms-2'>LOGIN</button>
            </div>
          </div>)

            /* New user Details */
           :(<div className='new-user-data '> 
            <div>
              <input required value={userDetails.name} onChange={e => setUserDetails({ ...userDetails, name: e.target.value })}
                    style={{ borderRadius: '50px', border: 'solid #6c6bc3 2px' }} className='form-control px-3 my-4' type="text" placeholder='Enter your Name' />
              {errorMessages.name  && (
                    <div style={{ marginTop: '-20px',marginBottom:'-20px', marginLeft: '10px', color: 'red' }}>{errorMessages.name }</div>
                  )}

              <input required value={userDetails.email} onChange={handleEmailChangeNewUser}
                    style={{borderRadius: '50px',border: 'solid #6c6bc3 2px' }} className='form-control px-3 my-4' type="email" placeholder='Enter your E-Mail' />
                    {userDetails.email.length > 0 && !emailValidity.newUser && (
                    <div style={{ marginTop: '-20px', marginLeft: '10px', color: 'red' }}>*Enter a valid Email</div>
                  )}
                  {errorMessages.email  && (
                    <div style={{ marginTop: '-5px', marginLeft: '10px', color: 'red' }}>{errorMessages.email }</div>
                  )}

              <input required value={userDetails.password} onChange={e=>setUserDetails({...userDetails, password: e.target.value})} style={{borderRadius:'50px',border:'solid #6c6bc3 2px'}} className='form-control px-3 mb-3' type={showPassword ? 'text' : 'password'} placeholder='Enter your password' /><button onClick={toggleShowPassword} style={{marginTop:'-53px',position:'absolute',marginLeft:'210px',cursor:'pointer'}} className='btn '><i  className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
              {errorMessages.password  && (
                    <div style={{ marginTop: '-20px', marginLeft: '10px', color: 'red' }}>{errorMessages.password }</div>
                  )}

              <button onClick={handleNewUser}  className='btn btn-success mx-3 px-3'>Ok</button>
              <button onClick={handleReset} className='btn btn-danger px-4'>Reset</button>
              
            </div>
          </div>)}
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Login