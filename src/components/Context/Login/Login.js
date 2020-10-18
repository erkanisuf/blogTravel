import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import firebase from "firebase";

import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [forgetPass, setforgetPass] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [togglee, setToglee] = useState(false);
  const navigate = useNavigate();

  // .then(userCredential => {

  //   //set data into User database
  //   firebase.database().ref('User' + "/" + userCredential.user.uid).set({
  //     avatar: '',
  //     favoritePost: [],
  //     useremail: email,
  //     userid: userCredential.user.uid,
  //     likedPost:[],
  //   })})

  const sendDBUser = (auth) => {
    firebase.firestore().collection("Users").doc(`${auth.user.email}`).set({
      avatar: "",
      favoritePost: [],
      useremail: auth.user.email,
      userid: auth.user.uid,
      myLikes: [],
      myPost: [],
    });
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");

          sendDBUser(auth);
        }
      })
      .catch((err) => seterrorMsg(err));
  };

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => seterrorMsg(err));
  };

  const resetPasw = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(forgetPass)
      .then((auth) => {
        seterrorMsg("Please check your email adress.");
      })
      .catch((err) => seterrorMsg(err));
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
          <span
            style={{
              color: "black",
              cursor: "pointer",
              margin: "15px",
              fontWeight: "900",
            }}
            onClick={() => setToglee(!togglee)}
          >
            Forgot password??
          </span>
          {togglee && (
            <div>
              Email:
              <input
                type="text"
                value={forgetPass}
                onChange={(e) => setforgetPass(e.target.value)}
              />
              <button className="resetbtn" type="submit" onClick={resetPasw}>
                Confirm reset
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
