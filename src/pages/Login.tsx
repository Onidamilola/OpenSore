import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Shopping from "../assets/shopping.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate("/");
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${Shopping})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-box">
        <h2 className="login-title">Login to OpenStore</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
