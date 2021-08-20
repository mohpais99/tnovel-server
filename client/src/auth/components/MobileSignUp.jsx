import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from 'assets/images/logo2.png';
import { Link } from 'react-router-dom';

function MobileSignUp() {
    const [showPass, setShowPass] = React.useState(false)
    return (
        <div className="d-flex align-items-center d-lg-none d-xl-none" style={{minHeight: "100vh"}}>
            <Container>
                <Row className="row">
                    <Col sm="12">
                        <Row className="row text-center mb-5">
                            <Col sm="12" className="mx-auto">
                                <img src={logo} className="mx-auto" alt="" width="75" />
                            </Col>
                            <div className="col-auto mx-auto muli-ex-bold me-auto">
                                <h3 className="mb-0 mt-3">TNovel - Indonesia</h3>
                            </div>
                        </Row>
                        <form className="mt-5" noValidate>
                            <div className="form-group mb-4 animated fadeInUp">
                                <label className="font-12">Username / Email</label>
                                <input type="text" className="form-control my-input" name="username" id="username" placeholder="Enter username or email" required />
                            </div>
                            <div className="form-group mb-5 position-relative">
                                <label className="font-12">Password</label>
                                <div className={`w-100 ${showPass ? 'd-none': ''}`}>
                                    <input type="password" className="form-control my-input px-0" name="password" placeholder="Enter password" required />
                                    <i onClick={() => setShowPass(true)} className="bx bxs-hide cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                </div>
                                <div className={`w-100 ${!showPass ? 'd-none': ''}`}>
                                    <input type="text" className="form-control my-input px-0" name="password" placeholder="Enter password" required />
                                    <i onClick={() => setShowPass(false)} className="bx bxs-show cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                </div>
                            </div>
                            <div className="row">
                                <div className="my-auto col animated">
                                    <Link to="auth" className="text-brand"><u>Forgot Password?</u></Link>
                                </div>
                                <div className="my-auto col-auto">
                                    <Link to="auth/sign-in" className="px-4 btn btn-primary rounded-pill my-btn">
                                        <span className="trantition">Sign In</span>
                                        <i className="bx bxs-door-open d-inline ms-2 font-13"></i>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MobileSignUp;