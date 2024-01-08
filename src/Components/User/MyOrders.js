import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productContext from '../../CONTEXT/Context/productContext';
import toastContext from '../../CONTEXT/Context/toastContext';

export default function MyOrders() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const myProductcontext = useContext(productContext);
  const myToastcontext = useContext(toastContext);
  const { productPage } = myProductcontext;
  const { showToast } = myToastcontext;
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const [orders, setOrders] = useState([]);

  const orderPage = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/my-orders`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
      });
      const json = await response.json();
      setOrders(json.reverse());
    } catch (error) {
      console.log(error);
    }
  }
  // Cancel Order
  const handleCancel = async (orderId) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/add-to-cart`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({ cartProductId: orderId })
      });
      const json = await response.json();
      if (json.success) {
        await window.location.reload();
        showToast('One Order Cancelled', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Goto Product Page
  const handleProductPage = async (productId) => {
    await productPage(productId);
    navigate('/product-page');
  }

  useEffect(() => {
    orderPage();
  }, []);

  return (
    <>
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="container py-5">
          <h1>My Orders <small className='h5 text-secondary'>&nbsp; &nbsp; {orders.length} - Orders</small></h1>
          <div className="row justify-content-center mb-3 mt-4">
            {orders.map((item) => {
              return (
                <div className="col-md-12 col-xl-12">
                  <div className="card shadow-0 box-shadow-light rounded-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                          <div className="bg-image hover-zoom ripple rounded ripple-surface">
                            <Link to='/product-page' onClick={(e) => { e.preventDefault(); handleProductPage(item.product[0]._id); }}>
                              <img className="img-fluid rounded-3" src={item.product[0].image} alt='img'
                                height={168}
                                width={168} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                          <Link to='/product-page' onClick={(e) => { e.preventDefault(); handleProductPage(item.product[0]._id); }}>
                            <h5>{item.product[0].productName}</h5>
                          </Link>
                          <div className="d-flex flex-row">
                            <div className="text-danger mb-1 me-2">
                              <i className="fa fa-star">*</i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <span>reviews count </span>
                          </div>
                          <div>
                            <h6><span className='bold'>Order Id:</span> &nbsp;<span className='text-danger'> {item._id}</span> </h6>
                            <h6><span className='bold'>Seller:</span> &nbsp;<span className='text-primary'> {item.product[0].sellerId}</span> </h6>
                            <h6><span className='bold'>Quantity:</span> &nbsp;<span className='text-dark'> {item.quantity}</span> </h6>
                            <h6><span className='bold'>For:</span> &nbsp;<span className='text-dark'> {item.product[0].category}</span> </h6>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                          <div className='row'>
                            <div className="col-7">
                              <small className='fs-6'>Rs.</small><span className='text-green bold fs-5'>{item.amount}/-</span>
                            </div>
                            <div className="col-5 text-info">
                              <small className='fs-6 bold'>Prepaid</small>
                            </div>
                          </div>
                          <div className='row'>
                            <div className="col-7">
                              Status Shipment:
                            </div>
                            <div className="col-5 text-green">Pending</div>
                          </div>
                          <div className="d-flex flex-column mt-4">
                            <button className="btn btn-warning btn-sm" type="button">Edit Address</button>
                            <button onClick={() => { handleCancel(item._id) }} className="btn btn-outline-danger btn-sm mt-2 bold" type="button">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </section>
    </>
  )
}
