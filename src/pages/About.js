import { useState, useEffect, useContext } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { Notyf } from "notyf";
import aboutImg from "../assets/about_img.jpg";
import UserContext from "../context/UserContext";

export default function About() {
  const notyf = new Notyf();

  const { user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isActive, setIsActive] = useState(false);

  function sendFeedback(e) {
    e.preventDefault();

    setEmail("");
    setFeedback("");

    notyf.success("Feedback Sent");
  }

  useEffect(() => {
    if (email !== "" && feedback !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, feedback]);

  return (
    <>
      <Container className="my-5 p-0 overflow-hidden about-wrapper-card">
        <Row className="g-0 align-items-stretch">
          <Col
            xs={12}
            md={7}
            className="p-4 p-md-5 d-flex flex-column justify-content-center"
          >
            <span className="about-badge mb-2">Our Story</span>
            <h1 className="about-main-title mb-4">Welcome to Bookish!</h1>

            <p className="about-lead-text mb-4">
              We are a curated marketplace for short-form courses, creative
              workshops, and casual seminars. Built for modern learners who are
              always curious but permanently busy, Bookish makes finding your
              next favorite hobby or skill upgrade as simple as reserving a
              table at your favorite café.
            </p>

            <p className="about-body-text mb-5">Why Bookish?</p>
            <ul>
              <li>
                <strong>Curated for You:</strong> Every course on our platform
                is hand-picked to ensure engaging content and practical skills.
              </li>
              <li>
                <strong>Zero Friction Booking:</strong> No complicated
                application processes. Find a course, tap a button, and secure
                your seat instantly.
              </li>
              <li>
                <strong>Expertly Taught:</strong> Learn directly from passionate
                local instructors, industry professionals, and creative experts
                who love what they do.
              </li>
            </ul>
          </Col>

          <Col md={5} className="d-none d-md-flex about-banner-panel">
            <img
              src={aboutImg}
              alt="Welcome to Bookish Banner"
              className="about-panel-banner-img"
            />
          </Col>
        </Row>
      </Container>

      {/* Feedback Section */}
      <h3 className="mt-5 mb-3">Got anything to say?</h3>
      {user.id !== null ? (
        <Form onSubmit={(e) => sendFeedback(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-cente">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Let us know what you think."
              required
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value);
              }}
            />
          </Form.Group>
          {/* conditionally render submit button based on isActive state */}
          {isActive ? (
            <Button
              className="btn-peach active-state"
              type="submit"
              id="loginBtn"
            >
              Send
            </Button>
          ) : (
            <Button
              className="btn-peach disabled-state"
              type="submit"
              id="loginBtn"
              disabled
            >
              Send
            </Button>
          )}
        </Form>
      ) : null}
    </>
  );
}
