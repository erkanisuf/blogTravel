import React, { useState, createContext, useEffect } from "react";
import { db, auth } from "../../../firebase/firebase"; // add

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState("ebah");
  const [userid, setuserId] = useState("");
  const [useremail, setuserEmail] = useState("");
  const [pardq, setPardq] = useState("");
  const [favorites, setfavorites] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
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
        console.log(allPost);
        setBlogs(allPost);
        setLoaded(true);
      });
    return () => {
      unsub();
    };
  }, [userid]);

  useEffect(() => {
    const unsub = db.collection("Users").onSnapshot((snapshot) => {
      const allPost = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setfavorites(allPost);
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
        valueSix: [favorites, setfavorites],
        valueEight: [toggle, setToggle],
      }}
    >
      {loaded && props.children}
    </BlogContext.Provider>
  );
};
