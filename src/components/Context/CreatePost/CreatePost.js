import React, { useState, useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import firebase from "firebase"; // add
import { BlogContext } from "../Context/BlogContext";
import { storageFB } from "../../../firebase/firebase";
import "./CreatePost.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GrStatusGood } from "react-icons/gr";

const CreatePost = () => {
  const { valueOne, valueThree, valueFour } = useContext(BlogContext);
  const [blogs] = valueOne;
  const [useremail] = valueFour;
  const [userid] = valueThree;

  //////////////////////////////////////////////
  const [valuetext, setValuetext] = useState("");
  console.log(valuetext);
  const [valuetitle, setValuetitle] = useState("");
  const [valuename, setValuename] = useState("");
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState(null);
  const types = ["image/png", "image/jpeg"];
  //////////////////////////////////////////////////
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const navigate = useNavigate();

  const uploadtoStorage = (file) => {
    const storageRef = storageFB.ref(file.name);
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

  const handleEditorChange = (e) => {
    setValuetext(e.target.getContent());
  };

  const handleEditorChangeTitle = (e) => {
    setValuetitle(e.target.value);
  };

  const handleEditorChangeName = (e) => {
    setValuename(e.target.value);
  };

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

  function isMatchingTitle(element) {
    return element.title === valuetitle;
  }

  const checkMegirl = () => {
    if (valuetext === "" || valuetitle === "" || valuename === "") {
      setError("FIll all areas");
      return false;
    }
    if (!file) {
      setFileErr("Upload Image");
    }
    if (
      valuetext.length < 12 ||
      valuetitle.length < 6 ||
      valuename.length < 4
    ) {
      setError("Text min-length 13, Title-7,Name-5");
      return false;
    }
    if (blogs.find(isMatchingTitle)) {
      setError("choose diffrent title");
    } else {
      sendToFireBase();
      navigate("/");
    }
  };

  const sendToFireBase = () => {
    firebase.firestore().collection("blogpost").add({
      name: valuename,
      likes: [],
      useremail: useremail,
      userid: userid,
      image: url,
      uid: firebase.auth().currentUser.uid,
      title: valuetitle,
      text: valuetext,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="createPostJS">
      <button className="sendbtN" onClick={checkMegirl}>
        Publish Post
      </button>
      <div className="crPostTop">
        <div className="postForm">
          <label>Title</label>
          <input type="text" onChange={handleEditorChangeTitle} />
          <label>From</label>
          <input type="text" onChange={handleEditorChangeName} />

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="uploaderA">
          <input type="file" onChange={handleFileChange} />
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
                transition={{ duration: 1 }}
              ></motion.div>
            )}

            {fileErr && <span style={{ color: "red" }}>{fileErr}</span>}
          </div>

          <div className="imageUploaded">
            {url && <img src={url} alt={url} />}
          </div>
        </div>
        <span style={{ color: "red", fontSize: "35px" }}>
          {progress === 100 && <GrStatusGood />}
        </span>
      </div>

      <Editor
        initialValue=""
        apiKey="adzmz3wnuoqc3ez1x0r9tfspmkow9kri6fx2i3cw0ux2d6tt"
        init={{
          selector: "textarea",
          height: 300,

          table_sizing_mode: "auto",
          margin: "0 auto",
          menubar: false,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | image  | help",
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CreatePost;
