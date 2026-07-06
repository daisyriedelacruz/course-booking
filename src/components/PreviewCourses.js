import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewCourses(props) {
  // props is used here to get the data and breakPoint from the FeaturedCourses.js
  const { breakPoint, data } = props;

  // Destructure the courses data here
  const { _id, name, description } = data;

  return (
    <Col xs={12} md={breakPoint} className="my-5">
      {/*Adding the class cardHighlight for min-height*/}
      {/*Adding spacing for x-axis*/}
      <Card className="cardHighlight mx-2">
        <Card.Body>
          <Card.Title className="text-justify">
            {/*Add the specific details of course link*/}
            <Link
              to={`/courses/${_id}`}
              className="text-decoration-none text-dark"
            >
              {name}
            </Link>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
          <Link className="btn btn-peach d-block" to={`/courses/${_id}`}>
            Learn More
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
