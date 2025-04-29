import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add created_at and updated_at manually
    const userData = {
      ...inputs,
      created_at: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString().slice(0, 10),
    };

    axios.post('http://localhost:8005/api/', userData)
      .then(() => {
        alert('User created successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('There was an error creating the user!', error);
        alert('Failed to create user. Check console.');
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({
      ...values,
      [name]: value
    }));
  };

  return (
    <div className="create-user">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="mobile">Mobile</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={inputs.mobile}
          onChange={handleChange}
          required
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateUser;