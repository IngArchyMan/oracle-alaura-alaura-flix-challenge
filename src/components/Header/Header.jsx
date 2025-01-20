import logo from "./../../assets/logo.png";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="tg-surface-container tg-on-primary-border">
      <nav className="nav navbar header-navbar flex-r-b-c">
        <a href="/" className="navbar-brand">
          <img src={logo} alt="AluraFlix Logo" className="navbar-brand-img" />
        </a>
        <div className="nav-links flex-r-c-c">
          <NavLink
            to="/"
            className={({ isActive }) => `link-btn ${isActive ? "active tg-on-primary-text tg-on-primary-border tg-primary" : "tg-on-primary-container-text"}`}
          >
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/new-video"
            className={({ isActive }) => `link-btn ${isActive ? "active tg-on-primary-text tg-on-primary-border tg-primary" : "tg-on-primary-container-text"}`}
          >
            <span>New Video</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
