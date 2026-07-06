import { useState, useEffect, useContext } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import UserContext from "../context/UserContext";

import { Notyf } from "notyf";

export default function Login() {
  const notyf = new Notyf();

  const { user, setUser } = useContext(UserContext);

  // State hooks to store the values of the input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    // Prevents page redirection via form submission
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access !== undefined) {
          console.log(data.access);

          // Set the token of the authenticated user in the local storage
          // Syntax
          // localStorage.setItem('propertyName', value);
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);

          // Clear input fields after submission
          setEmail("");
          setPassword("");

          notyf.success("Successful Login");
        } else if (data.message === "Incorrect email or password") {
          notyf.error("Incorrect Credentials. Try Again");
        } else {
          notyf.error("User Not Found. Try Again.");
        }
      });
  }

  function retrieveUserDetails(token) {
    // The token will be sent as part of the request's header information
    // We put "Bearer" in front of the token to follow implementation standards for JWTs
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation across the whole application
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  }

  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/courses" />
  ) : (
    <Col xs={12} md={6} className="mx-auto my-5 login-column">
      <Form onSubmit={(e) => authenticate(e)}>
        <h1 className="mb-4 text-center title">Welcome Back!</h1>
        <p className="text-center mb-4">Ready to dive back into learning?</p>

        {/* Email Input Group */}
        <Form.Group className="mb-4">
          <Form.Label>Email address</Form.Label>
          <div className="input-group-custom">
            <Mail className="input-icon" size={20} />
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input"
            />
          </div>
        </Form.Group>

        {/* Password Input Group */}
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <div className="input-group-custom">
            <Lock className="input-icon" size={20} />
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-input"
            />
          </div>
        </Form.Group>

        {/* Active / Inactive Button  */}
        <div className="d-grid mt-4">
          {isActive ? (
            <Button
              className="btn-peach active-state"
              type="submit"
              id="loginBtn"
            >
              Login
            </Button>
          ) : (
            <Button
              className="btn-peach disabled-state"
              type="submit"
              id="loginBtn"
              disabled
            >
              Login
            </Button>
          )}
        </div>
        <div className="text-center mt-3">
          <p className="mt-3">
            No account yet?{" "}
            <Link
              to={`/register`}
              className="text-decoration-none text-warning"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Form>
    </Col>
  );
}
