import React from 'react';
import './Styles/Header.css';
import './Styles/mediaQuery.css';

export default function Navbar() {
  const sellerToken = localStorage.getItem('sellerToken');
  const sellerName = localStorage.getItem('sellerFullName');
  const userToken = localStorage.getItem('userToken');
  const userName = localStorage.getItem('userFullName');
  const handleSellerLogout = () => {
    localStorage.removeItem('sellerToken');
    localStorage.removeItem('sellerFullName');
  }
  const handleUserLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userFullName');
  }
  return (
    <>
      {/*  Mini screen side bar  */}
      <nav className="navbar navbar-dark bg-dark fixed-top" id="side-nav-bar">
        <div className="container-fluid">
          {/* <!-- Mini screen logo --> */}
          <div className="mini-screen-logo-box" id="min-logo-box">
            <a href='/home-page'>
              <span className="my">mY</span> &nbsp; <span className="shopper text-light">ShoPper</span>
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <span id="sidebar-logo">mY ShoPper</span>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  {sellerToken &&
                    <div className="d-flex pb-4">
                      <div aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1 bi bi-person-lines-fill " viewBox="0 0 16 16">
                          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                        </svg> &nbsp;
                        <small>{sellerName}</small>
                      </div>
                    </div>}
                  {userToken &&
                    <div className="d-flex pb-4">
                      <div aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill mb-1" viewBox="0 0 16 16">
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg> &nbsp;
                        <small>{userName}</small>
                      </div>
                    </div>}
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/home-page">Home</a>
                </li>
                {!sellerToken && <li className="nav-item">
                  <a className="nav-link" href="/cart-page">Cart</a>
                </li>}
                {userToken && <li className="nav-item">
                  <a className="nav-link" href="/my-orders">My Orders</a>
                </li>}
                <li className="nav-item">
                  <a className="nav-link" href="/kids-allProducts">Kid's</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Men's
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><a className="dropdown-item" href="/mens-allProducts">All Products</a></li>
                    <li><a className="dropdown-item" href="/mens-shirts">Shirts</a></li>
                    <li><a className="dropdown-item" href="/mens-pants">Pants</a></li>
                    <li><a className="dropdown-item" href="/mens-hoodies">Hoodies</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Women's
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><a className="dropdown-item" href="/womens-allProducts">All Products</a></li>
                    <li><a className="dropdown-item" href="/womens-tops">Tops</a></li>
                    <li><a className="dropdown-item" href="/womens-pants">Pants</a></li>
                    <li><a className="dropdown-item" href="/womens-dresses">Dresses</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/allProducts">All Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/allProducts">Featured Products</a>
                </li>
              </ul>
              <hr />
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {!sellerToken && !userToken && <li className="nav-item"><a className="nav-link active" aria-current="page" href="/login">Login</a></li>}
                {!sellerToken && !userToken && <li className="nav-item"><a className="nav-link active" aria-current="page" href="/seller-login">Seller</a></li>}
                {userToken && <li className="nav-item"><a className="nav-link active" aria-current="page" href="/profile">Profile</a></li>}
                {userToken && <li className="nav-item"><a className="nav-link active" aria-current="page" href="/my-orders">My Orders</a></li>}
                {sellerToken && <li className="nav-item"><a className="nav-link active" aria-current="page" href="/seller-profile">Profile</a></li>}
                {sellerToken && <li className="nav-item"><a className="nav-link active" aria-current="page" href="/seller-addProduct">Add Product</a></li>}
                {sellerToken && <li className="nav-item"><a className="nav-link active" aria-current="page" href="/seller-allProducts">All Products</a></li>}
                <li className="nav-item"><a className="nav-link active" aria-current="page" href="/contacts">Contact Us</a></li>
                {sellerToken && <li className='border border-dark py-1 hover-dark'><a onClick={handleSellerLogout} href='/seller-login' className="dropdown-item hover-dark"><span className='text-danger bold'>Logout</span></a></li>}
                {userToken && <li className='border border-dark py-1 hover-dark'><a onClick={handleUserLogout} href='/login' className="dropdown-item hover-dark"><span className='text-danger bold'>Logout</span></a></li>}
              </ul>
              <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success sbsb" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- End mini screen side bar --> */}
    </>
  )
}
