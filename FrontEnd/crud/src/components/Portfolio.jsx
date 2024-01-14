import React, { useEffect, useState } from 'react'
import { useNavigate, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
function Portfolio(){

  axios.defaults.withCredentials = true;

 const navigate = useNavigate();

   
    useEffect(() => {
      axios.get('http://localhost:8080/protected')
        .then(response => {
          const { data } = response;
        
          if (data.isValid) {
            
            console.log(data)
            
          } else {
            // Redirect to login page if unauthorized
            console.log('User not authenticated');
           navigate('/login');
          }

        })
        .catch(error => {

          console.error('Error making request:', error);
          if(error.response && !error.response.isValid){
            alert("catch")
            navigate('/login');
          }
          else{
            console.error('Error making request:', error);
          }
          
        });
    }, []);




  return (
    <div>Portfolio</div>
  )
}

export default Portfolio