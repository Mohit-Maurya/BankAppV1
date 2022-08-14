import React from "react";

function Navigation({ title, bgColor, textColor, route, routeName }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
    marginLeft: "auto",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyles}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <h1>{title}</h1>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href={`${route}`}
              >
                {routeName}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Login
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/registration"
              >
                Registration
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigation.defaultProps = {
  route: "/",
  routeName: "Home",
  title: "Bank 404",
  bgColor: "#2d3c64",
  textColor: "#fff",
};

export default Navigation;
