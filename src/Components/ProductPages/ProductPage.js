import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productContext from '../../CONTEXT/Context/productContext';
import toastContext from '../../CONTEXT/Context/toastContext';
import ProductRiviews from '../ProductPages/ProductRiviews';
import Spinner from '../Spinner';
import '../Styles/ProductPage.css';

export default function ProductPage() {
  const token = localStorage.getItem('userToken');
  const sellerToken = localStorage.getItem('sellerToken');
  const [quantity, setQuantity] = useState(1);
  const myProductContext = useContext(productContext);
  const myToastContext = useContext(toastContext);
  const { product, addToCart, makePayment } = myProductContext;
  const { showToast } = myToastContext;
  const navigate = useNavigate();

  const handleAddToCart = async (id) => {
    const response = await addToCart(id);
    if (response === false) {
      navigate('/login');
    }
  }
  const handlePlusMinus = (incdec) => {
    if (incdec === 1) {
      setQuantity(quantity + 1);
    } else if (incdec === -1) {
      setQuantity(quantity - 1);
    }
  }
  const handleBuyNow = () => {
    if (token) {
      makePayment(quantity);
    } else if (sellerToken) {
      showToast('You are in a seller account', 'warn');
    } else {
      navigate('/login');
      showToast('You Must Login First', 'warn');
    }
  }
  return (
    <>
      {product == null ? <Spinner height='70' width='70' /> : <section className="py-4">
        <div className="container">
          <div className="row">
            <aside className="col-lg-6 ">
              <div className="rounded-4 mb-3 d-flex justify-content-center">
                <img style={{ maxWidth: "100%", maxHeight: "100vh", "margin": "auto" }} className="rounded-4 fit" src={product.image} alt='img' height={500} width={500} />
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                  {product.productName}
                </h4>
                <div className="d-flex flex-row my-2">
                  <div className="text-warning mb-1 me-2">
                    <span className="ms-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-star-fill text-warning pb-1" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>  <span className='bold fs-5'>{product.rating.toFixed(2)}</span>
                    </span>
                  </div>
                  <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{product.stockQuantity}</span>
                  <span className="text-success ms-2">In stock</span>
                </div>

                <div className="mb-3">
                  <span className="h5 text-green-light bold">Rs.{product.price}/-</span>
                  <span className="text-muted"> /per order</span>
                </div>

                <p>
                  Modern look and quality demo item is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown clothing low-top shirts for
                  men.
                </p>

                <div className="row">
                  <dt className="col-3">For</dt>
                  <dd className="col-9">{product.category}</dd>

                  <dt className="col-3">Type</dt>
                  <dd className="col-9">{product.subCategory}</dd>

                  <dt className="col-3">Color</dt>
                  <dd className="col-9">{product.color}</dd>


                  <dt className="col-3">Brand</dt>
                  <dd className="col-9">{product.brand}</dd>

                  <dt className="col-3">Seller</dt>
                  <dd className="col-9">{product.companyName}</dd>
                </div>

                <hr />

                <div className="row mb-4">
                  <div className="col-md-4 col-6 mb-3">
                    <label className="mb-2 d-block">Quantity</label>
                    <div className="input-group mb-3" style={{ "width": "170px" }}>
                      <button disabled={quantity === 1} onClick={() => { handlePlusMinus(-1) }} className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                        -
                      </button>
                      <input type="text" className="form-control text-center border border-secondary" value={quantity} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                      <button onClick={() => { handlePlusMinus(1) }} className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => { handleBuyNow() }} className=" rounded-3 btn btn-success bn-btn shadow-0 height-50 dfjcac"> Buy now </button>
                  <a onClick={(e) => { handleAddToCart(product._id); e.preventDefault(); }} href="/cart-page" className="rounded-3 btn btn-dark shadow-0 atc-btn height-50 dfjcac"> Add to cart </a>
                </div>
              </div>
            </main>
          </div>
        <ProductRiviews productId={product._id} rating={product.rating} productName={product.productName} />
        </div>
      </section>}

    </>
  )
}
