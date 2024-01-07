import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Styles/Slider.css';
import wTop from '../images/womens-img/3.jpg';
import lPinkTrowser from '../images/womens-img/9.jpg';
import blackHoody from '../images/mens-img/23.jpg';
import yellowHoody from '../images/mens-img/20.jpg';
import kneeCutPant from '../images/womens-img/12.jpg';
import cropTop from '../images/womens-img/19.jpg';
import formalShirt from '../images/mens-img/1.jpg';

function CardSlider() {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const initialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  const updateSlidesToShow = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1400) {
      setSlidesToShow(5);
    } else if (screenWidth >= 992) {
      setSlidesToShow(4);
    } else if (screenWidth >= 768) {
      setSlidesToShow(3);
    } else if (screenWidth >= 490) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(1);
    }
  }
  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const settings = {
    ...initialSettings,
    slidesToShow,
  };

  return (
    <>
      <div className="heading">
        <span>Featured Products</span>
      </div>
      <div className="container">
        <div className=' container-fluid w-3/4 m-auto'>
          <div className=" mt-20">
            <Slider {...settings}>
              {data.map((d, index) => (
                <div key={index} className="card">
                  <img src={d.img} alt="..." className="card-img-top" />
                  <div className="card-body">
                    <span className="card-title">{d.title}</span> <br />
                    <span className="rate"><span>Rs.</span><strong> {d.salePrice}/-</strong> &nbsp;<span
                      style={{ fontSize: "15px" }}>Rs.</span><del> {d.markPrice}/-</del> </span><br />
                    <span className="seller"><em><strong>Seller:</strong> {d.seller}</em></span><br />
                    <span className="delivery-days">{d.deliveryDays}</span><br />
                    <div className="atc-btn-box">
                      <a href="/" className="btn btn-dark">
                        <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ffffff" }} /> &nbsp;
                        Add to Cart</a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

const data = [
  {
    title: `Designer Neck July Aastin Musturd Top`,
    img: wTop,
    salePrice: 12.48,
    markPrice: 18.04,
    seller: 'Mr. India Readymade',
    deliveryDays: 'Delivery with in 4-5 days',
  },
  {
    title: `Women's Trouser Pink Colour Awesome Looks`,
    img: lPinkTrowser,
    salePrice: 25.34,
    markPrice: 29.78,
    seller: 'Mr. India Readymade',
    deliveryDays: 'Delivery with in 1-2 days',
  },
  {
    title: `Formal Official Hoody For Men Gray`,
    img: blackHoody,
    salePrice: 22.18,
    markPrice: 32.56,
    seller: 'Mr. India Readymade',
    deliveryDays: 'Delivery with in 5-7 days',
  },
  {
    title: `Yellow Colour Hoody Best Choice For Men`,
    img: yellowHoody,
    salePrice: 24.09,
    markPrice: 28.31,
    seller: 'Mr. India Readymade',
    deliveryDays: 'Delivery with in 3-5 days',
  },
  {
    title: `Knee Cut Funky Look Bell Button Jeans`,
    img: kneeCutPant,
    salePrice: 33.09,
    markPrice: 38.31,
    seller: 'Mr. India Readymade',
    deliveryDays: 'Delivery with in 6-7 days',
  },
  {
    title: `Free Size Girls Croptop Chanderi Fabric`,
    img: cropTop,
    salePrice: 25.45,
    markPrice: 27.60,
    seller: 'Mr. India Readymade',
    deliveryDays: 'Delivery with in 1-3 days',
  },
  {
    title: `Men's White Formal Shirt With Cuff`,
    img: formalShirt,
    salePrice: 10.12,
    markPrice: 14.43,
    seller: 'Mr. India Readymade',
    deliveryDays: 'Delivery with in 2-4 days',
  },

];

export default CardSlider;