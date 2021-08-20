import React from 'react'

function ModalDeleteNovel() {
    return (
        <Modal
            show={props.show}
            aria-labelledby="modal-delete"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="modal-delete">
                    Confirmation Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteNovel
