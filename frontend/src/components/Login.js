import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

import axios from 'axios'

export default function Login(prop) {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password:'',
});

const handleInputChange = (event) => {
  const { name, value } = event.target;

    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));

};

const handleSubmit=(event)=>{
  event.preventDefault();
        if (Object.values(formData).some(value => value === '')) {
            alert('Please fill in all fields');
        }else if (!formData.email.endsWith('@gmail.com')) {
          alert('Please enter a valid Gmail address');
      }else{
            // Submit form data
            console.log('Login submitted:', formData);
            appPost()
        }
}

const appPost=()=>{
  const url='http://localhost:3001/log_page';

  axios.post(url, formData,{ withCredentials: true }) 
.then(response => {
          if(response.status===200)
          {
            prop.setLogin(true)
            navigate('/home');
          }else{
            alert(response.data)
          }
          console.log('Response from server:', response.data);
})
.catch(error => {
  alert('Wrong Credentials !')
          console.error('Error sending data:', error);
});
}


  return (
    <div className='flex bg-slate-900 rounded-2xl shadow-lg sm:h-3/5 lg:w-2/5 p-4'>
    <form className=' text-white space-y-8 w-full '>
    
    <h2 className=' font-bold text-center text-lg  sm:text-4xl '>LogIn</h2>
    <div className='flex flex-row  text-lg'>
        <label htmlFor='email'>Email:</label>
         <input className='text-slate-900 mx-12 lg:w-3/5' type='email' id='email' name='email' value={formData.email} onChange={handleInputChange} required/>
    </div>
    <div className='flex flex-row  text-lg'>
         <label htmlFor='password'>Password:</label>
         <input className='text-slate-900 mx-4 lg:w-3/5' type='text' id='password' name='password' value={formData.password} onChange={handleInputChange}  required/>
    </div>
     
    <div className='flex justify-center'>
        <button className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded w-9/12' type='submit' onClick={handleSubmit}>Submit</button>
    </div>
    </form>

    </div>
  )
}
