import React from 'react';
import './Styles/MiniHeader.css';

export default function MiniHeader() {
  return (
    <>
      <div className=" nav-container" id="nav-container">
        <div className="left-mini-container"></div>
        <div className="nav-mini-container ">
          <a href="/home-page">
            <div className="box">Home</div>
          </a>
          <a href="/allProducts">
            <div className="box">All Products</div>
          </a>
          <div className="box" id="mens">
            <div className="custom-dropdown">
              Men's <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path
                  d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
              <div className="custom-dropdown-content">
                <a href="/mens-allProducts" className="ddc">All Products</a><br />
                <hr />
                <a href="/mens-shirts" className="ddc">Shirts</a><br />
                <hr />
                <a href="/mens-pants" className="ddc">Pants</a><br />
                <hr />
                <a href="/mens-hoodies" className="ddc">Hoodies</a>
              </div>
            </div>
          </div>
          <div className="box" id="womens">
            <div className="custom-dropdown">
              Women's <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path
                  d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
              <div className="custom-dropdown-content">
                <a href="/womens-allProducts" className="ddc">All Products</a><br />
                <hr />
                <a href="/womens-tops" className="ddc">Tops</a><br />
                <hr />
                <a href="/womens-pants" className="ddc">Pants</a><br />
                <hr />
                <a href="/womens-dresses" className="ddc">Dresses</a>
              </div>
            </div>
          </div>
          <a href="/kids-allProducts">
            <div className="box">Kid's</div>
          </a>
          <a href="/contacts">
            <div className="box">Contact</div>
          </a>
        </div>
        <div className="right-mini-container"></div>
      </div>
    </>
  )
}
