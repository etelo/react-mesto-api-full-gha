import React, { useCallback } from "react";
import { Navigate } from "react-router";

function Login({ loading, onLogin }) {
  const [userdata, setUserdata] = React.useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userdata;
    onLogin(email, password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вxод</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          className="auth__input"
          placeholder="Email"
          id="email"
          name="email"
          type="text"
          value={userdata.email}
          onChange={handleChange}
          minLength="4"
          maxLength="40"
          required
        />
        <input
          className="auth__input"
          placeholder="Пароль"
          id="password"
          name="password"
          type="password"
          value={userdata.password}
          onChange={handleChange}
          minLength="4"
          maxLength="40"
          required
        />
        <button type="submit" className="auth__submit-button">
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>
    </section>
  );
}

export default Login;
