import React from "react";
import "../Styles/upload.css";
import axios from "axios";

const upload = () => {
  async function sumbit(e) {
    const input = document.getElementsByClassName("file")[0];
    const title = document.getElementsByClassName("title")[0].value;
    if (!title || title.trim() === "") {
      alert("Title dena zaroori hai ⚠️");
      return;
    }
    let file = input.files[0];
    console.log(title);
    if (!file) {
      alert("File select karo pehle ⚠️");
      return;
    }
    const formData = new FormData();
    formData.append("music", file);
    formData.append("title", title);

    await axios.post("http://localhost:3000/api/music/upload", formData, {
      withCredentials: true,
    });
    console.log("hello world");
  }

  return (
    <>
      <div className="container">
        <label className="upload-cover">
          <h3 className="uploadheadding">Click to Upload</h3>
          <p className="uploadtext">or drag and drop a file here</p>
          <input type="file" className="file" accept="audio/*" hidden />
        </label>
        <input type="text" placeholder="Enter Title" className="title" />
        <button className="sumbit" type="button" onClick={sumbit}>
          Sumbit
        </button>
      </div>
    </>
  );
};

export default upload;
