import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import React from "react";
import { NavLink } from "react-router-dom";
import {useAuth} from "./auth";

function NavbarComponent() {
    const {auth} = useAuth()
    const currentUser = auth?.username

    return (
        <>
            <Navbar bg="blue" variant="dark">
                <Container>
                    <Navbar.Brand href="/">I Love Law</Navbar.Brand>
                    <Navbar.Collapse id="navbarScroll">
                        {currentUser &&
                            <>
                                <Nav className="me-auto">
                                    <Nav.Link exact as={NavLink} to="/" activeClassName="active">Home</Nav.Link>
                                    <Nav.Link as={NavLink} to="convert" activeClassName="active">Convert</Nav.Link>
                                    <Nav.Link as={NavLink} to="notification" activeClassName="active">Notification</Nav.Link>
                                </Nav>
                                <NavDropdown title={currentUser} id="collasible-nav-dropdown" style={{color: 'white', textDecoration: 'none'}}>
                                    <NavDropdown.Item as={NavLink} to="profile" activeClassName="active">Lihat Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="payment" activeClassName="active">Pembayaran</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={NavLink} to="logout" activeClassName="active">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;