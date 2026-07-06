import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Linkedin, Instagram } from "react-bootstrap-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-top bg-white py-4 mt-5 ">
      <Container>
        <Row className="align-items-center justify-content-between text-center text-md-start">
          <Col md={5} className="mb-3 mb-md-0">
            <span className="fw-bold text-dark tracking-tight fs-5">
              Bookish
            </span>
            <p className="text-muted small mt-1 mb-0">
              &copy; {currentYear}. All rights reserved.
            </p>
          </Col>

          <Col md={4} className="text-center text-md-end">
            <small className="text-uppercase fw-semibold text-secondary tracking-wider d-block mb-2">
              Join Our Community
            </small>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-circle bg-light text-secondary d-inline-flex align-items-center justify-content-center social-icon-btn"
                title="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-circle bg-light text-secondary d-inline-flex align-items-center justify-content-center social-icon-btn"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-circle bg-light text-secondary d-inline-flex align-items-center justify-content-center social-icon-btn"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
