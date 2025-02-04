import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Nav() {

  const inventoryItems = [
    { label: "Manufacturers", items: [
      { to: "/manufacturers", text: "View All" },
      { to: "/createmanufacturers", text: "Add New" }
    ]},
    { label: "Vehicle Models", items: [
      { to: "/vehiclemodels", text: "View All" },
      { to: "/createmodel", text: "Add New" }
    ]},
    { label: "Automobiles", items: [
      { to: "/automobiles", text: "View Inventory" },
      { to: "/addAutomobile", text: "Add to Inventory" }
    ]}
  ];

  const salesItems = [
    { label: "Sales", items: [
      { to: "/sales", text: "View Sales" },
      { to: "/addSale", text: "Record New Sale" }
    ]},
    { label: "Salespeople", items: [
      { to: "/salespeople", text: "View Team" },
      { to: "/addSalesperson", text: "Add Team Member" },
      { to: "/saleshistory", text: "Sales History" }
    ]},
    { label: "Customers", items: [
      { to: "/customers", text: "View All" },
      { to: "/addCustomer", text: "Add New" }
    ]}
  ];

  const serviceItems = [
    { label: "Services", items: [
      { to: "/appointments", text: "Current Appointments" },
      { to: "/createappointment", text: "Schedule New" },
      { to: "/servicehistory", text: "Service History" }
    ]},
    { label: "Technicians", items: [
      { to: "/technicians", text: "View Team" },
      { to: "/addTechnician", text: "Add Team Member" }
    ]}
  ];

  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-car-front me-2"></i>
          AutoHub
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown mx-2">
              <button
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-box me-1"></i>
                Inventory
              </button>
              <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
                {inventoryItems.map((group, idx) => (
                  <div key={idx}>
                    {idx > 0 && <li><hr className="dropdown-divider" /></li>}
                    <li><h6 className="dropdown-header">{group.label}</h6></li>
                    {group.items.map((item, i) => (
                      <li key={i}>
                        <NavLink className="dropdown-item" to={item.to}>
                          {item.text}
                        </NavLink>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </li>

            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-cash me-1"></i>
                Sales
              </a>
              <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
                {salesItems.map((group, idx) => (
                  <div key={idx}>
                    {idx > 0 && <li><hr className="dropdown-divider" /></li>}
                    <li><h6 className="dropdown-header">{group.label}</h6></li>
                    {group.items.map((item, i) => (
                      <li key={i}>
                        <NavLink className="dropdown-item" to={item.to}>
                          {item.text}
                        </NavLink>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </li>


            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-wrench me-1"></i>
                Service
              </a>
              <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
                {serviceItems.map((group, idx) => (
                  <div key={idx}>
                    {idx > 0 && <li><hr className="dropdown-divider" /></li>}
                    <li><h6 className="dropdown-header">{group.label}</h6></li>
                    {group.items.map((item, i) => (
                      <li key={i}>
                        <NavLink className="dropdown-item" to={item.to}>
                          {item.text}
                        </NavLink>
                      </li>
                    ))}
                  </div>
                  ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
