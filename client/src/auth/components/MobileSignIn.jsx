import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from 'assets/images/logo2.png';
import { Link } from 'react-router-dom';

function MobileSignIn() {
    const [show, setShow] = React.useState(false)
    const [data, setData] = React.useState({
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    return (
        <div className="d-flex align-items-center d-lg-none d-xl-none" style={{minHeight: "100vh", overflow: "hidden"}}>
            <Container>
                <Row className="row">
                    <Col sm="12">
                        <Row className="row text-center mb-5">
                            <Col sm="12" className="mx-auto">
                                <img src={logo} className="mx-auto" alt="" width="75" />
                            </Col>
                            <div className="col-auto mx-auto muli-ex-bold me-auto">
                                <h3 className="mb-0 mt-2">TNovel - Indonesia</h3>
                            </div>
                        </Row>
                        <form className="mt-5" noValidate>
                            <div className="form-group mb-2">
                                <label className="font-12 mb-0">Username / Email</label>
                                <input type="text" className="form-control my-input px-0" onChange={handleChange} value={data.username} name="username" placeholder="Enter username" required />
                            </div>
                            <div className="form-group mb-2 position-relative">
                                <label className="font-12 mb-0">Password</label>
                                <div className={`w-100 ${show ? 'd-none': ''}`}>
                                    <input type="password" className="form-control my-input px-0" onChange={handleChange} value={data.password} name="password" placeholder="Enter password" required />
                                    <i onClick={() => setShow(true)} className="bx bxs-hide cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                </div>
                                <div className={`w-100 ${!show ? 'd-none': ''}`}>
                                    <input type="text" className="form-control my-input px-0" name="password" onChange={handleChange} value={data.password} placeholder="Enter password" required />
                                    <i onClick={() => setShow(false)} className="bx bxs-show cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                </div>
                            </div>
                            <Link to="auth" className="text-brand font-12">
                                <u>Forgot Password?</u>
                            </Link>
                            <div className="w-100 text-center mt-3">
                                <button type="submit" className="btn btn-primary rounded-pill my-btn mt-2 w-100">
                                    Sign in
                                    <i className="bx bxs-door-open d-inline ms-2" style={{verticalAlign: "middle"}}></i>
                                </button>
                                <p className="small font-rhd mt-2 pt-1 mb-0">Don't have an account?{' '}
                                    <Link to="/auth/sign-up" className="link-danger">Sign Up</Link>
                                </p>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MobileSignIn;