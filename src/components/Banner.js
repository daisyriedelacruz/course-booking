import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
  // console.log(data);
  const { title, content, destination, buttonLabel } = data;

  return (
    <Row className="p-5 my-5 text-center hero-banner">
      <Col className="hero-content">
        <h1>{title}</h1>
        <p>{content}</p>
        <Button className="btn-peach" as={Link} to={destination}>
          {buttonLabel}
        </Button>
      </Col>
    </Row>
  );
}
