import React, { useEffect, useState } from 'react';

export default function SellerProfile() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("sellerToken");
    const [sellerProfile, setSellerProfile] = useState("");
    const [sellerId, setSellerId] = useState("");
    const profile = async () => {
        const response = await fetch(`${apiUrl}/api/auth/seller/get-seller-profile`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
        try {
            const json = await response.json();
            setSellerProfile(json[0]);
            setSellerId(json[0]._id.slice(5, 10));
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        profile();
    }, [])

    return (
        <>
            <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
                <div className="container-fluid py-5 h-100">
                    <h1 className='dftcac'><span className='margin-auto'>Seller Profile</span></h1>
                    <div className="row mt-4 d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ bordertopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                        <h6 className='text-dark'>Seller Id</h6>
                                        <h5 className='text-dark bold'>S{sellerId}123</h5>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h3>{sellerProfile.fullName}</h3>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{sellerProfile.email}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">+91 {sellerProfile.mobile}</p>
                                                </div>
                                            </div>
                                            {/* <h6>Company</h6> */}
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Company Name</h6>
                                                    <p className="text-muted">{sellerProfile.companyName}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Company Address</h6>
                                                    <p className="text-muted">{sellerProfile.companyAddress}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
