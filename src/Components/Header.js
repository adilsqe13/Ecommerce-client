import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Header.css';
import './Styles/mediaQuery.css';
import SideBar from '../Components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
  const navigate = useNavigate();
  const sellerToken = localStorage.getItem('sellerToken');
  const sellerName = localStorage.getItem('sellerFullName');
  const userToken = localStorage.getItem('userToken');
  const userName = localStorage.getItem('userFullName');
  const adminToken = localStorage.getItem('adminToken');
  const adminName = localStorage.getItem('adminName');
  const handleSellerLogout = () => {
    localStorage.removeItem('sellerToken');
    localStorage.removeItem('sellerFullName');
  }
  const handleUserLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('productPageId');
  }
  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
  }
  return (
    <>
      <header id="header">
        <div className="middle-box">
          <div className="middle-main-box">
            <a href="/">
              <div className="logo-box">
                <span className="my">mY</span> &nbsp; <span className="shopper">ShoPper</span>
              </div>
            </a>
            <div className="search-box">
              <input id="search-input" type="search" placeholder="Search for products, brands and more" />
              <button className="btn btn-success" id="search-btn">Search</button>
            </div>
            {!sellerToken && !userToken && !adminToken && <a href='/login'>
              <div className="login-box">
                <button id="login-btn">Login</button>
              </div>
            </a>}
            {!sellerToken && !userToken && !adminToken && <a href='/seller-login'>
              <div className="login-box">
                <button id="login-btn">Seller</button>
              </div>
            </a>}
            {!sellerToken && !userToken && !adminToken && <a href="/admin-login">
              <div className="cart-box" id="cart-box">
                &nbsp; <span>Admin</span>
              </div>
            </a>}
            {sellerToken &&
              <div className="dropdown d-flex">
                <button className="btn btn-dark dropdown-toggle hover-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mb-1 bi bi-person-lines-fill" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                  </svg> &nbsp;
                  <small>{sellerName}</small>
                </button>
                <ul className="dropdown-menu box-shadow mt-1 p-0 bg-dark">
                  <li className='border border-dark py-1 hover-dark'><a className="dropdown-item hover-dark" href='/seller-profile'><span className='text-light'>Profile</span></a></li>
                  <li className='border border-dark py-1 hover-dark'><a className="dropdown-item hover-dark" href='/seller-orders'><span className='text-light'>Orders</span></a></li>
                  <li className='border border-dark py-1 hover-dark'><a className="dropdown-item hover-dark" href='/seller-addProduct'><span className='text-light'>Add Product</span></a></li>
                  <li className='border border-dark py-1 hover-dark'><a className="dropdown-item hover-dark" href='/seller-allProducts'><span className='text-light'>All Products</span></a></li>
                  <li className='border border-dark py-1 hover-dark'><a onClick={handleSellerLogout} href='/seller-login' className="dropdown-item hover-dark"><span className='text-danger bold'>Logout</span></a></li>
                </ul>
              </div>
            }
            {userToken &&
              <div className="dropdown d-flex">
                <button className="btn btn-dark dropdown-toggle hover-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill mb-1" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg> &nbsp;
                  <small>{userName}</small>
                </button>
                <ul className="dropdown-menu box-shadow mt-1 p-0 bg-dark">
                  <li className='border border-dark py-1 hover-dark'><a className="dropdown-item hover-dark" href='/profile'><span className='text-light'>Profile</span></a></li>
                  <li className='border border-dark py-1 hover-dark'><a className="dropdown-item hover-dark" href='/my-orders'><span className='text-light'>My Orders</span></a></li>
                  <li className='border border-dark py-1 hover-dark'><a onClick={handleUserLogout} href='/login' className="dropdown-item hover-dark"><span className='text-danger bold'>Logout</span></a></li>
                </ul>
              </div>
            }
            {adminToken &&
              <div className="dropdown d-flex">
                <button className="btn btn-dark dropdown-toggle hover-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill mb-1" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg> &nbsp;
                  <small>{adminName}</small>
                </button>
                <ul className="dropdown-menu box-shadow mt-1 p-0 bg-dark">
                  <li className='border border-dark py-1 hover-dark'><Link className="dropdown-item hover-dark" to='/dashboard'><span className='text-light'>Dashboard</span></Link></li>
                  <li className='border border-dark py-1 hover-dark'><a onClick={handleAdminLogout} href='/admin-login' className="dropdown-item hover-dark"><span className='text-danger bold'>Logout</span></a></li>
                </ul>
              </div>
            }
            {!sellerToken && !adminToken && <Link to="/cart-page">
              <div className="cart-box" id="cart-box">
                <FontAwesomeIcon icon={faCartShopping} size="lg" style={{ color: "#ffffff" }} />
                &nbsp; <span> Cart</span>
              </div>
            </Link>}

          </div>
        </div>
      </header>
      <SideBar />

      {/* Search box for mini-screen */}
      <div id="search-box-2">
        <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" width="37" height="41" fill="currentColor"
          className="bi bi-search" viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <input id="search-input-2" type="search" placeholder="Search for products, brands and more" />
      </div>
    </>
  )
}
