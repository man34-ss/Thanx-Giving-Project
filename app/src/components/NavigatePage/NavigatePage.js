


import React, { useState, useEffect, useContext } from "react";
import "./NavigatePage.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Landing Pages/Navbar";
import main_image from "../images/main.png";
import { resource } from "../Landing Pages/resource";
import DashboardCard from "../Dashboard/dashboardCard";
import UserContext from "../../Context/userContext";
// import "../Dashboard/dashboardCard.css" ;

const NavigatePage = () => {
  const navigate = useNavigate();
  const { getUserData, startups, getStartups } = useContext(UserContext); // Adjust the context import if necessary

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
    getStartups();
    getUserData();
  }, [navigate, getStartups, getUserData]);

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  const displayedStartups = startups?.slice(0, 3) || []; // Safeguard against undefined startups

  const resourceList = resource.map((el, index) => (
    <div className="col-lg-4 col-md-6 col-sm-12" key={el.id || index}>
      <div className="card card__body" style={{ width: "100%" }}>
        <img
          src={el.img}
          className="card-img-top p-1 resource_card_img"
          alt="resource-image"
        />
        <div className="card-body">
          <h5 className="card-title card__title">{el.title}</h5>
          <p className="card-text my-3 card__desc">{el.desc}</p>
          <a href={el.link} target="_blank" rel="noopener noreferrer" className="btn my-3 butn">
            Visit page
          </a>
        </div>
      </div>
    </div>
  ));

  const sampleVolunteers = [
    {
      id: 1,
      name: "John Doe",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifgD3-MN5UVxuLCFh8HNlIL7qfWNVLNVOg0iLU-69_5mbWx8xboYmCoqm5vNBMX6iuJo&usqp=CAU",
     // image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fbusinessman_7396247&psig=AOvVaw29Yl2M_hFfkCn0adj3ajCf&ust=1733075872389000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPjI1PPQhIoDFQAAAAAdAAAAABAh",
      description: "Passionate about community service.",
    },
    {
      id: 2,
      name: "Emily Johnson",
      image: "https://cdn-icons-png.flaticon.com/512/2810/2810750.png",
      description: "Focused on environmental causes.",
    },
    {
      id: 3,
      name: "Alex Brown",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifgD3-MN5UVxuLCFh8HNlIL7qfWNVLNVOg0iLU-69_5mbWx8xboYmCoqm5vNBMX6iuJo&usqp=CAU",
      description: "Dedicated to helping the homeless.",
    },
    // {
    //   id: 4,
    //   name: "Emily Johnson",
    //   image: "https://via.placeholder.com/150",
    //   description: "Advocate for education and literacy.",
    // },
  ];
  

  

  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="container">
          {/* First Section */}
          <div className="first__section text-center my-5">
            <h2 className="main__heading">
              Join us in making a difference and creating a better world - <br />
              Thanx-Giving
            </h2>
            <h1>Thanx-Giving</h1>
            <Link to="/search-volunteer" className="btn btn-primary my-5 main__btn">
              Need Volunteer{" "}
              <span>
                <i className="fa-solid fa-angle-right"></i>
              </span>
            </Link>
            <h3 className="main__desc my-3">
              Your generosity can transform lives! With just a small donation,
              <br />
              you can help provide essential resources and support to those in
              need. Join us in making a lasting impact today!
            </h3>
          </div>

          {/* Second Section */}
          <div
            className="second__section"
            style={{ marginTop: "20px", clear: "both", position: "relative" }}
          >
            <img
              src={main_image}
              alt="main_image"
              className="landing__image"
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "auto",
                margin: "10px 0",
              }}
            />
          </div>

   
   



     


            {/* <div className="crowdfunding-section text-center my-5">
              <h2 className="text-center top__heading1 my-3">
                How Donating Creates Positive Change
              </h2>
              <p className="section-desc">
                Donating is a powerful way to make a positive impact on individuals and communities. It allows you to contribute to meaningful causes, no matter how small the amount. Every donation, no matter the size, plays a crucial role in supporting those in need, driving innovation, and fostering positive change. By donating, you become part of a collective effort that amplifies the difference you can make, helping to create a more compassionate and ethical world for all.
              </p>
              <p className="section-desc">
                By participating in this, you become a part of a collective effort that amplifies the impact of every contribution, creating a brighter future for all.
              </p>

              <div className="campaigns-container">
                <div className="row campaigns-container my-4">
                  {displayedStartups.map((el) => (
                    <DashboardCard key={el._id} el={el} />
                  ))}
                </div>

                {/* Explore Campaign button placed next to the sample campaign */}
                {/* <div className="explore-btn-container">
                  <button
                    onClick={handleNavigateToDashboard}
                    className="btn btn-primary my-5 main__btn"
                  >
                    Explore Campaignnnn
                    <span>
                      <i className="fa-solid fa-angle-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div> */} 


              <div className="crowdfunding-section text-center my-5">
                <h2 className="top__heading1 my-3">
                  How Donating Creates Positive Change
                </h2>
                <p className="section-desc">
                  Donating is a powerful way to make a positive impact on individuals and communities. It allows you to contribute to meaningful causes, no matter how small the amount. Every donation, no matter the size, plays a crucial role in supporting those in need, driving innovation, and fostering positive change. By donating, you become part of a collective effort that amplifies the difference you can make, helping to create a more compassionate and ethical world for all.
                </p>
                <p className="section-desc">
                  By participating in this, you become a part of a collective effort that amplifies the impact of every contribution, creating a brighter future for all.
                </p>

                {/* Campaigns Section */}
                <div className="campaigns-container my-4">
                  <div className="row justify-content-center">
                    {displayedStartups.map((el) => (
                      <DashboardCard key={el._id} el={el} />
                    ))}
                  </div>

                  {/* Explore Campaign Button */}
                  <div className="explore-btn-container text-center">
                    <button
                      onClick={handleNavigateToDashboard}
                      className="btn btn-primary my-5 main__btn"
                    >
                      Explore Campaign
                      <span>
                        <i className="fa-solid fa-angle-right ms-2"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>






          {/* Volunteer Registration */}
          <div className="crowdfunding-section text-center my-5">
            <h2 className="text-center top__heading1 my-3">Register as a Volunteer</h2>
            <p className="section-desc">
            Volunteering is more than just giving time—it's about creating meaningful connections and making a lasting impact. Be the helping hand someone needs, and watch your own life be enriched in the process!
            </p>

            <div className="volunteer-profiles-container row justify-content-center my-4">
              {sampleVolunteers.map((volunteer) => (
                <div className="col-md-3 col-sm-6 mb-3" key={volunteer.id}>
                  <div className="volunteer-card">
                    <img
                      src={volunteer.image}
                      alt={volunteer.name}
                      className="volunteer-image"
                    />
                    <h5 className="volunteer-name mt-2">{volunteer.name}</h5>
                    <p className="volunteer-desc">{volunteer.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/dashboard/create-volunteer"
              className="btn btn-primary my-5 main__btn"
            >
              Become Volunteer
              <span>
                <i className="fa-solid fa-angle-right"></i>
              </span>
            </Link>
          </div>





          {/* Resource Section */}
          <div className="container my-5 card__container">
            <h1 className="text-center top__heading1 my-3">
              Know more about campaign
            </h1>
            <div className="row gy-3">{resourceList}</div>
          </div>

          {/* Footer */}
          <footer
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <p>&copy; 2024 Thanx-Giving. All Rights Reserved.</p>
            <p>
              <Link
                to="/privacy"
                style={{ color: "white", textDecoration: "none", marginRight: "15px" }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                style={{ color: "white", textDecoration: "none", marginRight: "15px" }}
              >
                Terms of Service
              </Link>
              <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
                Contact Us
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NavigatePage;

