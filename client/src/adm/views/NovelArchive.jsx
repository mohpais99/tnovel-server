import React from 'react'
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import noposter from "assets/images/image-not-available.jpg";
// import ReactHtmlParser from 'react-html-parser';
import * as g from 'services/global';
import { Pagination, ModalAddNovel, LoadingTable } from 'adm/components';
import { get } from 'services/api';
import MDEditor from '@uiw/react-md-editor';
import { useHistory } from 'react-router-dom';

function NovelArchive() {
    const history = useHistory()
    const [novel, setNovel] = React.useState([])
    const [genre, setGenre] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [pageNumber, setPageNumber] = React.useState(0)
    const [show, setShow] = React.useState(false);

    const novelsPerPage = 5
    const pagesVisited = pageNumber * novelsPerPage
    const pageCount = Math.ceil(novel.length / novelsPerPage)

    React.useEffect(() => {
        async function loadAll() {
            const novel = await get('novel')
            if (novel) setNovel(novel)

            const genre = await get('genre')
            if (genre) setGenre(genre)
            setLoading(false)
        }
        loadAll()
    }, [])

    const fetchData = (data) => {
        if (data.length < 1) {
            return (
                <tr>
                    <td className="text-center" colSpan="7">
                        <h6>Tidak ada data!</h6>
                    </td>
                </tr>
            )
        }
        return data.slice(pagesVisited, pagesVisited + novelsPerPage).map((novel, i) => {
            return (
                <tr key={i}>
                    <td>
                        <div className="img-container">
                            {
                                novel.poster ?
                                    <img src={`http://localhost:4000/poster/${novel.poster}`} className="w-100" alt="thumb-novel" />
                                :
                                    <img src={noposter} className="w-100" alt="thumb-novel" />
                            }
                        </div>
                    </td>
                    <td className="td-name">{novel.name}</td>
                    <td>
                        {
                            novel.type === 'WN' ?
                                'Web Novel '
                            :
                                'Light Novel '
                        }
                        ({novel.type})
                    </td>
                    {/* <td>{ReactHtmlParser(novel.sinopsys)}</td> */}
                    <td className="font-10" style={{fontSize: "10px"}}><MDEditor.Markdown className="font-14" source={novel.sinopsys} /> </td>
                    <td className="td-number">{g.getDateInd(novel.created_at)}</td>
                    <td className="td-number">1k</td>
                    <td className="td-actions border-0">
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 150, hide: 200 }}
                            overlay={
                                <Tooltip id="button-tooltip" >
                                    View Novel
                                </Tooltip>
                            }
                        >
                            <button type="button" onClick={() => history.push(`novel/view/${novel.slug}`)} className="btn btn-info btn-link btn-icon">
                                <i className='bx bx-image'></i>
                            </button>
                        </OverlayTrigger>
                        <button type="button" className="btn btn-success btn-link btn-icon">
                            <i className='bx bx-edit' ></i>
                        </button>
                        <button type="button" className="btn btn-danger btn-link btn-icon">
                            <i className='bx bx-x' ></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPageNumber(selectedPage)
    };

    return (
        <React.Fragment>
            <Container fluid>
                <Row className="my-1">
                    <Col sm="12">
                        <div className="card shadow">
                            <div className="card-header border-bottom pb-2">
                                <div className="row justify-content-space-between">
                                    <div className="col">
                                        <h4 className="card-title">Novel Archive</h4>
                                        <p className="card-category">Here is a file-file for novel</p>
                                    </div>
                                    <div className="ms-auto my-auto col-auto">
                                        <button type="button" onClick={() => setShow(!show)} className="btn btn-sm btn-success col my-auto">
                                            <i className='bx bx-plus-medical'></i>{' '}
                                            Add Novel
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table table-bigboy">
                                    <thead>
                                        <tr style={{whiteSpace: "nowrap"}}>
                                            <th className="text-center">Thumb</th>
                                            <th>Novel Title</th>
                                            <th>Type Novel</th>
                                            <th className="th-description">Sinopsys</th>
                                            <th className="text-right">Created Date</th>
                                            <th className="text-right">Views</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ?
                                                <LoadingTable cols="7" />
                                            :
                                                fetchData(novel)
                                        }
                                    </tbody>
                                </table>
                                {
                                    novel.length > novelsPerPage && 
                                        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ModalAddNovel show={show} genre={genre} setShow={setShow} />
        </React.Fragment>
    )
}

export default NovelArchive;