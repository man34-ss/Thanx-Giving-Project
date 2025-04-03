import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import UserContext from "../../Context/userContext";
const Navbar = () => {
  const context = useContext(UserContext);
  let { showAlert, setUser } = context;
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Path: ", location.pathname)

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    showAlert("Logged Out Successfully!!", "success");
    navigate("/login");
  };



  return (
    <nav className="navbar navbar-expand-lg top__head">
      <div className="container-fluid">
        <Link className="navbar-brand head" to="/navigate">
          Thanx-Giving
        </Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon togg__icon"></span>
          {/* <i className="fa-solid fa-circle-caret-down togg__icon"></i> */}
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 sub__head">

          <li className="nav-item sub__head__first">
              <Link
                className="nav-link link__first"
                aria-current="page"
                to="/dashboard"
              >
                Campigns
              </Link>
            </li>

            <li className="nav-item sub__head__first">
              <Link
                className="nav-link link__first"
                aria-current="page"
                to="/dashboard/create-volunteer"
              >
                Register for Volunteer
              </Link>
            </li>

            <li className="nav-item sub__head__first">
              <Link
                className="nav-link link__first"
                aria-current="page"
                to="/vision"
              >
                Vision
              </Link>
            </li>
            <li className="nav-item sub__head__second">
              <Link className="nav-link link__second" to="/whatwedo">
                What We Do
              </Link>
            </li>
            {/* <li className="nav-item sub__head__third">
              <Link className="nav-link link__third" to="/howwedoit">
                How We Do It
              </Link>
            </li> */}

            
            {/* Profile dropdown */}
            {location.pathname !== '/' && 
            <li className="nav-item dropdown p-1">
                <a
                  className="nav-link dropdown-toggle active nav__link"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >
                  <i className="fa-solid fa-user">
                    {" "}
                    <span className="nav__link__name">Profile</span>{" "}
                  </i>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end dropdown__menu"
                  aria-labelledby="navbarDropdownMenuLink"
                  >
                  <li>
                    <Link className="dropdown-item" to="/dashboard/profile">
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/dashboard/yourProject">
                      Your Campign
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/dashboard/investments">
                      {/* Investments */}
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      style={{ color: "red" }}
                      onClick={handleLogout}
                      >
                      Logout
                    </button>
                  </li>

                </ul>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
