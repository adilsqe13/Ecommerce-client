import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Form.css';
import toastContext from '../../CONTEXT/Context/toastContext';

export default function SellerLogin() {
  const context = useContext(toastContext);
  const { showToast } = context;
  const [sellerCredentials, setSellerCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/seller/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: sellerCredentials.email, password: sellerCredentials.password })
    });

    try {
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('sellerToken', json.authToken);
        localStorage.setItem('sellerFullName', json.sellerFullName);
        navigate('/seller-addProduct');
        showToast('Logged In Successfully', 'success');
      } else {
        navigate('/seller-login');
        showToast('Invalid Credentials', 'error');
      }
    } catch (error) {
      console.log(error);
    }

  }
  const onChange = (e) => {
    setSellerCredentials({ ...sellerCredentials, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="container mt-4 py-4">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1>Seller Login</h1>
            <form className='form-group mt-4'>
              <label className=' fs-4 mt-1' >Email</label>
              <input type='email' onChange={onChange} value={sellerCredentials.email} name='email' autoComplete="username" className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1 ' >Password</label>
              <input type='password' onChange={onChange} value={sellerCredentials.password} name='password' autoComplete="password" className='form-control input-field fs-4' />
              <p className='mt-3'>Don't have a seller account<Link to='/seller-register'><small className='text-danger bold'> Create Seller Account</small></Link></p>
              <button onClick={handleLogin} className='btn btn-warning form-control mt-1 fs-4 bold  '>Login</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
