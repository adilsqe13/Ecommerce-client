import React from 'react';
import './Styles/Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Contacts() {
    return (
        <>
            <div className="container contact-container mt-4">
                <section className="mb-4">
                    <h1 className="h1-responsive font-weight-bold text-center my-4 bold">Contact us</h1>
                    <p className="text-center w-responsive mx-auto mb-5 text-primary bold">Do you have any questions? Please do not hesitate to contact us
                        directly. Our team will come back to you within
                        a matter of hours to help you.</p>
                    <div className="row">
                        <div className="col-md-9 mb-md-0 mb-5">
                            <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="md-form mb-0">
                                            <input type="text" id="name" name="name" className="form-control input-data" placeholder="Your Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="md-form mb-0">
                                            <input type="email" id="email" name="email" className="form-control input-data" placeholder="E-mail" />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="md-form mb-0">
                                            <input type="text" id="subject" name="subject" className="form-control input-data"
                                                placeholder="Write Your Subject" />

                                        </div>
                                    </div>
                                </div>
                                <br />

                                <div className="row">


                                    <div className="col-md-12">

                                        <div className="md-form">
                                            <textarea type="text" id="message" name="message" rows="7" className="form-control md-textarea"
                                                placeholder="Write Your Query"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br />
                            <div className="text-center text-md-left">
                                <button className="btn btn-success btn-lg" type="submit">Submit</button>
                            </div>
                            <div className="status"></div>
                        </div>
                        <div className="col-md-3 text-center">
                            <ul className="list-unstyled mb-0">
                                <li><i className="fas fa-map-marker-alt fa-2x"></i>
                                    <FontAwesomeIcon icon={faLocationDot} size="2xl" style={{ color: "#e60f0f", }} />
                                    <p className='bold'>G.T Road , Asansol , WB, India</p>
                                </li>
                                <br />
                                <li><i className="fas fa-phone mt-4 fa-2x"></i>
                                    <FontAwesomeIcon icon={faPhone} size="2xl" style={{ color: "#0ba21d", }} />
                                    <p className='bold'>+91 700 148 7137</p>
                                </li>
                                <br />
                                <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                                    <FontAwesomeIcon icon={faEnvelope} size="2xl" style={{ color: "#760505", }} />
                                    <p className='bold'>adilsqe13@gmail.com</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
