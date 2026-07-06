import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";

import UserContext from "../context/UserContext";
import { Notyf } from "notyf";

export default function CourseView() {
  const notyf = new Notyf();

  const { courseId } = useParams();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [schedule, setSchedule] = useState("");

  function enroll(courseId) {
    fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        enrolledCourses: [{ courseId }],
        totalPrice: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);

        if (data.message === "Admin is forbidden") {
          notyf.error("Admin Forbidden");
        } else if (data.message === "Enrolled successfully") {
          notyf.success("Enrollment Successful");

          navigate("/courses");
        } else {
          notyf.error("Internal Server Error. Notify System Admin.");
        }
      });
  }

  useEffect(() => {
    console.log(courseId);

    fetch(`${process.env.REACT_APP_API_URL}/courses/specific/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setSchedule(data.schedule);
      });
  }, [courseId]);

  const formatTime12Hour = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");
    const hourInt = parseInt(hours, 10);

    const ampm = hourInt >= 12 ? "PM" : "AM";
    const displayHour = hourInt % 12 || 12;

    return `${displayHour}:${minutes} ${ampm}`;
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card className="cardHighlight shadow-sm">
            <Card.Body className="text-center">
              <Card.Title className="fw-bold">{name}</Card.Title>
              <Card.Text className="text-muted">{description}</Card.Text>
              <Card.Subtitle className="fw-bold">Price:</Card.Subtitle>
              <Card.Text>Php {price}</Card.Text>
              <Card.Subtitle className="fw-bold mb-2">
                Class Schedule:
              </Card.Subtitle>
              <Card.Text className="mb-0">
                {schedule?.date
                  ? new Date(schedule.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </Card.Text>
              <Card.Text>
                {formatTime12Hour(schedule?.startTime)} -{" "}
                {formatTime12Hour(schedule?.endTime)}
              </Card.Text>

              {user.id !== null ? (
                <Button
                  className="btn btn-peach btn-block"
                  onClick={() => enroll(courseId)}
                >
                  Enroll
                </Button>
              ) : (
                <Link className="btn btn-secondary btn-block" to="/login">
                  Log in to Enroll
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
