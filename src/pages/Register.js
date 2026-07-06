import { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";
import UserContext from "../context/UserContext";

import { Notyf } from "notyf";

export default function Register() {
  //create a new notyf instance
  const notyf = new Notyf();

  const { user } = useContext(UserContext);

  // State hooks to store the values of the input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  const navigate = useNavigate();
  function registerUser(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //data is the response of the api/server after it's been process as JS object through our res.json() method.
        console.log(data);
        //data will only contain an email property if we can properly save our user.
        if (data.message === "User registered successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo(0);
          setPassword("");
          setConfirmPassword("");

          notyf.success("Registration successful");
          navigate("/login");
        }
      });
  }

  return user.id !== null ? (
    <Navigate to="/courses" />
  ) : (
    <>
      <Row className="align-items-center mt-4">
        {/* Left Side */}
        <Col md={5} className="d-none d-md-flex">
          <div className="register-bg-blob">
            <img
              src="./logo_bookish_clr.png"
              alt="Bookish Logo"
              className="w-100 h-100 img-fluid"
            />
          </div>
        </Col>
        {/* Right Side: Registration Form */}
        <Col xs={12} md={7} className="p-3 p-md-2">
          <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="mb-2 text-start title">Create Account</h1>
            <p className="text-start text-muted mb-4">
              Join Bookish and start your learning journey!
            </p>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="custom-label">First Name</Form.Label>
                  <div className="input-group-custom">
                    <User className="input-icon" size={18} />
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="custom-input"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="custom-label">Last Name</Form.Label>
                  <div className="input-group-custom">
                    <User className="input-icon" size={18} />
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="custom-input"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label className="custom-label">Email</Form.Label>
              <div className="input-group-custom">
                <Mail className="input-icon" size={18} />
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                />
              </div>
            </Form.Group>

            {/* Mobile Number Field */}
            <Form.Group className="mb-3">
              <Form.Label className="custom-label">Mobile No.</Form.Label>
              <div className="input-group-custom">
                <Phone className="input-icon" size={18} />
                <Form.Control
                  type="number"
                  placeholder="Enter 11 Digit No."
                  required
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="custom-input"
                />
              </div>
            </Form.Group>

            {/* Password Field */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="custom-label">Password</Form.Label>
                  <div className="input-group-custom">
                    <Lock className="input-icon" size={18} />
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="custom-input"
                    />
                  </div>
                </Form.Group>
              </Col>

              {/* Confirm Password Field */}
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="custom-label">
                    Confirm Password
                  </Form.Label>
                  <div className="input-group-custom">
                    <Lock className="input-icon" size={18} />
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="custom-input"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {/* Conditional Active/Disabled Button States */}
            <div className="d-grid mt-2">
              {isActive ? (
                <Button
                  className="btn-peach active-state"
                  type="submit"
                  id="submitBtn"
                >
                  Register Account
                </Button>
              ) : (
                <Button
                  className="btn-peach disabled-state"
                  type="submit"
                  id="submitBtn"
                  disabled
                >
                  Register
                </Button>
              )}
            </div>
            <div className="text-center mt-3">
              <p className="mt-3">
                Already have an account?{" "}
                <Link
                  to={`/login`}
                  className="text-decoration-none text-warning"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
