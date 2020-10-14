import React, { useState, useEffect } from "react";

import { storageFB } from "../../../firebase/firebase";
import { db } from "../../../firebase/firebase";
import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";

const UserImage = ({ useremail, favorites, blogs }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState(null);
  const types = ["image/png", "image/jpeg"];
  
  const [avatar, setAvatar] = useState(null);

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



  useEffect(() => {
    const uploadtoStorage = (file) => {
      const storageRef = storageFB.ref(`Avatar/${useremail}/${file.name}`);
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
    if (file) {
      uploadtoStorage(file);
    }
  }, [file,useremail]);

  const sendToFireBase = () => {
    if (fileErr) {
      setFileErr("Please upload : Img Format - image/png or  image/jpeg ");
    } else {
      db.collection("Users").doc(useremail).update({
        avatar: url,
      });
    }
  };

  return (
    <div className="uploaderAAvatar">
      {avatar && <img src={avatar} alt={avatar} />}
      <input type="file" onChange={handleFileChange} />
      <button onClick={sendToFireBase}>Save</button>
      <div className="progress-bar">
        {file && (
          <motion.div
            className="progress-barfill"
            initial={{
              width: 0,
              backgroundColor: "#EF476F",
            }}
            animate={{
              width: progress + "%",
              backgroundColor: "#538d22",
            }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        )}
       
      </div>
      {progress === 100 && <div><BsCheckCircle />
         </div>}
      {error && error}
      {fileErr && <span style={{ color: "red" }}>{fileErr}</span>}
    </div>
  );
};

export default UserImage;
