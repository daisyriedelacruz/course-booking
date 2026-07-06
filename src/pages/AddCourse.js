import { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import { Notyf } from "notyf";

export default function AddCourse() {
  const notyf = new Notyf();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  //input states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [schedule, setSchedule] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  function createCourse(e) {
    //prevent submit event's default behavior
    e.preventDefault();

    let token = localStorage.getItem("token");
    console.log(token);

    fetch(`${process.env.REACT_APP_API_URL}/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        //data is the response of the api/server after it's been process as JS object through our res.json() method.
        console.log(data);

        if (data.message === "Course already exists") {
          notyf.error("Error: Course already exists.");
        } else if (data.success === true) {
          setName("");
          setDescription("");
          setPrice(0);

          notyf.success("Course Creation Successful");
          navigate("/courses");
        } else {
          notyf.error("Error: Something Went Wrong.");
        }
      });
  }

  return user.isAdmin === true ? (
    <>
      <h1 className="my-5 text-center">Add Course</h1>
      <Form onSubmit={(e) => createCourse(e)}>
        <Form.Group className="my-2">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            className="border"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            className="border"
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            required
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
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
              <Form.Text className="text-muted">Start Time (AM/PM)</Form.Text>
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
        <Button
          type="submit"
          className="my-5 btn btn-peach active-state text-white"
        >
          Submit
        </Button>
      </Form>
    </>
  ) : (
    <Navigate to="/courses" />
  );
}
