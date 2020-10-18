import React, { useContext, useState } from "react";
import { BlogContext } from "../Context/BlogContext";
import UserImage from "./UserImage";
import "./Settings.css";

import firebase from "firebase";

import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const UserPanel = () => {
  const { valueOne, valueFour, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;
  const [useremail] = valueFour;
  const [favorites] = valueSix;

  const [forgetPass, setforgetPass] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const [toggleImg, setToggleImg] = useState(false);
  const [toggleReset, setToggleReset] = useState(false);

  const resetPasw = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(forgetPass)
      .then((auth) => {
        console.log(auth);
        seterrorMsg("Please reset password by checking your mail box");
        console.log("check email");
      })
      .catch((err) => seterrorMsg(err));
  };

  return (
    <div className="theSettings">
      <h1>Settings</h1>
      <span onClick={() => setToggleImg(!toggleImg)}>
        {toggleImg ? <AiFillCaretUp /> : <AiFillCaretDown />}Change/Upload
        Avatar
      </span>
      {toggleImg && (
        <UserImage useremail={useremail} favorites={favorites} blogs={blogs} />
      )}

      <span onClick={() => setToggleReset(!toggleReset)}>
        {toggleReset ? <AiFillCaretUp /> : <AiFillCaretDown />}Reset Password
      </span>
      {toggleReset && (
        <div className="paswReset">
          Email:
          <input
            type="text"
            value={forgetPass}
            onChange={(e) => setforgetPass(e.target.value)}
          />
          <button className="resetbtn" type="submit" onClick={resetPasw}>
            Confirm reset
          </button>
          {errorMsg && <div>errorMsg </div>}
        </div>
      )}
    </div>
  );
};

export default UserPanel;
