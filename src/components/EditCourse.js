import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Notyf } from "notyf";

export default function EditCourse({ course, fetchData }) {
  const notyf = new Notyf();

  //state for courseId for the fetch URL
  const [courseId, setCourseId] = useState(course._id);

  //Forms state
  //Add state for the forms of course
  const [name, setName] = useState(course.name);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [schedule, setSchedule] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  //state for editCourse Modals to open/close
  const [showEdit, setShowEdit] = useState(false);

  //function for opening the modal
  const openEdit = () => {
    //Then, open the modal
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice(0);
    setSchedule({ date: "", startTime: "", endTime: "" });
  };

  useEffect(() => {
    if (course && showEdit) {
      setName(course.name);
      setDescription(course.description);
      setPrice(course.price);

      const localDate = course.schedule?.date
        ? new Date(course.schedule.date)
        : null;
      setSchedule({
        date: localDate ? localDate.toLocaleDateString("sv-SE") : "",
        startTime: course.schedule?.startTime || "",
        endTime: course.schedule?.endTime || "",
      });
    }
  }, [showEdit, course]);

  //function to update the course
  const editCourse = (e, courseId) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        schedule: schedule,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success === true) {
          notyf.success("Successfully Updated");
          closeEdit();
          fetchData();
        } else {
          notyf.error("Something went wrong");
          closeEdit();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openEdit()}>
        {" "}
        Edit{" "}
      </Button>

      {/*Edit Modal Forms*/}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editCourse(e, courseId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Course</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                className="border"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                className="border"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Class Schedule:</Form.Label>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Control
                    type="date"
                    name="date"
                    required
                    value={schedule.date}
                    onChange={(e) =>
                      setSchedule({ ...schedule, date: e.target.value })
                    }
                  />
                </Col>

                <Col sm={6}>
                  <Form.Control
                    type="time"
                    name="startTime"
                    required
                    value={schedule.startTime}
                    onChange={(e) =>
                      setSchedule({ ...schedule, startTime: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    Start Time (AM/PM)
                  </Form.Text>
                </Col>

                <Col sm={6}>
                  <Form.Control
                    type="time"
                    name="endTime"
                    required
                    value={schedule.endTime}
                    onChange={(e) =>
                      setSchedule({ ...schedule, endTime: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">End Time (AM/PM)</Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
