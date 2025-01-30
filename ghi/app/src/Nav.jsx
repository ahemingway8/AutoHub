import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          CarCar
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              Manufacturers
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink></li>
              <li><NavLink className="dropdown-item" to="/createmanufacturers">Create a Manufacturer</NavLink></li>
            </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Vehicle Models
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li><NavLink className="dropdown-item" to="/vehiclemodels">Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/createmodel">Create a Model</NavLink></li>
              </ul>
            </li>


            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Automobiles
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li><NavLink className="dropdown-item" to="/automobiles">Automobiles</NavLink></li>
                <li><NavLink className="dropdown-item" to="/addAutomobile">Add Automobile</NavLink></li>
              </ul>
            </li>


            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Salespeople
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li><NavLink className="dropdown-item" to="/salespeople">Salespeople</NavLink></li>
                <li><NavLink className="dropdown-item" to="/addSalesperson">Add Salesperson</NavLink></li>
                <li><NavLink className="dropdown-item" to="/saleshistory">Salesperson History</NavLink></li>
              </ul>
            </li>


            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Customers
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li><NavLink className="dropdown-item" to="/customers">Customers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/addCustomer">Add Customer</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li><NavLink className="dropdown-item" to="/sales">Sales</NavLink></li>
                <li><NavLink className="dropdown-item" to="/addSale">Add a Sale</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Technicians
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li><NavLink className="dropdown-item" to="/technicians">Technicians</NavLink></li>
                <li><NavLink className="dropdown-item" to="/addTechnician">Add a Technician</NavLink></li>
              </ul>
            </li>


            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li><NavLink className="dropdown-item" to="/appointments">Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/createappointment">Create a Service Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/servicehistory">Service History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
