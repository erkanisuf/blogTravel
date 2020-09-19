import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      .catch((err) => console.log(err));
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
      .catch((err) => console.log("login err", err));
  };

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
  };
  return (
    <div>
      <form>
        <p>email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>password</p>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>
          Login
        </button>
        <button type="submit" onClick={register}>
          Create Account
        </button>
        <button type="submit" onClick={signOut}>
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default Login;
