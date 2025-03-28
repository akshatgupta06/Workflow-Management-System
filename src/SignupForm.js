// SignupForm.js
import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "./firebase"; // Import createUserWithEmailAndPassword
import { useNavigate, Link } from "react-router-dom";
import logo from "./assests/logo_highbridge.png"; // Replace with your actual logo path
import googleIcon from "./assests/google.jpg"; // Replace with your actual Google icon path
import facebookIcon from "./assests/facebook.jpg"; // Replace with your actual Facebook icon path
import appleIcon from "./assests/apple.jpg"; // Replace with your actual Apple icon path
import bgImage from "./assests/bg-img.png";
import "./SignupForm.css"; // Import the CSS file

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      let errorMessage = "Signup failed";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email address is already in use";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters";
      }
      setError(errorMessage);
      console.error("Signup error:", err);
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
          <h2 className="building-future-text-style">Join Our Community</h2>
          <p className="building-future-paragraph-style">
            Create your account and start managing your workflows efficiently.
          </p>
        </div>
      </div>
      <div className="right-section-style">
        <div className="header-style">
          <h2 className="welcome-back-style">GET STARTED</h2>
          <h3 className="signup-account-style">Create Your Account</h3>
        </div>
        {error && <div className="signup-error">{error}</div>}
        <form className="form-style" onSubmit={handleSignup}>
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
              placeholder="Create a password"
              className="input-style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-frame-style">
            <label htmlFor="confirmPassword" className="label-style">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="input-style"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button-style">
            Sign Up
          </button>
        </form>
        <div className="or-divider-container-style">
          <div className="line-divider-style" />
          <span className="or-text-style">Or sign up with</span>
          <div className="line-divider-style" />
        </div>
        <div className="social-buttons-container-style">
          <button className="social-button-style">
            <img src={googleIcon} alt="Google" className="social-icon-style" />{" "}
            Sign up with Google
          </button>
          <button className="social-button-style">
            <img
              src={facebookIcon}
              alt="Facebook"
              className="social-icon-style"
            />{" "}
            Sign up with Facebook
          </button>
          <button className="social-button-style">
            <img src={appleIcon} alt="Apple" className="social-icon-style" />{" "}
            Sign up with Apple
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "auto" }}>
          <div className="already-user-link-style">
            Already have an account?{" "}
            <Link to="/login" className="login-link-style">
              LOG IN HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
