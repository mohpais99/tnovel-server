import React from 'react'
import { Spinner } from 'react-bootstrap'

function index(props) {
    return (
        <tr>
            <td className="text-center" colSpan={props.cols}>
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="success" />
            </td>
        </tr>
    )
}

export default index
