import React, { useState, useEffect } from "react";

import { storageFB } from "../../../firebase/firebase";
import { db } from "../../../firebase/firebase";

const UserImage = ({ useremail, favorites, setAvatar, blogs }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState(null);
  const types = ["image/png", "image/jpeg"];

  useEffect(() => {
    const checkuserAndPost = () => {
      let favK = favorites.find((el) => {
        return el.id === useremail;
      });
      const avatar = { ...favK };
      setAvatar(avatar.avatar);
    };
    checkuserAndPost();
  }, [blogs, favorites, useremail, setAvatar]);

  const handleFileChange = (e) => {
    let fileSelect = e.target.files[0];
    if (fileSelect && types.includes(fileSelect.type)) {
      setFile(fileSelect);
      setFileErr("");
    } else {
      setFile(null);
      setFileErr("Img Format - image/png or  image/jpeg ");
    }
  };

  const uploadtoStorage = (file) => {
    const storageRef = storageFB.ref(`Avatar/${file.name}`);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }
    );
  };

  useEffect(() => {
    if (file) {
      uploadtoStorage(file);
    }
  }, [file]);
  // references

  //   const checkMegirl = () => {
  //     if (valuetext === "" || valuetitle === "" || valuename === "") {
  //       alert("FIll all areas");
  //       return false;
  //     }
  //     if (blogs.find(isMatchingTitle)) {
  //       alert("choose diffrent title");
  //     } else {
  //       sendToFireBase();
  //       navigate("/");
  //     }
  //   };

  const sendToFireBase = () => {
    db.collection("favoritePost").doc(useremail).update({
      avatar: url,
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={sendToFireBase}>Save</button>
    </div>
  );
};

export default UserImage;
