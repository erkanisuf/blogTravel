import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import firebase from "firebase";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const navigate = useNavigate();
  console.log(email, password);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => seterrorMsg(err));
    console.log("error reg/");
  };

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("logged as", auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => seterrorMsg(err));
  };

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
  };
  return (
    <div className="containerMain">
      <div className="imageContLogin">
        <form className="containerLogin">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="emaildLabel">email</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="passwordLabel">password</label>
          {errorMsg && (
            <span style={{ padding: "15px", color: "red" }}>
              {errorMsg.message}
            </span>
          )}
          <div className="buttonsLogin">
            <button className="loginbtn" type="submit" onClick={login}>
              Login
            </button>
            <button className="regbtn" type="submit" onClick={register}>
              Create Account
            </button>
            {/* <button type="submit" onClick={signOut}>
            Sign Out
          </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
