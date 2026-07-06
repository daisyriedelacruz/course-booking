import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import EditCourse from "./EditCourse";
import ArchiveCourse from "./ArchiveCourse";

export default function AdminView({ coursesData, fetchData }) {
  const [courses, setCourses] = useState([]);

  const formatTime12Hour = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");
    const hourInt = parseInt(hours, 10);

    const ampm = hourInt >= 12 ? "PM" : "AM";
    const displayHour = hourInt % 12 || 12;

    return `${displayHour}:${minutes} ${ampm}`;
  };

  //Getting the coursesData from the courses page
  useEffect(() => {
    console.log(coursesData);

    const coursesArr = coursesData.map((course) => {
      console.log(course);
      return (
        <tr key={course._id}>
          <td>{course._id}</td>
          <td>{course.name}</td>
          <td>{course.description}</td>
          <td>{course.price}</td>
          <td>
            {course.schedule?.date
              ? new Date(course.schedule.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </td>
          <td>
            {formatTime12Hour(course.schedule?.startTime)} -{" "}
            {formatTime12Hour(course.schedule?.endTime)}
          </td>
          <td className={course.isActive ? "text-success" : "text-danger"}>
            {course.isActive ? "Available" : "Unavailable"}
          </td>
          <td>
            {" "}
            <EditCourse course={course} fetchData={fetchData} />{" "}
          </td>
          <td>
            <ArchiveCourse
              course={course}
              isActive={course.isActive}
              fetchData={fetchData}
            />
          </td>
        </tr>
      );
    });

    setCourses(coursesArr);
  }, [coursesData]);

  return (
    <>
      <h1 className="text-center my-4"> Admin Dashboard</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody>{courses}</tbody>
      </Table>

      <Button
        as={Link}
        to="/addCourse"
        className="btn btn-peach active-state text-white mt-3 mb-3 text-right"
      >
        Add Course
      </Button>
    </>
  );
}
