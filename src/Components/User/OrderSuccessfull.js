import React, { useEffect } from 'react'

export default function OrderSuccess() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('userToken');
  const productId = localStorage.getItem('productPageId');
  const handleOrderConfirm = async () => {
    try {
      await fetch(`${apiUrl}/api/user/order-successfull/${productId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleOrderConfirm();
  }, []);

  
  return (
    <div className='container my-4 order-success border dfjcac'>
      <div className=''>
        <div className="row">
          <div className="col">
            <h1 className='text-green-light bold'>Order Placed</h1>
          </div>
        </div>
        <div className="row">
          <div className="col dfjcac">
            <a href='/my-orders' className=' h5 text-primary bold'>Back to My Orders page</a>
          </div>
        </div>
      </div>
    </div>
  )
}
