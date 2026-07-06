import { useEffect, useState, useContext } from "react";

import UserContext from "../context/UserContext";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";

export default function Courses() {
  const { user } = useContext(UserContext);

  // State that will be used to store the courses retrieved from the database
  const [courses, setCourses] = useState([]);

  const fetchData = () => {
    let fetchUrl =
      user.isAdmin === true
        ? process.env.REACT_APP_API_URL + "/courses/all"
        : process.env.REACT_APP_API_URL + "/courses/";

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  };

  // Retrieves the courses from the database upon initial render of the "Courses" component
  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      {user.isAdmin === true ? (
        <AdminView coursesData={courses} fetchData={fetchData} />
      ) : (
        <UserView coursesData={courses} />
      )}
    </>
  );
}
