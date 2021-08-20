import React from 'react'
import { Row } from 'react-bootstrap'

function Header(props) {
    return (
        <Row>
            <div className="col-auto">
                <h4 className="font-rhd-bold mb-0">{props.title}</h4>
                <small className="text-secondary">{props.subtitle}</small>
            </div>
        </Row>
    )
}

export default Header
