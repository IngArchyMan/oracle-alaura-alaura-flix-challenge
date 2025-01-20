import logo from "./../../assets/logo.png";
const Header = () => {
  return (
    <footer className="tg-surface-container tg-on-primary-border">
      <div className="wrapper-footer flex-r-c-c">
        <a href="/" className="footer-brand">
          <img src={logo} alt="AluraFlix Logo" className="footer-brand-img" />
        </a>
      </div>
    </footer>
  );
};

export default Header;
