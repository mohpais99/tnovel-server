import React from 'react';
import { LoadingCard } from 'adm/components';
import { Badge, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { put } from 'services/api';
import './view_novel.css';
import noposter from "assets/images/image-not-available.jpg";
import { useParams } from 'react-router-dom';

function ViewNovel() {
    const {novel_slug} = useParams()
    const [loading, setLoading] = React.useState(true)
    const [novel, setNovel] = React.useState(null)

    React.useEffect(() => {
        async function loadField() {
            const novel = await put(`novel/view/${novel_slug}`)
            setNovel(novel)

            setLoading(false)
        }
        loadField()
    }, [novel_slug])

    const fetchGenre = data => {
        return data.map((genre, i) => {
            return (
                <OverlayTrigger
                    key={i} 
                    placement="bottom"
                    overlay={
                        <Tooltip id="tooltip-bottom">
                            {genre.description}
                        </Tooltip>
                    }
                >
                    <Badge className="cursor-pointer me-1" bg="primary">{genre.title}</Badge>
                </OverlayTrigger>
            )
        })
    }
    
    const fetchNovel = (data) => {
        if (data) {
            return (
                <Row className="detail--novel">
                    <Col sm="12" md="3" className="mb-4">
                        <div className="text-center">
                            <div className="poster-image">
                                {
                                    novel.poster ?
                                        <img src={`http://localhost:4000/poster/${novel.poster}`} className="w-100" alt="thumb-novel" />
                                    :
                                        <img src={noposter} className="w-100" alt="thumb-novel" />
                                }
                            </div>
                            <div className="d-inline-block">
                                <span className="rating">
                                    <i className="bx bxs-star text-warning mr-1"></i>
                                    <i className="bx bxs-star text-warning mr-1"></i>
                                    <i className="bx bxs-star text-warning mr-1"></i>
                                    <i className="bx bxs-star text-warning mr-1"></i>
                                    <i className="bx bxs-star text-warning mr-1"></i>
                                    (4.0)
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col sm="12" md="5" className="mb-4">
                        <Row className="no-gutters">
                            <Col sm="12">
                                <div className="h2 d-none d-md-block">{novel.name}</div>
                                <div className="h6 d-block d-md-none">{novel.name}</div>
                            </Col>
                            <Col sm="12">
                                <div className="table-responsive 2-100">
                                    <table className="info basic table">
                                        <tbody className="">
                                            <tr className={!novel.othername ? 'd-none' : ''}>
                                                <td className="title">Alternatif Name</td>
                                                <td className="">{novel.othername}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="title">Type</td>
                                                <td className="">{novel.type}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="title">Author</td>
                                                <td className="">{novel.author}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="title">Status Translate</td>
                                                <td className="">
                                                    {
                                                        !novel.status ? 
                                                            <Badge bg="danger">Ongoing</Badge>
                                                        :
                                                            <Badge bg="success">Done</Badge>
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <td className="title">Release Year</td>
                                                <td className="">{novel.release_year}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="title">Genre Novel</td>
                                                <td className="">
                                                    {fetchGenre(novel.genres)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="interaction mt-5 d-none d-md-block">
                                    <div className="row no-gutters">
                                        <div className="icon col">
                                            <i className="bx bx-show"></i>
                                            <strong>12k</strong> Views
                                        </div>
                                        <div className="icon col">
                                            <i className="bx bx-like"></i>
                                            <strong>7.3k</strong> Likes
                                        </div>
                                        <div className="icon col">
                                            <i className="bx bxs-comment"></i>
                                            <strong>115</strong> Comment
                                        </div>
                                        <div className="icon col">
                                            <i className="bx bxs-book-content"></i>
                                            <strong>{novel.chapter.length}</strong> Chapters
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="12" md="4">
                        <Card>
                            <Card.Body>
                                <h1>Ini author</h1>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        }
    }
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card className="shadow">
                            <Card.Header className="border-bottom pb-2">
                                <Row className="justify-content-space-between">
                                    <h4 className="card-title">Novel Archive</h4>
                                    <p className="card-category">Here is a file-file for novel</p>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                {
                                    loading ?
                                        <LoadingCard />
                                    :
                                        fetchNovel(novel)
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default ViewNovel
