import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import React from "react";
import { useNavigate  } from "react-router-dom";
import {useAuth} from "./auth";

function NavbarComponent() {
    const {auth} = useAuth()
    const currentUser = auth?.username
    let navigate  = useNavigate();

    return (
        <>
            <Navbar bg="blue" variant="dark">
                <Container>
                    <Navbar.Brand href="/">I Love Law</Navbar.Brand>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        {currentUser &&
                            <>
                                <NavDropdown title={currentUser} id="collasible-nav-dropdown" style={{color: 'white', textDecoration: 'none'}}>
                                    <NavDropdown.Item href="profile">Lihat Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => navigate("/logout")}>
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