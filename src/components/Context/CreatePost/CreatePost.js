import React, { useState, useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import firebase from "firebase"; // add
import { BlogContext } from "../Context/BlogContext";
import { storageFB } from "../../../firebase/firebase";
import "./CreatePost.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";

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
  const [url, setUrl] = useState(null);
  //////////////////////////////////////////
  const [titleErr, settitleErr] = useState(null);
  const [nameErr, setnameErr] = useState(null);
  const [textErr, setttextErr] = useState(null);

  const navigate = useNavigate();

  const uploadtoStorage = (file) => {
    const storageRef = storageFB.ref(`Post/${useremail}/${file.name}`);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setFileErr(err);
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
    if (valuetext === "" || valuetext.length < 12) {
      setttextErr("Please fill text-area with more than 13 chars");
      return false;
    } else {
      setttextErr(null);
    }
    if (valuetitle === "" || valuetitle.length < 6) {
      settitleErr("Please fill the title with more than 6 chars");
      return false;
    } else {
      settitleErr(null);
    }
    if (valuename === "" || valuename.length < 4) {
      setnameErr("Please fill name with more than 4 chars");
      return false;
    } else {
      setnameErr(null);
    }
    if (!file) {
      setFileErr("Upload Image");
      return false;
    } else {
      setFileErr(null);
    }

    if (blogs.find(isMatchingTitle)) {
      settitleErr("choose diffrent title");
    } else {
      sendToFireBase();
      navigate("/");
    }
  };

  const sendToFireBase = () => {
    firebase
      .firestore()
      .collection("blogpost")
      .add({
        name: valuename,
        likes: [],
        useremail: useremail,
        userid: userid,
        image: url,
        uid: firebase.auth().currentUser.uid,
        title: valuetitle,
        text: valuetext,
        date: new Date().toISOString(),
        comments: [],
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        addtoUserPosts(docRef.id);
      });
  };

  const addtoUserPosts = (param) => {
    firebase
      .firestore()
      .collection("Users")
      .doc(useremail)
      .update({
        myPost: firebase.firestore.FieldValue.arrayUnion(param),
      });
  };

  return (
    <div className="createPostJS">
      <div className="crPostTop">
        <div className="postForm">
          <label>Title</label>
          <input
            type="text"
            onChange={handleEditorChangeTitle}
            maxLength="20"
          />
          {titleErr && <p style={{ color: "red" }}>{titleErr}</p>}
          <label>From</label>
          <input type="text" onChange={handleEditorChangeName} />

          {nameErr && <p style={{ color: "red" }}>{nameErr}</p>}
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
                transition={{ duration: 0.5 }}
              ></motion.div>
            )}
          </div>
          {fileErr && <span style={{ color: "red" }}>{fileErr}</span>}
          <span
            style={{ color: "#538d22", fontSize: "35px", textAlign: "center" }}
          >
            {progress === 100 && <BsCheckCircle />}
          </span>
          <div className="imageUploaded">
            {url && <img src={url} alt={url} />}
          </div>
          <button className="sendbtN" onClick={checkMegirl}>
            Publish Post
          </button>
        </div>
      </div>
      {textErr && <p style={{ color: "red" }}>{textErr}</p>}

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
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image  | help",
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CreatePost;
