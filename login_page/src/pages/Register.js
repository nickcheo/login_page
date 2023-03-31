import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
});

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post('/api/users', {
        username,
        email,
        password,
      });
      console.log(response.data);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button className = "btn btn-primary" onClick={handleClick}>Let's Begin!</button>
    </div>
  );
}

export default Register;
