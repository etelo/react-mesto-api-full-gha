import logo from "../images/mesto.svg";
import { Route, Routes, Link } from "react-router-dom";

function Header({ email, handleLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="Лого место Россия" className="header__logo" />

      <nav className="header__menu">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />

          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />

          <Route
            exact
            path="/"
            element={
              <>
                <p className="header__email">{email}</p>
                <Link to="" className="header__link" onClick={handleLogout}>
                  Выйти
                </Link>
              </>
            }
          />
        </Routes>
      </nav>
    </header>
  );
}

export default Header;
