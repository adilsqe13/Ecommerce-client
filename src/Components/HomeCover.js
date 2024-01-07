import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/HomeCover.css'

export default function HomeCover() {
  return (
    <>
      <div id="cover-container-1" className="cover-container-1">
        <div id="cover-container-2" className="cover-container-2">
          <div className="cover-logo-slogan-box">
            <div className="cover-logo-box">
              <span className="cover-my">mY</span> &nbsp; <span className="cover-shopper">ShoPper</span>
            </div>
            <div id="slogan-box-1">
              <span className="slogan-1">"Your One-Stop Online Shop"</span>
            </div>
            <div id="slogan-box-2">

              <span className="slogan-2">Experience Shopping Without Borders!</span>
            </div>
            <div id="shop-btn-box">
              <Link to="/allProducts"><button className="shop-now-btn btn-success btn">Shop Now</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
