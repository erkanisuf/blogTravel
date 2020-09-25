import React, { useState, createContext, useEffect } from "react";
import { useMatch } from "react-router";
import { db, auth } from "../../firebase/firebase"; // add

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState("ebah");
  const [userid, setuserId] = useState("");
  const [useremail, setuserEmail] = useState("");
  const [pardq, setPardq] = useState("");

  console.log(pardq, "PADIIIIIIIIIIIm");
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      console.log("Auth_Status_Change", authuser);
      if (authuser) {
        setLoggedIn(true);
        setuserId(authuser.uid);
        setuserEmail(authuser.email);
      } else {
        setLoggedIn(false);
        setuserId(null);
      }
    });
  }, []);

  useEffect(() => {
    const unsub = db
      .collection("blogpost")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const allPost = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(allPost);
        setLoaded(true);
      });
    return () => {
      unsub();
    };
  }, [userid]);

  return (
    <BlogContext.Provider
      value={{
        valueOne: [blogs, setBlogs],
        valueTwo: [loggedIn, setLoggedIn],
        valueThree: [userid, setuserId],
        valueFour: [useremail, setuserEmail],
        valueFive: [pardq, setPardq],
      }}
    >
      {loaded && props.children}
    </BlogContext.Provider>
  );
};
