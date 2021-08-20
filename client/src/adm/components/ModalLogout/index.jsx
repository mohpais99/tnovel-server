import React from 'react';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import questionSvg from 'assets/images/illustration/question.svg';
import useAuth from 'helpers/Context';

function ModalLogout(props) {
    const {notify} = useAuth()
    const [loading, setLoading] = React.useState(false)

    const handleLogout = () => {
        var delayInMilliseconds = 2000; //2 second
        setLoading(true)
        setTimeout(function(){
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            props.setToken(null)
            props.setUser(null)
            props.setShow(!props.show)
            setLoading(false)
            return notify('Good bye! :)')
        }, delayInMilliseconds); 
    }
    return (
        <Modal
            show={props.show}
            aria-labelledby="modal-delete"
            onHide={() => props.setShow(false)}
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="modal-delete">
                    Confirmation Logout
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <Col md="6">
                        <img src={questionSvg} alt="log-out" />
                    </Col>
                    <Col md="12" className="text-center">
                        <h4>Are you sure want to logout?</h4>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                {
                    loading ?
                        <Button variant="danger" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{' '}
                            Loading...
                        </Button>
                    :
                        <Button onClick={handleLogout} variant="danger">Yes, Sure!</Button>
                }
                <Button onClick={() => props.setShow(!props.show)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLogout;