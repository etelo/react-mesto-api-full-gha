import React, { useCallback, useState } from "react";
import { Navigate, Link } from "react-router-dom";

function Register({ loading, onRegister }) {
  const [userdata, setUserdata] = React.useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserdata({ ...userdata, [name]: value });
    },
    [userdata]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // onLogin(userdata);
      const { email, password } = userdata;
      onRegister(email, password);
    },
    [onRegister, userdata]
  );

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          className="auth__input"
          placeholder="Email"
          minLength="4"
          maxLength="40"
          id="email"
          name="email"
          type="email"
          value={userdata.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth__input"
          placeholder="Пароль"
          minLength="4"
          maxLength="40"
          id="password"
          name="password"
          type="password"
          value={userdata.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth__submit-button">
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
export default Register;
