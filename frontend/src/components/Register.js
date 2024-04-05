import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { differenceInYears } from 'date-fns';
import axios from 'axios'
import image from '../images/reg.jpg'
export default function Register(prop) {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    email: '',
    password:'',
    mobile:'',
    gender:'',
    dob:''
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  if (name === 'mobile' && /^\d{0,10}$/.test(value)) {
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
}else if (name !== 'mobile') {
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
}
};

const handleSubmit=(event)=>{
  event.preventDefault();
        if (Object.values(formData).some(value => value === '')) {
            alert('Please fill in all fields');
        }else if (!formData.email.endsWith('@gmail.com')) {
          alert('Please enter a valid Gmail address');
      }else if (formData.password.length < 8) {
        alert('Password must be at least 8 characters long');
    }else if (formData.mobile.length !== 10) {
      alert('Mobile number must be exactly 10 digits long');
  }  else if (!isValidAge(formData.dob)) {
    alert('Age must be greater than 80 years and greater than 10 years');
}else {
            // Submit form data
            console.log('Form submitted:', formData);
            appPost()
        }
}


const isValidAge = (dobString) => {
  const today = new Date();

  const age = differenceInYears(today, dobString);
  if(age<80 && age>10)
  {
    return true;
  }else{
    return false;
  }
 
};

const appPost=()=>{
  
  const url='http://localhost:3001/reg_page';
  axios.post(url,formData)
.then(response => {

  if(response.status===200)
  {
    prop.setLogin(true)
    navigate('/home');
  }else if(response.status===409){
    console.log("Email already exist ")
  }else{
    alert(response.data)
  }
  // console.log('Response from server:', response.data);
          
})
.catch(error => {
          
          console.log('Error sending data:', error.response.data);
});
}
// bg-#0C2D57
  return (
    <>
    
    <div className='flex bg-slate-900 rounded-2xl shadow-lg sm:w-4/5 p-4'>
    <form className=' text-white space-y-8 w-full lg:w-2/4 '>
    
    <h2 className=' font-bold text-center text-lg  sm:text-4xl '>Registration</h2>

    <div className='flex flex-row  text-lg'>
         <label htmlFor='first-name'>First Name:</label>
         <input className='text-slate-900 mx-4 w-3/5' type='text' id='first-name' name='firstName' value={formData.firstName} onChange={handleInputChange} required/>
    </div>

    <div className='flex flex-row  text-lg'>
         <label htmlFor='last-name'>Last Name:</label>
         <input className='text-slate-900 mx-4 w-3/5' type='text' id='last-name' name='lastName' value={formData.lastName} onChange={handleInputChange} required/>
    </div>

    <div className='flex flex-row  text-lg'>
         <label htmlFor='email' className='mr-2'>Email:</label>
         <input className='text-slate-900 ml-12 w-3/5' type='email' id='email' name='email' value={formData.email} onChange={handleInputChange} required/>
    </div>

    <div className='flex flex-row  text-lg'>
         <label htmlFor='password'>Password:</label>
         <input className='text-slate-900 mx-6 w-3/5' type='text' id='password' name='password' value={formData.password} onChange={handleInputChange} required/>
    </div>

    <div className='flex flex-row  text-lg'>
         <label htmlFor='mobile'>Mobile:</label>
         <input className='text-slate-900 mx-10 w-3/5' type='text' id='mobile' name='mobile' value={formData.mobile} onChange={handleInputChange} required/>
    </div>

    <div className='flex flex-row  text-lg'>
         <label htmlFor='gender'>Gender:</label>
         
         <select className='text-slate-900 mx-10 ' id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select</option>
             <option value="male">Male</option>
             <option value="female">Female</option>
             <option value="other">Other</option>
         </select>
    </div>

    <div className='flex flex-row  text-lg'>
         <label htmlFor="dob" className='mr-3'>DOB:</label>

        <input className='text-slate-900 mx-12' type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange}/>
    </div>
    <div className='flex justify-center'>
        <button className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded w-9/12' type='submit' onClick={handleSubmit}>Submit</button>
    </div>
    </form>
    
    <div className="hidden lg:block lg:w-2/4">
        <img src={image} alt="Newimage" className="object-cover w-full h-full rounded-xl" />
     </div>
 
    </div>
    </>
  )
}
