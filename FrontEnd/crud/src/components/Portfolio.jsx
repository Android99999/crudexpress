import React, { useEffect, useState } from 'react'
import { useNavigate, BrowserRouter as Router } from 'react-router-dom';
function Portfolio() {
 const navigate = useNavigate();
    const [isLoggedIn, setisLoggedIn] = useState(true);
    useEffect (()=> {
        if(isLoggedIn){
            return
        }else{
            navigate('/signup')
        }
    },[])
  return (
    <div>Portfolio</div>
  )
}

export default Portfolio