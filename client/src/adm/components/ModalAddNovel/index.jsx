import React from 'react'
import { Form, Modal } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import './modal.css';
import { fUpload } from 'services/api';
import MDEditor from '@uiw/react-md-editor';

function ModalFunction(props) {
    const [state, setState] = React.useState(null)
    const [imagePreview, setImagePreview] = React.useState(null);
    const [sinopsys, setSinopsys] = React.useState("**Type sinopsys!!!**");
    const [file, setFile] = React.useState(null);

    const handleOnchange = (e) => {
        setState({ ...state, [e.target.name]: [e.target.value][0]})
    }

    const onSelect = (selectedList, selectedItem) => {
        setState({...state, genre:selectedList})
    }

    const onRemove = (selectedList, removedItem) => {
        const genre = state.genre.filter(x => x.id !== removedItem.id)
        setState({...state, genre})
    }

    const removeImage = () => {
        setImagePreview(null)
    }

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file))
            setFile(file)
            setState({...state, poster: file.name})
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        state.sinopsys = sinopsys
        var upload = await fUpload('novel/upload', file, state)
        console.log(upload);
        removeImage()
        setState(null)
        props.setShow(false)
    };

    const RenderImage = () => {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="img-container">
                        <img src={imagePreview} id="photo-field" width="100" alt="file" />
                    </div>
                    <span onClick={removeImage} className="button-remove">x</span>
                </div>
            </div>
        )
    }

    return (
        <Modal
            size="lg"
            show={props.show}
            onHide={() => props.setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Add Novel
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    imagePreview && <RenderImage />
                }
                <form onSubmit={handleSave} noValidate>
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <Form.Group>
                                <Form.Label className="font-weight-6">Poster Novel</Form.Label>
                                <Form.Control type="file" id="poster" name="poster" accept="image/*" onChange={imageHandler} />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-sm-12">
                            <Form.Group>
                                <Form.Label className="font-weight-6">Novel Name</Form.Label>
                                <Form.Control type="text" id="name" name="name" onChange={handleOnchange} placeholder="Type novel name ..." />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-sm-12">
                            <Form.Group>
                                <Form.Label className="font-weight-6">Alternatif Name</Form.Label>
                                <Form.Control type="text" id="othername" name="othername" onChange={handleOnchange} placeholder="Type alternatif novel name ..." />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-sm-12 col-md-6">
                            <Form.Group>
                                <Form.Label className="font-weight-6">Type Novel</Form.Label>
                                <Form.Select id="type" name="type" onChange={handleOnchange} aria-label="Default select example">
                                    <option value="" disabled>-- Select One --</option>
                                    <option value="WN">Web Novel (WN)</option>
                                    <option value="LN">Light Novel (LN)</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <Form.Group>
                                <Form.Label className="font-weight-6">Language</Form.Label>
                                <Form.Select id="language" name="language" onChange={handleOnchange} className="form-control" aria-label="Default select example">
                                    <option value="" disabled>-- Select One --</option>
                                    <option value="Korean">Korea</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Chinesee">Chinesee</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label className="font-weight-6">Author Name</Form.Label>
                                <Form.Control type="text" id="author" name="author" onChange={handleOnchange} placeholder="Type author novel ..." />
                            </Form.Group>
                        </div>
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label className="font-weight-6">Novel Release Year</Form.Label>
                                <Form.Control type="text" id="year" name="year" onChange={handleOnchange} placeholder="Novel Release year..." />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                                <label className="font-weight-6">Genre Novel</label>
                                <Multiselect
                                    options={props.genre} // Options to display in the dropdown
                                    // selectedValues={state.genre} // Preselected value to persist in dropdown
                                    onSelect={onSelect} // Function will trigger on select event
                                    onRemove={onRemove} // Function will trigger on remove event
                                    displayValue="title" // Property name to display in the dropdown options
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                                <label className="font-weight-6">Sinopsys Novel</label>
                                <MDEditor
                                    value={sinopsys}
                                    onChange={setSinopsys}
                                />
                                {/* <MDEditor.Markdown source={sinopsys} /> */}
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-auto ms-auto mt-2">
                            <button type="submit" className="btn btn-success">Simpan Novel</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalFunction
