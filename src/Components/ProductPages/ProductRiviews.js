import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../StarRating';
import productContext from '../../CONTEXT/Context/productContext';
import toastContext from '../../CONTEXT/Context/toastContext';
import StarIcon from '../StarIcon';
import Spinner from '../Spinner';



export default function ProductRiviews(props) {
  const { showToast } = useContext(toastContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('userToken');
  const sellerToken = localStorage.getItem('sellerToken');
  const myProductContext = useContext(productContext);
  const { rating } = myProductContext;
  const [reviewInput, setReviewInput] = useState('');
  const [processing, setPProcessing] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [ratingArray, setRatingArray] = useState(null);

  const handleReviews = async () => {
    setPProcessing(true);
    try {
      if(token) {
        await fetch(`${apiUrl}/api/user/add-review`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ reviewInput: reviewInput, productId: props.productId, userFullName: localStorage.getItem('userFullName'), rating: rating })
        });
        window.location.reload();
      }else if(sellerToken){
        showToast('You are in a seller account', 'warn');
      }else{
        navigate('/login');
        window.scrollTo(0,0);
        showToast('You must login first', 'warn');
      }
      setPProcessing(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Display Reviews
  const showReviews = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/show-reviews/${props.productId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setReviews(json.reviews.reverse());
      const ratingArray = json.reviews.map((e) => { return (e.rating) });
      setRatingArray(ratingArray);
      console.log(ratingArray);

    } catch (error) {
      console.log(error);
    }
  }

  const onChange = (e) => {
    setReviewInput(e.target.value);
  }

  useState(() => {
    showReviews();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-4 col-md-5 col-12 mb-4 mb-lg-0 pr-lg-6">
            <div className="mb-6">
              <h4 className="mb-3">Customer reviews</h4>
              <span className="font-14"><i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="fas fa-star text-warning"></i><i className="far fa-star text-warning"></i></span>
              <span className="h5">{props.rating.toFixed(2)} out of 5</span>
              <p className="font-14">{reviews === null || undefined ? 0 : reviews.length} customer ratings</p>
              <div className="row align-items-center mb-1 ">
                <div className="col-md-2 col-2 pr-0">
                  <div className="font-12 text-dark">5 <StarIcon height='22' width='22' /></div>
                </div>
                <div className="col-md-8 col-8 pr-2">
                  <div className="progress" style={{ "height": "8px" }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ "width": `${ratingArray === null ? 0 : (ratingArray.filter(e => e === 1).length / reviews.length * 100).toFixed(0)}%` }} aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="col-md-2 col-2">
                  <div className="font-12 text-primary">{ratingArray === null ? 0 : (ratingArray.filter(e => e === 5).length / reviews.length * 100).toFixed(0)}%</div>
                </div>
              </div>
              <div className="row align-items-center mb-1">
                <div className="col-md-2 col-2 pr-0">
                  <div className="font-12 text-dark">4 <StarIcon height='22' width='22' /></div>
                </div>
                <div className="col-md-8 col-8 pr-2">
                  <div className="progress" style={{ "height": "8px" }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ "width": `${ratingArray === null ? 0 : (ratingArray.filter(e => e === 4).length / reviews.length * 100).toFixed(0)}%` }} aria-valuenow="12" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="col-md-2 col-2">
                  <div className="font-12 text-primary">{ratingArray === null ? 0 : (ratingArray.filter(e => e === 4).length / reviews.length * 100).toFixed(0)}%</div>
                </div>
              </div>
              <div className="row align-items-center mb-1">
                <div className="col-md-2 col-2 pr-0">
                  <div className="font-12 text-dark">3 <StarIcon height='22' width='22' /></div>
                </div>
                <div className="col-md-8 col-8 pr-2">
                  <div className="progress" style={{ "height": "8px" }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ "width": `${ratingArray === null ? 0 : (ratingArray.filter(e => e === 3).length / reviews.length * 100).toFixed(0)}%` }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="col-md-2 col-2">
                  <div className="font-12 text-primary">{ratingArray === null ? 0 : (ratingArray.filter(e => e === 3).length / reviews.length * 100).toFixed(0)}%</div>
                </div>
              </div>
              <div className="row align-items-center mb-1">
                <div className="col-md-2 col-2 pr-0">
                  <div className="font-12 text-dark">2 <StarIcon height='22' width='22' /></div>
                </div>
                <div className="col-md-8 col-8 pr-2">
                  <div className="progress" style={{ "height": "8px" }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ "width": `${ratingArray === null ? 0 : (ratingArray.filter(e => e === 2).length / reviews.length * 100).toFixed(0)}%` }} aria-valuenow="2" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="col-md-2 col-2">
                  <div className="font-12 text-primary">{ratingArray === null ? 0 : (ratingArray.filter(e => e === 2).length / reviews.length * 100).toFixed(0)}%</div>
                </div>
              </div>
              <div className="row align-items-center mb-2">
                <div className="col-md-2 col-2 pr-0">
                  <div className="font-12 text-dark">1 <StarIcon height='22' width='22' /></div>
                </div>
                <div className="col-md-8 col-8 pr-2">
                  <div className="progress" style={{ "height": "8px" }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ "width": `${ratingArray === null ? 0 : (ratingArray.filter(e => e === 1).length / reviews.length * 100).toFixed(0)}%` }} aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="col-md-2 col-2">
                  <div className="font-12 text-primary">{ratingArray === null ? 0 : (ratingArray.filter(e => e === 1).length / reviews.length * 100).toFixed(0)}%</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-1">Review this {props.productName}</h4>
              <p className="font-12 ">Share your thoughts with other customers</p>
            </div>
          </div>
          <div className="col-lg-8 col-md-7 col-12">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h4 className="mb-0">Ratings &amp; Reviews</h4>
              </div>
            </div>

            <div className='mb-4'>
              <StarRating />

              {/* write reviews */}
            </div>
            <div className="row">
              <div className="col-10">
                <div className="mb-4 pb-0 border-bottom">
                  <input type='text' onChange={onChange} value={reviewInput} name='reviewInput' className='form-control input-review fs-5' placeholder='Write your review...' />
                </div>

              </div>
              <div className="col-2 dfjcac">
                <div className="mb-4 pb-0">
                  <button disabled={rating === 0 || reviewInput === ''} onClick={handleReviews} className='btn btn-danger btn-lg'>
                  { processing === true ? <Spinner height='30' width='30' /> : 'POST'}
                    </button>
                </div>
              </div>
            </div>


            {reviews === null || undefined ? 'NO REVIEWS' : reviews.map((el) => {
              return (
                <div className="mb-1 box-shadow-light rounded-4 p-3">
                  <div className="d-flex  align-items-center">
                    <img src="../assets/images/avatar-1.png" alt="" className="rounded-circle avatar-lg" />
                    <div className="ml-2">
                      <h5 className=" bold">
                        <span>{el.customerName}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>
                          {el.rating === 1 ? <StarIcon height='22' width='22' /> : ''}
                          {el.rating === 2 ? <><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /></> : ''}
                          {el.rating === 3 ? <><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /></> : ''}
                          {el.rating === 4 ? <><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /></> : ''}
                          {el.rating === 5 ? <><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /><StarIcon height='22' width='22' /></> : ''}
                        </span>
                        {/* <img src="../../images/cover.jpg" alt="adil" /> */}
                      </h5>
                      <p className="font-12 mb-0 text-secondary">
                        <span>{el.date.slice(0, 10)}</span>
                      </p>
                      <p className='mt-2'>{el.review}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
