


import React, { useEffect, useContext, useState } from "react";
import "./Dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import UserContext from "../../Context/userContext";
import DashboardCard from "./dashboardCard";
import ReactLoading from "react-loading";

const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  let { getUserData, startups, getStartups } = context;
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All"); // Default to "All"
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getUserData();
    getStartups();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const resourceCopy = [...startups];
  
  // Adjust filtering logic
  const FilteredList = category === "All" ? resourceCopy : resourceCopy.filter((element) => {
    return element.Category === category;
  });
  
  const resourceList = FilteredList.map((el) => (
    <DashboardCard key={el._id} el={el}></DashboardCard>
  ));
  
  return (
    <>
      {loading ? (
        <ReactLoading
          type={"cylon"}
          color={"rgb(225, 41, 246)"}
          height={"50%"}
          width={"100%"}
        />
      ) : (
        <>
          <DashboardNavbar />
          <div className="scrollmenu">
            <h5
              onClick={() => {
                setCategory("All"); // Show all categories
              }}
            >
              All
            </h5>
            <h5
              onClick={() => {
                setCategory("Environmental");
              }}
            >
              Environmental
            </h5>
            <h5
              onClick={() => {
                setCategory("Educational");
              }}
            >
              Educational
            </h5>
            <h5
              onClick={() => {
                setCategory("Healthcare");
              }}
            >
              Healthcare
            </h5>
            <h5
              onClick={() => {
                setCategory("Disaster Relief");
              }}
            >
              Disaster Relief
            </h5>
            <h5
              onClick={() => {
                setCategory("Food Distribution");
              }}
            >
            Food distribution
            </h5>
            <h5
              onClick={() => {
                setCategory("Animal Welfare");
              }}
            >
              Animal Welfare
            </h5>
          </div>
          <div className="container-fluid dashboard__container">
            <div className="container my-5">
              <div className="row gy-3">
                {FilteredList.length === 0 && (
                  <>
                    <h2
                      className="text-center my-5"
                      style={{ color: "rgb(225, 41, 246)" }}
                    >
                      No Campaign Available
                    </h2>
                  </>
                )}
                {resourceList}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
