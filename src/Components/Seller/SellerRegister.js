import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toastContext from '../../CONTEXT/Context/toastContext';
import Spinner from '../Spinner';

export default function SellerRegister() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const context = useContext(toastContext);
  const { showToast } = context;
  const [sellerCredentials, setSellerCredentials] = useState({ fullName: '', companyName: '', email: '', password: '', mobile: '', companyAddress: '' });
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const response = await fetch(`${apiUrl}/api/auth/seller/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: sellerCredentials.fullName,
        companyName: sellerCredentials.companyName,
        email: sellerCredentials.email,
        password: sellerCredentials.password,
        mobile: sellerCredentials.mobile,
        companyAddress: sellerCredentials.companyAddress,
      })
    });
    try {
      setProcessing(false);
      const json = await response.json();
      if (json.authToken) {
        localStorage.setItem('sellerToken', json.authToken);
        localStorage.setItem('sellerFullName', json.sellerFullName);
        navigate('/seller-addProduct');
        window.scrollTo(0, 0);
        showToast('Registered Succesfully', 'success');
      } else {
        navigate('/seller-register');
        const errorMsg = await json.errors[0].msg || json.error
        showToast(errorMsg, 'warn');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChange = (e) => {
    setSellerCredentials({ ...sellerCredentials, [e.target.name]: e.target.value });
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      navigate('/allProducts');
    }else if(localStorage.getItem('sellerToken')){
      navigate('/seller-addProduct');
    }
  },[]);
  return (
    <>
      <div className="container margin-top-md pb-5">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1 className=''>Create Seller Account</h1>
            <form className='form-group mt-4'>
              <label className=' fs-4 mt-0' >Full Name</label>
              <input type='text' onChange={onChange} value={sellerCredentials.fullName} name='fullName' className='form-control input-field fs-6' placeholder='Enter your full name' />
              <label className=' fs-4 mt-0 ' >Email</label>
              <input type='email' onChange={onChange} value={sellerCredentials.email} name='email' autoComplete="username" className='form-control input-field fs-6' placeholder='example@gmail.com'  />
              <label className=' fs-4 mt-0 ' >Password</label>
              <input type='password' onChange={onChange} value={sellerCredentials.password} name='password' autoComplete="password" className='form-control input-field fs-6' placeholder='******'  />
              <label className=' fs-4 mt-0 ' >Mobile Number</label>
              <input type='tel' onChange={onChange} value={sellerCredentials.mobile} name='mobile' className='form-control input-field fs-6' placeholder='+91'  />
              <label className=' fs-4 mt-0 ' >Company Name</label>
              <input type='text' onChange={onChange} value={sellerCredentials.companyName} name='companyName' className='form-control input-field fs-6' placeholder='eg. Bengal Traders'  />
              <label className=' fs-4 mt-0' >Company Address</label>
              <input type='text' onChange={onChange} value={sellerCredentials.companyAddress} name='companyAddress' className='form-control input-field fs-6' placeholder='Enter Address' />
              <button onClick={handleRegister} className='btn btn-warning form-control mt-4 fs-4 bold  '>
              { processing === true ? <Spinner height='30' width='30' /> : 'Register'}
                </button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
