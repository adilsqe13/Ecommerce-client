import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Form.css';
import toastContext from '../../CONTEXT/Context/toastContext';

export default function Login() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const context = useContext(toastContext);
  const { showToast } = context;
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/api/auth/user/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: userCredentials.email, password: userCredentials.password })
    });

    try {
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('userToken', json.authToken);
        localStorage.setItem('userFullName', json.userFullName);
        navigate('/allProducts');
        showToast('Logged In Successfully', 'success');
      } else {
        navigate('/login');
        showToast('Invalid Credentials', 'error');
      }
    } catch (error) {
      console.log(error);
    }

  }
  const onChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="container mt-4 py-4">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1>Login</h1>
            <form className='form-group mt-4'>
              <label className=' fs-4 mt-1' >Email</label>
              <input type='email' onChange={onChange} value={userCredentials.email} name='email' autoComplete="username" className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1 ' >Password</label>
              <input type='password' onChange={onChange} value={userCredentials.password} name='password' autoComplete="password" className='form-control input-field fs-4' />
              <p className='mt-3'>Don't have an account<Link to='/register'><small className='text-danger bold'> Create Account</small></Link></p>
              <button onClick={handleLogin} className='btn btn-primary form-control mt-1 fs-4 bold  '>Login</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}