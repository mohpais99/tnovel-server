import React from 'react';
import MobileSignUp from 'auth/components/MobileSignUp';
import Header from 'auth/components/Header';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignUp() {
    const [showPass, setShowPass] = React.useState(false)
    const [showRePass, setShowRePass] = React.useState(false)
    const [data, setData] = React.useState({})

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    return (
        <React.Fragment>
            <Col md="12" lg="5" className="my-auto">
                <Row className="d-none d-lg-block">
                    <Col sm="9" className="mx-auto">
                        <Header title="Sign Up" subtitle="Become of member with us!" />
                        <Row className="mt-5">
                            <Col sm="12">
                                <form noValidate>
                                    <div className="mb-2">
                                        <label className="form-label font-12 mb-0" htmlFor="fullname">Your fullname</label>
                                        <input type="text" onChange={handleChange} value={data.fullname} name="fullname" placeholder="Type your fullname ..." className="form-control my-input px-0" />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label font-12 mb-0" htmlFor="username">Your username</label>
                                        <input type="text" onChange={handleChange} value={data.username} name="username" placeholder="Type your username ..." className="form-control my-input px-0" />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label font-12 mb-0" htmlFor="email">Email address</label>
                                        <input type="email" onChange={handleChange} value={data.email} name="email" placeholder="Type your email ..." className="form-control my-input px-0" />
                                    </div>

                                    <div className={`mb-4 position-relative ${showPass ? 'd-none' : ''}`}>
                                        <label className="form-label font-12 mb-0" htmlFor="password">Password</label>
                                        <input type="password" onChange={handleChange} value={data.password} name="password" placeholder="Type your password ..." className="form-control my-input px-0" />
                                        <i onClick={() => setShowPass(true)} className="bx bxs-hide cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                    </div>
                                    <div className={`mb-4 position-relative ${!showPass ? 'd-none' : ''}`}>
                                        <label className="form-label font-12 mb-0" htmlFor="password">Password</label>
                                        <input type="text" onChange={handleChange} value={data.password} name="password" placeholder="Type your password ..." className="form-control my-input px-0" />
                                        <i onClick={() => setShowPass(false)} className="bx bxs-show cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                    </div>

                                    <div className={`mb-4 position-relative ${showRePass ? 'd-none' : ''}`}>
                                        <label className="form-label font-12 mb-0" htmlFor="repassword">Re-Password</label>
                                        <input type="password" onChange={handleChange} value={data.repassword} name="repassword" placeholder="Type your repassword ..." className="form-control my-input px-0" />
                                        <i onClick={() => setShowRePass(true)} className="bx bxs-hide cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                    </div>
                                    <div className={`mb-4 position-relative ${!showRePass ? 'd-none' : ''}`}>
                                        <label className="form-label font-12 mb-0" htmlFor="repassword">Re-Password</label>
                                        <input type="text" onChange={handleChange} value={data.repassword} name="repassword" placeholder="Type your repassword ..." className="form-control my-input px-0" />
                                        <i onClick={() => setShowRePass(false)} className="bx bxs-show cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                                    <p className="small font-rhd mt-2 pt-1 mb-0">Already having account?{' '}
                                        <Link to="/auth/sign-in" className="link-danger">Sign In</Link>
                                    </p>
                                </form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <MobileSignUp />
        </React.Fragment>
    )
}

export default SignUp
