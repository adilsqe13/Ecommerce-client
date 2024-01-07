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
    fullName: profile.length===0? '': profile[0].fullName,
    email: profile.length===0? '': profile[0].email,
    mobile: profile.length===0? '': profile[0].mobile,
    address: profile.length===0? '': profile[0].address,
    state: profile.length===0? '': profile[0].state
  });
  const navigate = useNavigate();
  const handleSave = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/api/user/update-profile`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({
        fullName: userCredentials.fullName,
        email: userCredentials.email,
        mobile: userCredentials.mobile,
        address: userCredentials.address,
        state: userCredentials.state,
      })
    });
    try {
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('userFullName', json.updatedProfile[0].fullName);
        navigate('/profile');
        showToast('Profile Updated', 'success');
      } else {
        navigate('/update-profile');
        showToast('Something went wrong', 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Something went wrong', 'error');
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
            <h1 className=''>Edit User Profile</h1>
            <form className='form-group mt-4'>
              <label className=' fs-4 mt-0' >Name</label>
              <input type='text' onChange={onChange} value={userCredentials.fullName} name='fullName' className='form-control input-field fs-5' placeholder='Enter new name' />
              <label className=' fs-4 mt-0' >Email</label>
              <input type='text' onChange={onChange} value={userCredentials.email} name='email' className='form-control input-field fs-5' placeholder='Enter new email' />
              <label className=' fs-4 mt-0' >Phone</label>
              <input type='text' onChange={onChange} value={userCredentials.mobile} name='mobile' className='form-control input-field fs-5' placeholder='+91' />
              <label className=' fs-4 mt-0' >Address</label>
              <input type='text' onChange={onChange} value={userCredentials.address} name='address' className='form-control input-field fs-5' placeholder='Enter new address' />
              <label className=' fs-4 mt-0' >State</label>
              <input type='text' onChange={onChange} value={userCredentials.state} name='state' className='form-control input-field fs-5' placeholder='Enter new state' />
              <button onClick={handleSave} className='btn btn-danger form-control mt-4 fs-5  '>Save and Continue</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
