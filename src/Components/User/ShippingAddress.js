import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toastContext from '../../CONTEXT/Context/toastContext';
import profileContext from '../../CONTEXT/Context/profileContext';


export default function Register() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('userToken');
  const context1 = useContext(toastContext);
  const context2 = useContext(profileContext);
  const { showToast } = context1;
  const { profile } = context2;
  const [userCredentials, setuserCredentials] = useState({
    address: profile.length === 0 ? '' : profile[0].address,
    city: profile.length === 0 ? '' : profile[0].city,
    state: profile.length === 0 ? '' : profile[0].state,
    postalCode: profile.length === 0 ? '' : profile[0].postalCode
  });
  const navigate = useNavigate();
  const handleSave = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/api/user/save-shipping-address`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({
        address: userCredentials.address,
        city: userCredentials.city,
        state: userCredentials.state,
        postalCode: userCredentials.postalCode,
      })
    });
    try {
      const json = await response.json();
      if (json.success) {
        navigate('/place-order-page');
        showToast('Address Saved', 'success');
      } else {
        navigate('/shipping-address');
        showToast('Something went wrong', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChange = (e) => {
    setuserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="container margin-top-md pb-5">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1 className=''>Shipping Address</h1>
            <form className='form-group mt-4'>
              <label className=' fs-4 mt-0' >Address</label>
              <input type='text' onChange={onChange} value={userCredentials.address} name='address' className='form-control input-field fs-5' placeholder='Area, House, Nearby Location' />
              <label className=' fs-4 mt-0' >City</label>
              <input type='text' onChange={onChange} value={userCredentials.city} name='city' className='form-control input-field fs-5' placeholder='Enter your city' />
              <label className=' fs-4 mt-0' >State</label>
              <input type='text' onChange={onChange} value={userCredentials.state} name='state' className='form-control input-field fs-5' placeholder='eg. West Bengal' />
              <label className=' fs-4 mt-0' >Postal Code</label>
              <input type='text' onChange={onChange} value={userCredentials.postalCode} name='postalCode' className='form-control input-field fs-5' placeholder='eg. 713302' />
              <button onClick={handleSave} className='btn btn-danger form-control mt-4 fs-5  '>Save and Continue</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
