import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatePage from "../../pages/CreatePage";
import LinksPage from "../../pages/LinksPage";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    navigate.push("/");
  };
  return (
    <navbar>
      <div>
        <ul>
          <li>
            <Link to={<CreatePage />} />
          </li>
          <li>
            <Link to={<LinksPage />} />
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Exit
            </a>
          </li>
        </ul>
      </div>
    </navbar>
  );
};

export default Navbar;
