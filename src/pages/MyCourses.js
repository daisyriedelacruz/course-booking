import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/get-enrollments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const enrollmentArray = Array.isArray(data) ? data : [];
        const extractedCourses = enrollmentArray.flatMap((enrollment) =>
          enrollment.enrolledCourses.map((item) => item.courseId),
        );
        setEnrolledCourses(extractedCourses);
      });
  }, []);

  const formatTime12Hour = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");
    const hourInt = parseInt(hours, 10);

    const ampm = hourInt >= 12 ? "PM" : "AM";
    const displayHour = hourInt % 12 || 12;

    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <Container className="my-5 p-4 p-md-5 my-courses-container">
      <div className="d-flex align-items-center gap-3 mb-5">
        <div>
          <h1 className="fw-bold mb-1">My Courses</h1>
          <p className="text-muted mb-0">
            Track your active study sessions and course materials.
          </p>
        </div>
      </div>

      {enrolledCourses.length > 0 ? (
        <Row className="g-4">
          {enrolledCourses.map((course) => (
            <Col xs={12} sm={6} md={4} key={course._id}>
              <Card className="profile-course-mini-card shadow-sm h-100">
                <Card.Body className="p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h4
                      className="fw-bold mb-2"
                      style={{ color: "#4a4238", fontSize: "1.2rem" }}
                    >
                      {course.name}
                    </h4>
                    <p className="text-muted mb-1 fw-bold">Schedule: </p>
                    <p className="text-muted mb-3">
                      {course.schedule?.date
                        ? new Date(course.schedule.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )
                        : "N/A"}
                    </p>
                    <p className="text-muted mb-0">
                      {formatTime12Hour(course.schedule?.startTime)} -{" "}
                      {formatTime12Hour(course.schedule?.endTime)}
                    </p>
                  </div>
                  <Button
                    as={Link}
                    to={`https://meet.google.com/`}
                    className="btn-peach active-state w-100 py-2"
                    target="_blank"
                  >
                    Enter Classroom
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center p-5 border border-2 border-dashed rounded-3 bg-white">
          <p className="text-muted mb-3">
            You haven't registered for any classes yet!
          </p>
          <Button
            as={Link}
            to="/courses"
            className="btn-peach active-state py-2 px-4"
          >
            Explore Course Catalog
          </Button>
        </div>
      )}
    </Container>
  );
}
