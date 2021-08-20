import React from 'react';
import MobileSignIn from 'auth/components/MobileSignIn';
import { Col, Row, Spinner, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from 'auth/components/Header';
import useAuth from 'helpers/Context';

function SignIn() {
    const history = useHistory()
    const {login, notify, setLoading, loading} = useAuth()
    const [show, setShow] = React.useState(false)
    const [data, setData] = React.useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if ((!data.email || !data.password) || (data.email === '' || data.password === '')) {
            notify('Lengkapi Data!', 0)
        } else {
            setLoading(true)
            const log = await login(data.email, data.password)
            if (!log) {
                notify('Login failed! Check server!', 0)
            } else {
                notify(log.message)
                if (log.role === 'superadmin' || log.role === 'admin') {
                    return history.push('/admpanel')
                }
                return history.push('/')
            }
        }
    }
    return (
        <React.Fragment>
            <Col md="12" lg="5" className="my-auto">
                <Row className="d-none d-lg-block">
                    <Col sm="9" className="mx-auto">
                        <Header title="Sign In" subtitle="Welcome to auth system!" />
                        <Row className="mt-5">
                            <Col sm="12">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-2">
                                        <label className="form-label font-12" htmlFor="email">email</label>
                                        <input type="email" name="email" onChange={handleChange} value={data.email} className="form-control my-input px-0" placeholder="Type email" />
                                    </div>
                                    <div className={`mb-4 position-relative ${show ? 'd-none' : ''}`}>
                                        <label className="form-label font-12" htmlFor="password">Password</label>
                                        <input onChange={handleChange} value={data.password} type="password" name="password" className="form-control my-input px-0" placeholder="Type password" />
                                        <i onClick={() => setShow(true)} className="bx bxs-hide cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                    </div>
                                    <div className={`mb-4 position-relative ${!show ? 'd-none' : ''}`}>
                                        <label className="form-label font-12" htmlFor="password">Password</label>
                                        <input type="text" onChange={handleChange} value={data.password} name="password" className="form-control my-input px-0" />
                                        <i onClick={() => setShow(false)} className="bx bxs-show cursor-pointer" style={{position: "absolute", right: "6px", bottom: "11px"}}></i>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center mb-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="remember"
                                            />
                                            <label className="form-check-label" htmlFor="remember"> Remember me </label>
                                        </div>
                                        <a href="#!">Forgot password?</a>
                                    </div>
                                    {
                                        !loading ?
                                            <button type="submit" className="btn btn-primary w-100">Sign in</button>
                                        :
                                            <Button className="w-100" variant="primary" disabled>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />{' '}
                                                Loading...
                                            </Button>
                                    }
                                    <p className="small font-rhd mt-2 pt-1 mb-0">Don't have an account?{' '}
                                        <Link to="/auth/sign-up" className="link-danger">Sign Up</Link>
                                    </p>
                                    <div className="divider d-flex align-items-center my-4">
                                        <p className="text-center font-rhd mx-3 mb-0 text-muted">OR</p>
                                    </div>
                                    <a className="btn btn-primary w-100 my-1" style={{backgroundColor: "#3b5998"}} href="#!" role="button">
                                        <i className='bx bxl-facebook-square auth-icon'></i>{' '}Continue with Facebook
                                    </a>
                                    <a className="btn btn-danger w-100 my-1" style={{backgroundColor: "#ff1a1a"}} href="#!" role="button">
                                        <i className='bx bxl-google-plus auth-icon'></i>{' '}Continue with Google
                                    </a>
                                </form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <MobileSignIn />
        </React.Fragment>
    )
}

export default SignIn;