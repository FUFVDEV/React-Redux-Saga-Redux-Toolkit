import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import "styles/sidebarStyles.css";

const Sidebar = () => {
  console.log("SideBar");
  return (
    <div className="sidebar">
      <div className="sidebar__logo">ADMIN SYSTEM</div>
      <div className="sidebar__label">Navegación</div>
      <ul className="sidebar__vertical-navbar">
        <li className="active">
          <Link to="usuarios">
            <span className="sidebar__icon">
              <UserOutlined />
            </span>{" "}
            <span>Usuarios</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
