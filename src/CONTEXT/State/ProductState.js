import React, { useState, useContext, useEffect } from 'react';
import productContext from '../Context/productContext';
import toastContext from '../Context/toastContext';
import { loadStripe } from '@stripe/stripe-js';

export default function ProductState(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const myToastContext = useContext(toastContext);
  const { showToast } = myToastContext;
  const token = localStorage.getItem('userToken');
  const sellerToken = localStorage.getItem('sellerToken');
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);

  //PRODUCT PAGE: fetch product using product Id
  const productPage = async (id) => {
    try {
      if (id !== undefined) {
        localStorage.setItem('productPageId', id);
      }
      const productId = localStorage.getItem('productPageId');
      const response = await fetch(`${apiUrl}/api/product-page/${productId}`, {
        mrthod: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      });
      const json = await response.json();
      setProduct(json);
    } catch (error) {
      console.log(error);
    }
  }

  //ADD TO CART FUNCTION
  const addToCart = async (productId) => {
    if (token) {
      try {
        const response = await fetch(`${apiUrl}/api/user/add-to-cart`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          body: JSON.stringify({ productId: productId }),
        });
        const json = await response.json();
        if (json.success) {
          showToast('Added to cart', 'success');
        } else {
          const errorMsg = await json.errors[0].msg || json.error;
          showToast(errorMsg, 'error');
        }
      } catch (error) {
        console.log(error);
      }
    } else if (sellerToken) {
      return showToast('You are in a seller account', 'warn');
    } else {
      showToast('You Must Login First', 'warn');
      let success = false;
      return success;
    }
  }

  //Buy Now - Payment  Integration
  const makePayment = async (quantity) => {
    const stripe = await loadStripe("pk_test_51OD0ZASG3BK2RYvPgKnOV8sYNDtsQc5rzrVgaQgUqDKjVGt8C0DIGhXZPc1TJ7nm0ohaYpI2ZsJP6vBesNjfQWZp00EIYQsrMR");
    const response = await fetch(`${apiUrl}/api/user/checkout-session-buyNow`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ product: product, quantity: quantity })
    });

    const json = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: json.id
    });

    if (result.error) {
      console.log(result.error);
    }
  }

  useEffect(() => {
    productPage();
  }, []);

  return (
    <>
      <productContext.Provider value={{ product, productPage, addToCart, rating, setRating, makePayment }}>
        {props.children}
      </productContext.Provider>
    </>
  )
}
