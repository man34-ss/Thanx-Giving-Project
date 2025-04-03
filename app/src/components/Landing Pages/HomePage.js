import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Vision from "./Vision";
import main_image from "../images/main.png";
import { resource } from "./resource";
import WhatWeDo from "./WhatWeDo";



const Home = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/navigate");
  //   }else{
  //     navigate("/signup")
  //   }
  // }, []);


  const resourceCopy = [...resource];

  const resourceList = resourceCopy.map((el) => (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card card__body" style={{ width: "100%" }}>
        <img
          src={el.img}
          className="card-img-top p-1 resource_card_img"
          alt="resource-image"
        />
        <div className="card-body ">
          <h5 className="card-title card__title">{el.title}</h5>
          <p className="card-text my-3 card__desc">{el.desc}</p>
          <a href={el.link} target="_blank" className="btn my-3 butn">
            Visit page
          </a>
        </div>
      </div>
    </div>
  ));


  return (
    <>
      <>
        <Navbar />
        <div className="homepage">
          <div className="container">
            <div className="first__section text-center my-5">
              <h1 className="main__heading">
              Join us in making a difference and creating a better world - <br></br>
               Thanx-Giving 
              </h1>
              {/* <h2 className="main__desc my-3">
                " Those who dare to believe they can change the world are the
                ones who actually achieve it. "
              </h2> */}
              <Link to="/signup" className="btn btn-primary my-5 main__btn">
                {" "}
                Register here{" "}
                <span>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </Link>
              <h3 className="main__desc my-3">
              Your generosity can transform lives! With just a small Contributation,<br/>
               you can help provide essential resources and support to those in need. Join us in making a lasting impact today!
              </h3>
            </div>
            
            <div className="second__section"
            style={{ marginTop: "20px", clear: "both", position: "relative" }}>
              <img
                src={main_image}
                alt="main_image"
                className="landing__image"
                style={{ width: "100%", maxWidth: "800px", height: "auto",margin: "10px 0" }}
              />
            </div>
            {/* <h3 className="main__desc my-3">
                Be a responsible part in the mission to enlight<br></br> every
                single idea to bring more light in this world.
              </h3> */}

            {/* <h1>Gajanan</h1> */}

            <div className="vision__main__container">
        <div className="container">
          <div className="first__section text-center my-5">
            <h1 className="vision__heading my-3">Our Vision</h1>
            <h2 className="vision__desc my-3">
            Our vision is to build a compassionate and connected community where individuals can easily support one another through campaigns,
             donations, and volunteer efforts. By leveraging technology.
            </h2>
            <h2 className="vision__desc my-3">
            we aim to empower people to respond swiftly
            to urgent needs and create a ripple effect of kindness and positive change
              as a whole.
            </h2>
          </div>
          <div className="second__section">
            {/* <img src={image} alt="main_image" className="vision__image" /> */}
          </div>
        </div>
      </div>
      <br></br>

              <WhatWeDo></WhatWeDo>
        <br></br>


          <div className="container my-5 card__container">
          <h1 className="text-center top__heading1 my-3">
            Know more about campaign
          </h1>
          <div className="row gy-3">{resourceList}</div>
        
               </div>


            <footer
     style={{
       backgroundColor: "black",
       color: "white",
       padding: "20px",
       textAlign: "center",
         }}>
  <p>&copy; 2024 Your thanksgiving. All Rights Reserved.</p>
  <p>
    <a
      href="/privacy"
      style={{ color: "white", textDecoration: "none", marginRight: "15px" }}
    >
      Privacy Policy
    </a>
    <a
      href="/terms"
      style={{ color: "white", textDecoration: "none", marginRight: "15px" }}
    >
      Terms of Service
    </a>
    <a
      href="/contact"
      style={{ color: "white", textDecoration: "none" }}
    >
      Contact Us
    </a>
  </p>
</footer>

          </div>
        </div>
      </>
    </>
  );
};

export default Home;
