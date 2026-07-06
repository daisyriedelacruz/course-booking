import { Row, Col, Card } from "react-bootstrap";

export default function Highlights() {
  return (
    <Row className="my-5">
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Learn from Home</h2>
            </Card.Title>
            <Card.Text>
              Learn anytime, anywhere with fully online classes designed to fit
              your schedule. Access lessons, activities, and resources from the
              comfort of your home.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Study Now, Pay Later</h2>
            </Card.Title>
            <Card.Text>
              Start learning without the burden of paying the full tuition
              upfront. Flexible payment options make it easier to invest in your
              future and achieve your goals.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Be Part of Our Community</h2>
            </Card.Title>
            <Card.Text>
              Connect with fellow learners, mentors, and industry professionals
              in a supportive environment. Share experiences, ask questions, and
              grow together throughout your learning journey.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
