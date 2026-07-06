import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

import { Notyf } from "notyf";

import UserContext from "../context/UserContext";

export default function Profile() {
  const notyf = new Notyf();

  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Set the user states values with the user details upon successful login.
        if (data !== undefined) {
          setDetails(data);
        } else if (data.error === "User not found") {
          notyf.error("User Not Found");
        } else {
          notyf.error("Something Went Wrong. Contact Your System Admin.");
        }
      });
  }, []);

  return user.id === null ? (
    <Navigate to="/courses" />
  ) : (
    <Container className="my-5 p-4 p-md-5 profile-container-box">
      <Row className="align-items-center">
        {/* Left Column: Avatar & Full Name Display */}
        <Col md={4} className="text-center profile-avatar-side mb-4 mb-md-0">
          <div className="profile-avatar-circle">
            {/* Grabs initials from firstName and lastName */}
            {details.firstName?.[0]}
            {details.lastName?.[0]}
          </div>
          <h2 className="profile-name mt-3">{`${details.firstName} ${details.lastName}`}</h2>
          <span className="badge-category mt-2">Bookish Member</span>
        </Col>

        {/* Right Column: Structured Information Panel */}
        <Col md={8} className="profile-info-side">
          <h1 className="profile-header-title mb-4">My Account</h1>

          <div className="profile-details-card">
            <h4 className="info-section-title mb-3">Contact Information</h4>

            {/* Email Entry */}
            <div className="profile-info-row mb-3">
              <div className="profile-icon-wrapper">
                <Mail size={18} />
              </div>
              <div>
                <span className="info-label d-block">Email Address</span>
                <span className="info-value">{details.email}</span>
              </div>
            </div>

            {/* Mobile Entry */}
            <div className="profile-info-row">
              <div className="profile-icon-wrapper">
                <Phone size={18} />
              </div>
              <div>
                <span className="info-label d-block">Mobile Number</span>
                <span className="info-value">{details.mobileNo}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
