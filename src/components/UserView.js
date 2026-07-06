import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CourseCard from "./CourseCard";

export default function UserView({ coursesData }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const coursesArr = coursesData.map((course) => {
      //only render the active courses
      if (course.isActive === true) {
        return (
          <Col xs={12} md={4} key={course._id} className="mb-4">
            <CourseCard courseProp={course} />
          </Col>
        );
      } else {
        return null;
      }
    });

    //set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
    setCourses(coursesArr);
  }, [coursesData]);

  return (
    <Container className="my-5">
      <Row>{courses}</Row>
    </Container>
  );
}
