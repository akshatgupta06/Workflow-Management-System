// LoginForm.js
import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "./firebase"; // ✅ Correct path
import { useNavigate, Link } from "react-router-dom";
import logo from "./assests/logo_highbridge.png"; // Replace with your actual logo path
import googleIcon from "./assests/google.jpg"; // Replace with your actual Google icon path
import facebookIcon from "./assests/facebook.jpg"; // Replace with your actual Facebook icon path
import appleIcon from "./assests/apple.jpg"; // Replace with your actual Apple icon path
import bgImage from "./assests/bg-img.png";
import "./LoginForm.css"; // Importing styles

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", email);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err.message);
    }
  };

  return (
    <div className="page-style">
      <div className="background-image-style" />
      <div className="left-section-style">
        <div className="logo-style">
          <img src={logo} alt="HighBridge Logo" className="logo-image-style" />
        </div>
        <div className="building-future-style">
          <h2 className="building-future-text-style">
            Welcome to Workflow Management
          </h2>
          <p className="building-future-paragraph-style">
            Streamline your tasks and collaborate effectively.
          </p>
        </div>
      </div>
      <div className="right-section-style">
        <div className="header-style">
          <h2 className="welcome-back-style">WELCOME BACK !</h2>
          <h3 className="login-account-style">Log In to your Account</h3>
        </div>
        {error && <div className="login-error">{error}</div>}
        <form className="form-style" onSubmit={handleLogin}>
          <div className="input-frame-style">
            <label htmlFor="email" className="label-style">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="input-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-frame-style">
            <label htmlFor="password" className="label-style">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input-style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-forgot-style">
            <label className="remember-me-style">
              <input type="checkbox" style={{ marginRight: "5px" }} /> Remember
              me
            </label>
            <Link to="/forgot-password" className="forgot-password-style">
              {" "}
              {/* You'll need to create this route/component */}
              Forgot your password?
            </Link>
          </div>
          <button type="submit" className="login-button-style">
            Log In
          </button>
        </form>
        <div className="or-divider-container-style">
          <div className="line-divider-style" />
          <span className="or-text-style">Or sign in with</span>
          <div className="line-divider-style" />
        </div>
        <div className="social-buttons-container-style">
          <button className="social-button-style">
            <img src={googleIcon} alt="Google" className="social-icon-style" />{" "}
            Log in with Google
          </button>
          <button className="social-button-style">
            <img
              src={facebookIcon}
              alt="Facebook"
              className="social-icon-style"
            />{" "}
            Log in with Facebook
          </button>
          <button className="social-button-style">
            <img src={appleIcon} alt="Apple" className="social-icon-style" />{" "}
            Log in with Apple
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "auto" }}>
          <div className="new-user-link-style">
            New User ?{" "}
            <Link to="/signup" className="sign-up-link-style">
              SIGN UP HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
