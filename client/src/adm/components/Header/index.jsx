import React from 'react'
import { Button, Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import user from 'assets/images/devin.jpg';
import './header.css';
import { useHistory } from 'react-router-dom';

function Header(props) {
    let classes = props.sidebar ? 'bx bx-menu-alt-left' : 'bx bx-menu';
    const history = useHistory()
    const pathname = history.location.pathname
    const split = pathname.split('/')

    const headerName = split[split.length -1]

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Button className="btn-none my-auto me-1 d-none d-md-block" onClick={props.handleSidebar}>
                    <i className={classes}></i>
                </Button>
                <Navbar.Brand href="#home">{headerName[0].toUpperCase() + headerName.substring(1)}</Navbar.Brand>
                <Navbar.Toggle className="btn-none" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto my-auto">
                        <DropdownButton className="custom-dropdown" align="end" title={<i className="bx bxs-book-content nc-icon" ></i>} id="dropdown-menu-align-end">
                            <Dropdown.Item eventKey="1">Add New Novel</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Add New Chapter</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Submit to live</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">Preference Genres</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton 
                            className="custom-dropdown notif" 
                            align="end" 
                            title={
                                <>
                                    <i className="bx bxs-bell" ></i>
                                    <span className="notification">5</span>
                                    <span className="d-lg-none">Notification</span>
                                </>
                            } 
                            id="dropdown-menu-align-end">
                            <Dropdown.Item className="detail not-read">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="detail">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="detail">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="detail">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="detail">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="detail">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="detail">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="detail">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="detail">
                                <img src={user} alt="user"/>
                                <div className="notif-content">
                                    <div className="content">Mengemonterari novel <strong>Ten ...</strong></div>
                                    <span className="text-muted font-12">1 minutes ago</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="text-center">
                                <span className="font-12">Read all notification (5)</span>
                            </Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton className="custom-dropdown" align="end" title={<i className="bx bx-coffee" ></i>} id="dropdown-menu-align-end">
                            <Dropdown.Item eventKey="1">
                                <i className="bx bxs-home-heart"></i> Landing
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                <i className="bx bxs-message-square mr-1"></i> Messages
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3">
                                <i className="bx bx-dollar-circle mr-1"></i> Donation
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                <i className="bx bx-lock-open mr-1"></i> Lock Screen
                            </Dropdown.Item>
                        </DropdownButton>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;