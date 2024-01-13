import React, {useState, useEffect, useRef} from 'react'
import { useNavigate, BrowserRouter as Router, Navigate } from 'react-router-dom';
import axios from 'axios'

function Signup() {
    const navigate = useNavigate(); 

    const checkerRef = useRef(null);
    
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    axios.defaults.withCredentials = true;


    const [value, setValue] = useState({
        firstname:'',
        lastname:'',
        name:'',
        email:'',
        password:'',
    })

    const [checkerEmail, setChecker] = useState('')

    useEffect(()=>{
        checkerRef.current.innerText = checkerEmail;
    },[checkerEmail])

    const handleInputChange = (e) => {
           
           setValue((prevVal)=>({...prevVal, [e.target.name]: e.target.value}))

        fullnameHandler();
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const fullnameHandler = () => {
        const {firstname, lastname} = value;
        const fullname = `${firstname} ${lastname}`
        setValue((prevVal) => ({...prevVal, name: [fullname]}))
       
    }

    const handleSubmit =  async (e) => {

        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8080/signup',value);

            if(response.data.message === 'Success' || !response.data.message){
                setChecker('')
                console.log(response);

                alert(response.data.message)

                firstnameRef.current.value = "";
                lastnameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";


            }else{
                setChecker(response.data.message)
            }
        } catch (error) {
            console.error(error);
        } 
    }


  return (
    <div className='flex flex-col justify-center items-center gap-4'>
        <h1 className='text-[2em]'>Signup</h1>
        <button onClick={handleLogin} className='bg-red-300 px-5 py-2 text-[1.2em]'>Login</button>
        <div className='flex flex-col justify-center items-center gap-4 bg-slate-400 p-4'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'>


                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row justify-between items-center'>
                        <label htmlFor="firstname">Firstname</label>
                        <span className='text-red-500 text-xs' ref={checkerRef}></span>
                    </div>
                    <input type='text' name="firstname" id="firstname" ref={firstnameRef} onChange={handleInputChange} placeholder='' className='px-4 py-2 border-2 border-gray-400' required autoComplete="on"></input>
                </div>


                <div className='flex flex-col gap-2'>
                    <label htmlFor="lastname">Lastname</label>
                    <input type='text' name="lastname" id="lastname" ref={lastnameRef} onChange={handleInputChange} placeholder='' className='px-4 py-2 border-2 border-gray-400' required autoComplete="on"></input>
                </div>


                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input type='email' name="email" id="email" ref={emailRef} onChange={handleInputChange} placeholder='' className='px-4 py-2 border-2 border-gray-400' required autoComplete="on"></input>
                </div>


                <div className='flex flex-col gap-2'>
                    <label htmlFor="password">Password</label>
                    <input type='password' name="password" id="password" ref={passwordRef} onChange={handleInputChange} placeholder='' className='px-4 py-2 border-2 border-gray-400' required autoComplete="off"></input>
                </div>

                <button type='submit' className='bg-white w-full py-2'>Register</button>
            </form>

            
        </div>
    
    </div>
  )
}

export default Signup