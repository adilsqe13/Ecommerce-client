import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import productContext from '../../CONTEXT/Context/productContext';
import { loadStripe } from '@stripe/stripe-js';
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
  const [processing, setProcessing] = useState(false);
  const [userAddress, setUserAddress] = useState({ address: '', city: '', state: '', postalCode: '' });
  const navigate = useNavigate();

  const handlePage = async () => {
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
      setUserAddress({
        address: json.userCartProducts[0].address,
        city: json.userCartProducts[0].city,
        state: json.userCartProducts[0].state,
        postalCode: json.userCartProducts[0].postalCode,
      });
      setSelectedMethod(json.userCartProducts[0].paymentMethod);
    } catch (error) {
      console.log(error);
      if (!token) {
        navigate('/login');
      }
    }
  }

  const handleProductPage = async (productId) => {
    await productPage(productId);
    navigate('/product-page');
  }

  //Payment  Integration
  const makePayment = async () => {
    setProcessing(true);
    if (selectedMethod === 'Stripe') {
      const stripe = await loadStripe("pk_test_51OD0ZASG3BK2RYvPgKnOV8sYNDtsQc5rzrVgaQgUqDKjVGt8C0DIGhXZPc1TJ7nm0ohaYpI2ZsJP6vBesNjfQWZp00EIYQsrMR");
      const response = await fetch(`${apiUrl}/api/user/checkout-session`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify(cartProducts)
      });

      const json = await response.json();
      const result = stripe.redirectToCheckout({
        sessionId: json.id
      });

      if (result.error) {
        console.log(result.error);
      }
    } else if (selectedMethod === 'COD') {
      navigate('/order-success');
    }
  }

  useEffect(() => {
    handlePage();
  }, []);

  return (
    <>
      <section className="h-100 h-custom margin-top-minus" style={{ "background-color": "#ffffff" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card card-registration card-registration-2" style={{ "border-radius": "15px" }}>
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-0">
                          <h1 className="fw-bold mb-0 text-black">Order Page</h1>
                          <h6 className="mb-0 text-muted">{cartProducts == null ? 0 : cartProducts.length} items</h6>
                        </div>
                        <hr className="my-4" />
                        <h4 className='text-danger'>{cartProducts === null ? '' : cartProducts.length === 0 ? 'Yout cart is empty' : ''}</h4>
                        {cartProducts === null ? <Spinner height='70' width='70' /> : cartProducts.map((item, index) => {
                          return (
                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <Link to='/product-page' onClick={(e) => { e.preventDefault(); handleProductPage(item.product[0]._id); }}>
                                  <img className="img-fluid rounded-3" src={item.product[0].image} alt='img'
                                    height={200}
                                    width={140} />
                                </Link>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-muted">{item.product[0].category}</h6>
                                <Link to='/product-page' onClick={(e) => { e.preventDefault(); handleProductPage(item.product[0]._id); }}>
                                  <h6 className="text-black mb-0">{item.product[0].productName}</h6>
                                </Link>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0 text-green bold"><small className='text-dark'>Price: &nbsp; </small>Rs.{item.product[0].price}</h6>
                              </div>
                            </div>
                          )
                        })
                        }
                        <hr className="my-4" />
                        <div className="container">
                          <h3 className='bold'>Shipping Address
                            &nbsp; <Link to='/shipping-address'><FontAwesomeIcon icon={faPenToSquare} size='sm' style={{ color: "#797a7a", }} /></Link>
                          </h3>
                          <div className="row mt-3">
                            <div className="col-lg-4 bold">
                              Address:
                            </div>
                            <div className="col-lg-8">
                              {userAddress.address}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-2 bold">City:</div>
                            <div className="col-lg-2">{userAddress.city}</div>
                            <div className="col-lg-2 bold">State:</div>
                            <div className="col-lg-2">{userAddress.state}</div>
                            <div className="col-lg-2 bold">Pincode:</div>
                            <div className="col-lg-2">{userAddress.postalCode}</div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-1 mt-0 pt-0">Summary</h3>
                        <hr className="my-3" />

                        <div className="row">
                          <div className="col-7">
                            <h6 className="text-uppercase">piece - {cartProducts == null ? 0 : totalPiece}</h6>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-7">
                            <h6 >Taxable Amount</h6>
                          </div>
                          <div className="col-5">
                            <h6 className='text-green bold text-align-right'>Rs.{itemsAmount}/-</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-7">
                            <h6 >GST - 18%</h6>
                          </div>
                          <div className="col-5">
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
                        <h6 className='bold'>Payment Method:<span className='text-info'> &nbsp; &nbsp; &nbsp;{selectedMethod}</span></h6>
                        <div className="row margin-top-lg">
                          <div className="col-7">
                            <h6 className='bold'>Total Amount</h6>
                          </div>
                          <div className="col-5">
                            <h6 className='text-green bold text-align-right'>Rs.{(parseFloat(itemsAmount) + parseFloat(gst)).toFixed(2)}/-</h6>
                          </div>
                        </div>

                        <button onClick={() => { makePayment(cartProducts) }} type="button" className="btn btn-danger btn-block btn-lg w-100 mt-4"
                          data-mdb-ripple-color="dark">
                            { processing === true ? <Spinner height='25' width='25' /> : 'Place Order'}
                            </button>

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
