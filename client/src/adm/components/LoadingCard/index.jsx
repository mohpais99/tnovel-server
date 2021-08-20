import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

const LoadingCard = () => {
    return (
        <Row>
            <Col className="text-center" sm="12">
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" size="sm" />
            </Col>
        </Row>
    );
};

export default LoadingCard;