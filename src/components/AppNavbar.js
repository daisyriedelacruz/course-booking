import { useContext } from "react";
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";

import UserContext from "../context/UserContext";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const profileIconTitle = (
    <div className="d-inline-flex align-items-center profile-dropdown-trigger">
      <div className="navbar-avatar-circle">
        <User size={18} />
      </div>
    </div>
  );

  return (
    <Navbar
      expand="lg"
      className="fw-bold border-bottom border-2 border-light shadow-sm sticky-top"
    >
      <Container className="ms-0">
        <Navbar.Brand as={Link} to="/">
          <img src="/logo_bookish_clr.png" height="80" alt="Bookish Logo" />
          Bookish
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" exact="true">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/courses" exact="true">
              Courses
            </Nav.Link>

            {user.id !== null ? (
              user.isAdmin ? (
                // Admin users
                <>
                  <Nav.Link as={NavLink} to="/about" exact="true">
                    About Us
                  </Nav.Link>

                  <NavDropdown
                    title={profileIconTitle}
                    id="admin-profile-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/profile"
                      className="d-flex align-items-center gap-2 py-2"
                    >
                      <User size={16} className="text-muted fw-bold" />
                      {user.firstName}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/logout"
                      className="d-flex align-items-center gap-2 py-2 text-danger"
                    >
                      <LogOut size={16} /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                // Regular logged-in users
                <>
                  <Nav.Link as={NavLink} to="/myCourses" exact="true">
                    My Courses
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/about" exact="true">
                    About Us
                  </Nav.Link>

                  <NavDropdown
                    title={profileIconTitle}
                    id="user-profile-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/profile"
                      className="d-flex align-items-center gap-2 py-2"
                    >
                      <User size={16} className="text-muted fw-bold" />
                      {user.firstName}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/logout"
                      className="d-flex align-items-center gap-2 py-2 text-danger"
                    >
                      <LogOut size={16} /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )
            ) : (
              // Logged-out users
              <>
                <Nav.Link as={NavLink} to="/about" exact="true">
                  About Us
                </Nav.Link>
                {location.pathname === "/" ? (
                  <Button
                    as={NavLink}
                    to="/register"
                    exact="true"
                    className="btn btn-peach me-2"
                    type="button"
                    id="btn-get-started"
                  >
                    Get Started
                  </Button>
                ) : (
                  <Nav.Link as={NavLink} to="/login" exact="true">
                    Login
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
