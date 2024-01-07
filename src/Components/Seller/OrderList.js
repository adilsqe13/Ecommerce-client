import React, { useEffect, useState } from 'react';

export default function MyOrders() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('sellerToken');
    const [orders, setOrders] = useState([]);

    const orderPage = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/seller/seller-orders`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
            });
            const json = await response.json();
            setOrders(json.reverse());
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        orderPage();
    }, []);

    return (
        <>
            <section style={{ backgroundColor: "#ffffff" }}>
                <div className="container py-5">
                    <h1>Seller Orders <small className='h5 text-secondary'>&nbsp; &nbsp; {orders.length} - Orders</small></h1>
                    <div className="row justify-content-center mb-3 mt-4">
                        {orders.map((item, index) => {
                            return (
                                <div key={index} className="col-md-12 col-xl-12">
                                    <div className="card shadow-0 box-shadow-light rounded-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                        <img className="img-fluid rounded-3" src={require(`../../images/${item.product[0].image}`)} alt='img'
                                                            height={168}
                                                            width={168} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-xl-6">
                                                    <h5>{item.product[0].productName}</h5>
                                                    <div className="d-flex flex-row">
                                                        <div className="text-warning bold mb-1 me-2">
                                                            <i className="fa fa-star">{item.product[0].rating.toFixed(2)} <span className='text-green'> rating</span></i>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h6><span className='bold'>Order Id:</span> &nbsp;<span className='text-danger'> {item._id}</span> </h6>
                                                        <h6><span className='bold'>Quantity:</span> &nbsp;<span className='text-dark'> {item.quantity}</span> </h6><br />
                                                        <h6><span className='bold'>Address:</span> &nbsp;<span className='text-dark'> {item.address}, {item.city}, {item.state}, {item.postalCode}</span> </h6>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                    <div className='row'>
                                                        <div className="col-7">
                                                            <small className='fs-6'>Rs. </small><span className='text-green bold fs-5'>{item.amount}/-</span>
                                                        </div>
                                                        <div className="col-5 text-info">
                                                            <small className='fs-6 bold'>{item.paymentMethod}</small>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column margin-top-lg">
                                                        <button className="btn btn-warning btn-sm" type="button">Confirm Shipment</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
