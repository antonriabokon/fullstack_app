import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';
 
const CreateUser = () => {
  const [inputs, setInputs] = useState({});
  let navigate = useNavigate();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8005/api/', inputs);
    navigate('/');
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({...values, [name]: value }));
  }
  return (
    <div className="create-user">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange}/>
 
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange}/>
 
        <label htmlFor="mobile">Mobile</label>
        <input type="tel" id="mobile" name="mobile" onChange={handleChange}/>
        <button>Save</button>
      </form>
    </div>
  )
}
 
export default CreateUser