import React, { useState, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import firebase from "firebase"; // add
import { BlogContext } from "./BlogContext";

const CreatePost = () => {
  const [valuetext, setValuetext] = useState("");
  const [valuetitle, setValuetitle] = useState("");
  const [valuename, setValuename] = useState("");

  const { valueOne } = useContext(BlogContext);
  const [blogs] = valueOne;

  const handleEditorChange = (e) => {
    setValuetext(e.target.getContent());
  };
  const handleEditorChangeTitle = (e) => {
    setValuetitle(e.target.value);
  };

  const handleEditorChangeName = (e) => {
    setValuename(e.target.value);
  };

  function isMatchingTitle(element) {
    return element.title === valuetitle;
  }

  const checkMegirl = () => {
    if (valuetext === "" || valuetitle === "" || valuename === "") {
      alert("FIll all areas");
      return false;
    }
    if (blogs.find(isMatchingTitle)) {
      alert("choose diffrent title");
    } else {
      console.log("thatsfine");
      sendToFireBase();
    }
    // Originalana na find e = .find((el)=> el>5) za tova ismatching ima element
  };

  const sendToFireBase = () => {
    firebase.firestore().collection("times").add({
      name: valuename,
      upvotes: 1009,
      image:
        "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg",
      pointEvents: true,
      title: valuetitle,
      text: valuetext,
    });
  };
  return (
    <div>
      <button onClick={checkMegirl}>guz</button>
      <h1>hi</h1>
      <label>Title</label>
      <input type="text" onChange={handleEditorChangeTitle} />
      <label>From</label>
      <input type="text" onChange={handleEditorChangeName} />
      <Editor
        initialValue=""
        apiKey="adzmz3wnuoqc3ez1x0r9tfspmkow9kri6fx2i3cw0ux2d6tt"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | image |help",
        }}
        onChange={handleEditorChange}
      />
      <button onClick={sendToFireBase}>Send</button>
    </div>
  );
};

export default CreatePost;
