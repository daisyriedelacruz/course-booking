import { Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
  // console.log(data);
  const { title, content, destination, buttonLabel } = data;

  return (
    <Container className="p-0">
      <Row className="p-5 my-5 mx-auto text-center hero-banner">
        <Col className="hero-content">
          <h1>{title}</h1>
          <p>{content}</p>
          <Button className="btn-peach" as={Link} to={destination}>
            {buttonLabel}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
