import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import productContext from '../../CONTEXT/Context/productContext';
import '../Styles/CartPage.css'
import Spinner from '../Spinner';

export default function CartPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('userToken');
  const myProductcontext = useContext(productContext);
  const { productPage } = myProductcontext;
  const [cartProducts, setCartProducts] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [itemsAmount, setItemsAmount] = useState(0);
  const [totalPiece, setTotalPiece] = useState(0);
  const [gst, setGst] = useState(0);
  const navigate = useNavigate();

  // select payment method
  const handleSelectChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleCart = async () => {
    try {
      // fetch cart items for user
      const response = await fetch(`${apiUrl}/api/user/cart-products`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }

      });
      const json = await response.json();
      let itemsAmount = 0.0;
      let totalPiece = 0;
      for (let i = 0; i < json.userCartProducts.length; i++) {
        itemsAmount += (parseFloat(json.userCartProducts[i].product[0].price) * parseFloat(json.userCartProducts[i].quantity));
        totalPiece += parseFloat(json.userCartProducts[i].quantity);
      }

      let gst = ((itemsAmount * 18) / 100).toFixed(2);
      setItemsAmount(itemsAmount.toFixed(2));
      setGst(gst);
      setCartProducts(json.userCartProducts.reverse());
      setTotalPiece(totalPiece);
    } catch (error) {
      console.log(error);
      if (!token) {
        navigate('/login');
        window.scrollTo(0, 0);
      }
    }
  }

  const handleIncDec = async (_id, increament) => {
    await fetch(`${apiUrl}/api/user/add-to-cart`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ cartProductId: _id, increament: increament })
    });
    window.location.reload();
  };

  const handleDelete = async (_id) => {
    await fetch(`${apiUrl}/api/user/add-to-cart`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ cartProductId: _id })
    });
    window.location.reload();
  };

  const handleProductPage = async (productId) => {
    await productPage(productId);
  }

  const handleCheckoutBtn = async () => {
    try {
      await fetch(`${apiUrl}/api/user/set-payment-method`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({ selectedMethod: selectedMethod })
      });
      navigate('/shipping-address');
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleCart();
  }, []);
  return (
    <>
      <section className="h-100 h-custom margin-top-minus" style={{ backgroundColor: "#ffffff" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-12 ">
              <div className="card card-registration card-registration-2 border border-light" style={{ borderRadius: "15px" }}>
                <div className="card-body p-0">
                  <div className="row g-0 mt-4">
                    <div className="col-lg-8">
                      <div className="p-2">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black mt-2">Shopping Cart</h1>
                          <h6 className="mb-0 text-muted">{cartProducts == null ? 0 : cartProducts.length} items</h6>
                        </div> 

                        <h4 className='text-danger'>{cartProducts === null ? '' : cartProducts.length === 0 ? 'Yout cart is empty' : ''}</h4>
                        {cartProducts === null ? <Spinner height='70' width='70' /> : cartProducts.map((item, index) => {
                          return (
                            <div key={index} className="row mb-4 d-flex justify-content-between align-items-center box-shadow-light mx-2 rounded-2 p-2">
                              <div className="col-md-2 col-lg-2 col-xl-2 dfjcac">
                                <a href='/product-page' onClick={(e) => { handleProductPage(item.product[0]._id); }}>
                                  <img className="img-fluid rounded-3" src={item.product[0].image} alt='img'
                                    height={200}
                                    width={140} />
                                </a>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-muted">{item.product[0].category}</h6>
                                <a href='/product-page' onClick={(e) => { handleProductPage(item.product[0]._id); }}>
                                  <h6 className="text-black mb-0">{item.product[0].productName}</h6>
                                </a>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button disabled={item.quantity == 1} className="btn btn-link px-2" onClick={(e) => { e.preventDefault(); handleIncDec(item._id, -1); }}>
                                  <FontAwesomeIcon icon={faMinus} size="lg" style={{ color: "#121212" }} />
                                </button>

                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={item.quantity}
                                  type="number"
                                  className="form-control form-control-sm"
                                  readOnly // Make the input read-only to prevent manual input
                                />

                                <button className="btn btn-link px-2" onClick={(e) => { e.preventDefault(); handleIncDec(item._id, 1); }}>
                                  <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "#121212" }} />
                                </button>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0 text-green bold"><small className='text-dark'>Price: &nbsp; </small>Rs.{item.product[0].price}/-</h6>
                              </div>
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a onClick={(e) => { e.preventDefault(); handleDelete(item._id) }} href="/" className="text-muted">
                                  <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#de0202", }} />
                                </a>
                              </div>
                            </div>
                        
                          )
                        })
                        }


                        {/* <hr className="my-4" /> */}

                        <div className="pt-5">
                          <h6 className="mb-0"><a href="/allProducts" className="text-body">
                            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#000000", }} /> &nbsp; Back to shop</a></h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey rounded-4 p-1">
                      <div className="p-2">
                        <h3 className="fw-bold mb-1 mt-0 pt-0">Summary</h3>
                        <hr className="my-3" />

                        <div className="row">
                          <div className="col-7">
                            <h6 className="text-uppercase">piece - {cartProducts == null ? 0 : totalPiece}</h6>
                          </div>
                          <div className="col-5">
                            <h6 className='text-green bold text-align-right'>Rs.{itemsAmount}/-</h6>
                          </div>
                        </div>

                        <h6 className="text-uppercase my-1 text-danger bold">Coupon Code</h6>

                        <div className="mb-1">
                          <div className="form-outline">
                            <input disabled={true} type="text" id="form3Examplea2" className="form-control form-control-md border bg-secondary text-light" placeholder='Temporarily Unavailable' />

                          </div>
                        </div>

                        <hr className="my-4" />
                        <div className="row">
                          <div className="col-6">
                            <h6 >Taxable Amount</h6>
                          </div>
                          <div className="col-6">
                            <h6 className='text-green bold text-align-right'>Rs.{itemsAmount}/-</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h6 >GST - 18%</h6>
                          </div>
                          <div className="col-6">
                            <h6 className='text-green bold text-align-right'>Rs.{gst}/-</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-7">
                            <h6 >Shipping Charge</h6>
                          </div>
                          <div className="col-5">
                            <h6 className='text-primary text-align-right'>Free</h6>
                          </div>
                        </div>

                        <hr className="my-2" />

                        <div className="row mt-2">
                          <div className="col-6">
                            <h6 className='bold'>Total Amount</h6>
                          </div>
                          <div className="col-6">
                            <h6 className='text-green bold text-align-right'>Rs.{(parseFloat(itemsAmount) + parseFloat(gst)).toFixed(2)}/-</h6>
                          </div>
                        </div>

                        {/* payment select */}
                        <div>
                          <label htmlFor="paymentMethod">Select Payment Method:</label>
                          <select
                            className='form-control'
                            id="paymentMethod"
                            value={selectedMethod}
                            onChange={handleSelectChange}
                          >
                            <option disabled={true} value="">Select a Payment Method</option>
                            <option value="Stripe">Stripe</option>
                            <option value="COD">Cash On Delivery</option>
                          </select>

                          {selectedMethod && (
                            <div className='mt-2 bold'>
                              <p className='text-green'>Selected Payment Method: <span className='text-dark'>{selectedMethod}</span></p>
                            </div>
                          )}
                        </div>
                        {/* payment select */}
                        <button disabled={selectedMethod === '' || cartProducts.length === 0} onClick={handleCheckoutBtn} type="button" className="btn btn-dark btn-block btn-lg w-100 mt-2"
                          data-mdb-ripple-color="dark">Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
