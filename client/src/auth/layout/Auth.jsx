import React, { Component } from 'react';
import '../auth.css';
import bgLog from 'assets/images/illustration/account.svg';
import bgBottom from 'assets/images/bg-bottom.svg';
import { Col, Container, Row } from 'react-bootstrap';
// import SignIn from 'auth/views/SignIn';
import routes from 'auth/authRoutes';
import { Redirect, Route, Switch } from 'react-router-dom';

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    fetchRoutes(routes) {
        return routes.map((prop, key) => {
            return (
                <Route 
                    key={key}
                    path={`/${prop.layout}/${prop.path}`}
                    render={props => 
                        <prop.component {...props} />
                    }
                    exact />
            );
        });
    }
    render() {
        return (
            <section className="wrapper-auth d-flex align-items-center">
                <Container>
                    <Row className="bg-white border rounded shadow">
                        <Col sm="7" className="bg-cyan position-relative d-none d-lg-block login-left" style={{backgroundImage: `url(${bgLog})`, minHeight: "80vh"}}>
                            <Row className="p-5">
                                <div className="col-auto my-auto">
                                    <i className="bx bxs-book-reader text-primary" style={{fontSize: "48px", verticalAlign: "middle"}}></i>
                                </div>
                                <div className="my-auto col pl-0">
                                    <h4 className="mb-0 font-rhd-bold">TNovel</h4>
                                    <h6 className="mb-0 font-ravelia">Translation Indonesia</h6>
                                </div>
                            </Row>
                            <img src={bgBottom} alt="bg-bottom" className="w-100" style={{position: "absolute", left: "0", right: "0", bottom: "0"}}></img>
                        </Col>
                        <Switch>
                            {this.fetchRoutes(routes)}
                            <Redirect from="/auth" to="/auth/sign-in" />
                        </Switch>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Auth;