


import React, { useState, useEffect, useContext } from "react";
import "./Volunteerform.css"; // Apply your existing styling
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/userContext";
import axios from "../../Axios/axios";
import Navbar from "../Landing Pages/Navbar";
const VolunteerForm = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [volunteerData, setVolunteerData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Skills: "",
    Availability: [], // Change to an array to hold multiple selected days
    City: "",
  });

  const navigate = useNavigate();
  const context = useContext(UserContext);
  let { showAlert } = context;

  const registerVolunteer = async (e) => {
    e.preventDefault();
    const { Name, Email, Phone, Skills, Availability, City } = volunteerData;

    try {
      // Send request to create a volunteer
      const response = await axios.post(
        "/api/investor/create-volunteer",
        {
          Name,
          Email,
          Phone,
          Skills,
          Availability,
          City,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      // Handle the response if successful
      if (response.data.success) {
        showAlert(response.data.msg, "success");
        navigate("/navigate");
      }
    } catch (error) {
      // Catch block to handle errors
      console.error("Error registering volunteer:", error.response || error.message);
      showAlert(error.response?.data?.msg || "Something went wrong");
    }
  };

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "Availability") {
      setVolunteerData((prevData) => {
        const newAvailability = checked
          ? [...prevData.Availability, value]  // Add day if checked
          : prevData.Availability.filter((day) => day !== value);  // Remove day if unchecked
        return { ...prevData, [name]: newAvailability };
      });
    } else {
      setVolunteerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="card mb-3 mx-auto my-5 volunteer_form">
      <div className="row g-0">
        {/* Form Section */}
        <div className="col-md-7">
          <div className="card-body">
            <h1 className="card-title text-center volunteer_form_head">
              Volunteer Registration Form
            </h1>
            <form className="my-4" onSubmit={registerVolunteer}>
              {/* Name Field */}
              <div className="mb-3">
                <label htmlFor="Name" className="form-label text-muted">
                  What is your name?
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-control form_input"
                  id="Name"
                  name="Name"
                  value={volunteerData.Name}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="Email" className="form-label text-muted">
                  Enter your email address
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="form-control form_input"
                  id="Email"
                  name="Email"
                  value={volunteerData.Email}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="mb-3">
                <label htmlFor="Phone" className="form-label text-muted">
                  Enter your phone number
                </label>
                <input
                  type="text"
                  placeholder="Your Phone"
                  className="form-control form_input"
                  id="Phone"
                  name="Phone"
                  value={volunteerData.Phone}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Skills Field */}
              <div className="mb-3">
                <label htmlFor="Skills" className="form-label text-muted">
                  What skills do you have?
                </label>
                <input
                  type="text"
                  placeholder="Your Skills"
                  className="form-control form_input"
                  id="Skills"
                  name="Skills"
                  value={volunteerData.Skills}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Availability Field (Checkboxes) */}
              <div className="mb-3">
                <label className="form-label text-muted">
                  When are you available to volunteer?
                </label>
                <div className="availability-checkboxes">
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                    <div className="form-check" key={day}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={day}
                        name="Availability"
                        value={day}
                        checked={volunteerData.Availability.includes(day)}  // Check if the day is selected
                        onChange={onChange}  // Handle checkbox change
                      />
                      <label className="form-check-label" htmlFor={day}>
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* City Field */}
              <div className="mb-3">
                <label htmlFor="City" className="form-label text-muted">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Your City"
                  className="form-control form_input"
                  id="City"
                  name="City"
                  value={volunteerData.City}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn form_submit_btn">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-5">
          <img
            src="https://www.shutterstock.com/image-vector/hands-hearts-raised-volunteering-vector-260nw-727569913.jpg"
            className="img-fluid rounded-start volunteer_form_side_img"
            alt="volunteer"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default VolunteerForm;

