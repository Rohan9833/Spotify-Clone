import "../Styles/register.css";
import axios from "axios";

const login = () => {
  const work = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const role = document.querySelector('input[name="role"]:checked').value;
    console.log(role);

    console.log({
      email,
      password,
      username,
      role,
    });

    await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        email,
        password,
        username,
        role,
      },
      {
        withCredentials: true,
      },
    );
    console.log("result");
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <h1>Sign Up</h1>
          <p className="subtitle">Sign Up and Start Listening</p>

          <form>
            {/* Name Field */}
            <div className="input-field">
              <span role="img" aria-label="user">
                👤
              </span>
              <input type="text" id="username" placeholder="Your Name" />
            </div>

            {/* Email Field */}
            <div className="input-field">
              <span role="img" aria-label="email">
                ✉️
              </span>
              <input type="email" id="email" placeholder="Email Address" />
            </div>

            {/* Password Field */}
            <div className="input-field">
              <span role="img" aria-label="password">
                🔒
              </span>
              <input type="password" id="password" placeholder="Password" />
            </div>

            <input type="radio" id="user-radio" name="role" value="User" />
            <label htmlFor="user-radio" className="user">
              User
            </label>

            <input type="radio" id="artist-radio" name="role" value="Artist" />
            <label htmlFor="artist-radio" className="artist">
              Artist
            </label>

            <button onClick={work} className="signup-btn">
              Sign up
            </button>
          </form>

          <p className="login-footer">
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default login;
