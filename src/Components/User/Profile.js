import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toastContext from '../../CONTEXT/Context/toastContext'

export default function SellerProfile() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const myToastContext = useContext(toastContext);
    const { showToast } = myToastContext;
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    const [userProfile, setUserProfile] = useState("");
    const [userId, setUserId] = useState("");
    const profile = async () => {
        const response = await fetch(`${apiUrl}/api/auth/user/get-user-profile`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
        try {
            const json = await response.json();
            setUserProfile(json[0]);
            setUserId(json[0]._id.slice(5, 10));
        } catch (error) {
            console.error(error);
        }

    }

    const handleEditProfile = () => {
        navigate('/update-profile');
        window.scrollTo(0, 0);
    }
    const handleDeleteAccount = async () => {
        try {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userFullName');
            navigate('/register');
            window.scrollTo(0, 0);
            showToast('Account Deleted', 'warn');
            await fetch(`${apiUrl}/api/user/delete-account`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });
        } catch (error) {
            console.log(error);
            showToast('Something went wrong', 'warn');
        }

    }
    useEffect(() => {
        profile();
    }, [])

    return (
        <>
            <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
                <div className="container-fluid py-5 h-100">
                    <h1 className='dftcac'><span className='margin-auto bold'> User Profile</span></h1>
                    <div className="row mt-4 d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ bordertopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                        <h6 className='text-dark'>User Id</h6>
                                        <h5 className='text-dark bold'>U{userId}123</h5>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h3>{userProfile.fullName}</h3>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{userProfile.email}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">{userProfile.mobile}</p>
                                                </div>
                                            </div>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Company Name</h6>
                                                    <p className="text-muted">None</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Address</h6>
                                                    <p className="text-muted">{userProfile.address}</p>
                                                </div>
                                            </div>

                                            <div className="row mt-4">
                                                <div className="col-6">
                                                    <button onClick={handleEditProfile} className='btn btn-warning'>Edit Profile</button>

                                                </div>
                                                <div className="col-6">
                                                    <button onClick={handleDeleteAccount} className='btn btn-danger'>Delete</button>

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
