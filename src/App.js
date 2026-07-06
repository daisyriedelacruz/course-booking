import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import AddCourse from "./pages/AddCourse";
import Courses from "./pages/Courses";
import CourseView from "./pages/CourseView";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  // Function for clearing localStorage on logout
  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      unsetUser();
      setIsLoading(false);
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          unsetUser();

          setUser({
            id: null,
            firstName: "",
            lastName: "",
            isAdmin: null,
          });

          return null;
        }
        return res.json();
      })
      .then((data) => {
        // Set the user states values with the user details upon successful login.
        if (data !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
            firstName: data.firstName,
            lastName: data.lastName,
          });

          // Else set the user states to the initial values
        } else {
          setUser({
            id: null,
            firstName: "",
            lastName: "",
            isAdmin: null,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }
  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser, isLoading }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addCourse" element={<AddCourse />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseView />} />
              <Route path="*" element={<Error />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/about" element={<About />} />
              <Route path="/myCourses" element={<MyCourses />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
