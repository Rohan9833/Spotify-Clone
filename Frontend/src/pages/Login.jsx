import React from "react";
import "../Styles/login.css";
import { Mail } from "lucide-react";
import axios from "axios";

const Login = () => {
  function name() {
    let email = document.querySelector("#email").value;
    console.log(email);
    let password = document.querySelector("#password").value;
    console.log(password);

    axios
      .post(
        "https://spotify-clone-mvo1.onrender.com/api/auth/login",
        {
          email,
          password, 
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <>
      <div className="container">
        <div className="contents">
          <h1>Welcome back</h1>
          <p>Login to continue Our App</p>
          <input type="text" id="email" placeholder="Email address" />
          <input type="text" id="password" placeholder="Password" />
          <button onClick={name}>Log in</button>
        </div>
        <p>
          Dont have an account? <a>Signup</a>
        </p>
      </div>
    </>
  );
};

export default Login;
