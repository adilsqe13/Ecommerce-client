import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Form.css';
import toastContext from '../../CONTEXT/Context/toastContext';

export default function AdminLogin() {
  const context = useContext(toastContext);
  const { showToast } = context;
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/admin/admin-login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: adminCredentials.email, password: adminCredentials.password })
    });

    try {
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('adminToken', json.authToken);
        localStorage.setItem('adminName', json.adminFullName);
        navigate('/dashboard');
        showToast('Logged In Successfully', 'success');
      } else {
        navigate('/admin-login');
        showToast('Invalid Credentials', 'error');
      }
    } catch (error) {
      console.log(error);
    }

  }
  const onChange = (e) => {
    setAdminCredentials({ ...adminCredentials, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="container margin-top-md py-5">
        <div className="row">
          <div className="col-6 dfjeac"><span className='bold'>TEST EMAIL: </span> adilsqe13@gmail.com</div>
          <div className="col-6"><span className='bold'>TEST PASSWORD: </span> 123456789</div>
        </div>
        <div className="row mt-2">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1 className='text-green'>Admin Login</h1>
            <form className='form-group mt-4'>
              <label className=' fs-4 mt-1' >Email</label>
              <input type='email' onChange={onChange} value={adminCredentials.email} name='email' autoComplete="username" className='form-control input-field fs-5' placeholder='TEST- adilsqe13@gmail.com' />
              <label className=' fs-4 mt-1 ' >Password</label>
              <input type='password' onChange={onChange} value={adminCredentials.password} name='password' autoComplete="password" className='form-control input-field fs-5' placeholder='TEST- 123456789' />
              <button onClick={handleLogin} className='btn btn-danger form-control mt-2 fs-4 bold  '>Login</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
