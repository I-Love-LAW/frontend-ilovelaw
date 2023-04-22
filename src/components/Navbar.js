import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import React from "react";
import { useNavigate  } from "react-router-dom";
import {useAuth} from "./auth";

function NavbarComponent() {
    const {auth} = useAuth()
    const currentUser = auth?.username
    let navigate  = useNavigate();

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">I Love Law</Navbar.Brand>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        {currentUser &&
                            <div className="d-flex">
                                <button type='button' className="btn btn-danger" onClick={() => navigate("/logout")}>Logout</button>
                            </div>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;