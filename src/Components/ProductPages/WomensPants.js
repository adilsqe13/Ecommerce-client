import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import toastContext from '../../CONTEXT/Context/toastContext';
import productContext from '../../CONTEXT/Context/productContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import '../Styles/AllProducts.css';
import { loadStripe } from '@stripe/stripe-js';

export default function AllProducts() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const myToastcontext = useContext(toastContext);
    const myProductcontext = useContext(productContext);
    const { showToast } = myToastcontext;
    const { productPage, addToCart } = myProductcontext;

    const token = localStorage.getItem('userToken');
    const sellerToken = localStorage.getItem('sellerToken');

    const [allProducts, setAllProducts] = useState(null);
    const [cartProducts, setCartProducts] = useState(null);

    const getWomensPants = async () => {
        const response = await fetch(`${apiUrl}/api/get-womens-pants`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        try {
            const json = await response.json();
            setAllProducts(json);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToCart = async (id) => {
        const response = await addToCart(id);
        if (response === false) {
            navigate('/login');
            window.scrollTo(0, 0);
        }
    }

    // Fetch user cart products
    const fetchCartProducts = async () => {
        const response = await fetch(`${apiUrl}/api/user/cart-products`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
        try {
            const json = await response.json();
            json.success ?
                setCartProducts(json.userCartProducts) : setCartProducts(null);
        } catch (error) {
            console.log(error);
        }
    }
    const handleProductPage = async (productId) => {
        await productPage(productId);
        navigate('/product-page');
        window.scrollTo(0, 0);
    }
    const handleBuyNow = async (productId) => {
        if (token) {
            const response = await fetch(`${apiUrl}/api/seller/get-a-product/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const product = await response.json();

            //Buy Now - Payment  Integration
            const stripe = await loadStripe("pk_test_51OD0ZASG3BK2RYvPgKnOV8sYNDtsQc5rzrVgaQgUqDKjVGt8C0DIGhXZPc1TJ7nm0ohaYpI2ZsJP6vBesNjfQWZp00EIYQsrMR");
            const response1 = await fetch(`${apiUrl}/api/user/checkout-session-buyNow`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify({ product: product[0], quantity: 1 })
            });

            const json = await response1.json();
            const result = stripe.redirectToCheckout({
                sessionId: json.id
            });

            if (result.error) {
                console.log(result.error);
            }

        } else if (sellerToken) {
            showToast('You are in a seller account', 'warn');
        } else {
            navigate('/login');
            window.scrollTo(0, 0);
            showToast('You Must Login First', 'warn');
        }
    }

    useEffect(() => {
        getWomensPants();
        fetchCartProducts();
    }, []);
    return (
        <>
            <div className="container allproducts-container">
                <div className="container heading-all-product">
                    <h2 className='bold'>Women's &nbsp;Pants</h2>
                </div>
                <div className="container-fluid items-all-products mt-3">
                    <div className="row">
                        {allProducts == null ? <Spinner height='70' width='70' /> : allProducts.map((item, index) => {
                            return (
                                <div key={index} className="col">
                                    <div className="card product-card">
                                        <a href='/product-page' onClick={(e) => { e.preventDefault(); handleProductPage(item._id); }}>
                                            <img className="card-img-top card-product-image" src={item.image} alt='img'/>
                                        </a>
                                        <div className="card-body p-0">
                                            <a href='/product-page' onClick={(e) => { e.preventDefault(); handleProductPage(item._id); }}>
                                                <div>
                                                    <h5 className="card-title card-title-2">{item.productName}</h5>
                                                    <span className="rate"><span>Rs.</span><strong>{item.price}</strong> &nbsp; &nbsp;
                                                    </span> <br />
                                                    <span className="delivery-days">Delivery with in 4-5 days</span>
                                                </div>   </a>
                                            <button disabled={cartProducts === null ? '' : cartProducts.filter((e) => e.productId === item._id).length > 0}
                                                onClick={(e) => { handleAddToCart(item._id); e.preventDefault(); }} href="/" className=" rounded-3 btn btn-dark atc-btn">
                                                <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ffffff" }} />
                                                &nbsp; {cartProducts === null ? 'Add to Cart'
                                                    : cartProducts.filter((e) => e.productId === item._id).length === 0 ? `Add to Cart`
                                                        : `Added`}</button><br />
                                            <button onClick={() => { handleBuyNow(item._id) }} className=" rounded-3 btn btn-success bn-btn">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
