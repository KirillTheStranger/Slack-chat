const NavBar = ({ children }) => {
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Chat
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default NavBar;
