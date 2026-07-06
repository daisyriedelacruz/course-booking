import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CourseCard({ courseProp }) {
  const { _id, name, description, price } = courseProp;

  return (
    <Card className="cardHighlight">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>PHP {price}</Card.Text>
        <Link className="btn btn-peach" to={`/courses/${_id}`}>
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}

CourseCard.propTypes = {
  // The "shape" method is used to check if a prop object conforms to a specific "shape"
  courseProp: PropTypes.shape({
    // Define the properties and their expected types
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
