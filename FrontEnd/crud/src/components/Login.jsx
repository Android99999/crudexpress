import React, { useState, useRef } from 'react'
import { useNavigate, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const emailRef = useRef(null);
    const passwordRef = useRef (null);

    const [user, setUser] = useState([])


    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: '',
        password: '',
    });
    
    const handleInputChange = (e) => {

        setValue((prevVal)=>({...prevVal, [e.target.name]: e.target.value}))

    }

    const handleSignup = () => {
        navigate('/signup');
    }


    const handleSubmit = async (e) => {

        e.preventDefault()
       
        try {
            const response = await axios.post('http://localhost:8080/login',value);
           
            if(response.data.message === "Login successful"){
                console.log(response.data[0]);
                alert("STOP")
                navigate('/')
            }else{

                alert("NO CREDENTIALS!")
            }


           

            
        } catch (error) {

            console.error(error);
        }

        
    }


    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-[2em]'>LOGIN</h1>

            <button onClick={handleSignup}>Sign up</button>
        
            <div className='flex flex-col justify-center items-center gap-4 bg-slate-400 p-4'>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'>
    

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name="email" id="email" ref={emailRef} onChange={handleInputChange} placeholder='' className='px-4 py-2 border-2 border-gray-400' required autoComplete="on"></input>
                    </div>
    
    
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name="password" id="password" ref={passwordRef} onChange={handleInputChange} placeholder='' className='px-4 py-2 border-2 border-gray-400' required autoComplete="off"></input>
                    </div>
    
                    <button type='submit' className='bg-white w-full py-2'>Login</button>

                </form>
    
                
            </div>
        
        </div>
      )
}

export default Login