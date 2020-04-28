import React, { useEffect, useContext } from "react";
import { useCss, always, maybe } from "kremling";
import { NavLink } from "react-router-dom";
import { mediaMobile } from "../styleguide/styleguide.component";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";

export default function Sidebar(props) {
  const scope = useCss(css);

  useEffect(() => {
    if (props.forceShow) {
      window.addEventListener("click", props.hideSidebar);
      return () => window.removeEventListener("click", props.hideSidebar);
    }
  }, [props.forceShow]);

  return (
    <nav
      className={always("sidebar").maybe("force-show", props.forceShow)}
      {...scope}
    >
      <ul className="navbar-links">
        <div>
          <li>
            <NavLink
              to="/"
              exact
              className="nav-link logo-nav-link"
              activeClassName="active"
              onClick={maybeHideSidebar}
            >
              <div className="logo-row">
                <img
                  className="logo"
                  src="https://single-spa.js.org/img/logo-white-bgblue.svg"
                  alt="single-spa logo"
                />
                <div className="product-name">Playground</div>
              </div>
            </NavLink>
          </li>
        </div>
        <div>
          <li>
            <NavLink
              to="/applications-guide"
              className="nav-link"
              activeClassName="active"
              onClick={maybeHideSidebar}
            >
              <div>Single-spa applications</div>
            </NavLink>
          </li>
        </div>
        <div>
          <li>
            <NavLink
              to="/verify-app-guide"
              className="nav-link"
              activeClassName="active"
              onClick={maybeHideSidebar}
            >
              <div>Verify single-spa app</div>
            </NavLink>
          </li>
        </div>
        <div>
          <li>
            <NavLink
              to="/root-config-guide"
              className="nav-link"
              activeClassName="active"
              onClick={maybeHideSidebar}
            >
              <div>Root configuration</div>
            </NavLink>
          </li>
        </div>
        <div>
          <li>
            <NavLink
              to="/stuck"
              className="nav-link"
              activeClassName="active"
              onClick={maybeHideSidebar}
            >
              <div>Stuck?</div>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );

  function maybeHideSidebar() {
    if (props.forceShow) {
      props.hideSidebar();
    }
  }
}

const css = `
& .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 23.6rem;
  height: 100vh;
  background-color: white;
  box-shadow: 0 10px 40px -24px #393b3f;
  transition: left 0.2s ease-in-out;
}

${mediaMobile} {
  & .sidebar {
    left: -23.6rem;
  }

  & .sidebar.force-show {
    left: 0;
  }
}

& .nav-link:hover {
  background-color: #dfdfdf;
}

& ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

& li {
  list-style: none;
}

& .nav-link, & .nav-link:focus, & .nav-link:visited {
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  min-height: 5.6rem;
  max-height: 5.6rem;
  padding: .8rem 1.6rem;
}

& .nav-link.logo-nav-link {
  padding-left: .4rem;
}

& .nav-link > div {
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
}

& .logo {
  height: 4.0rem;
}

& .logo-row {
  display: flex;
  align-items: center;
}

& .product-name {
  padding-left: .8rem;
}

& .active {
  font-weight: bold;
}
`;
