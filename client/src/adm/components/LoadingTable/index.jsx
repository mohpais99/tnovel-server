import React from 'react'
import { Spinner } from 'react-bootstrap'

function index(props) {
    return (
        <tr>
            <td className="text-center" colSpan={props.cols}>
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" size="sm" />
            </td>
        </tr>
    )
}

export default index
