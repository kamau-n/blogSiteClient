import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Create() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const user_id = 2;
  const url = "http://localhost:8000/blogs";
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, content);
    axios
      .post(url, {
        title: title,
        content: content,
        topic: topic,
        userId: 5,
      })
      .then((results) => {
        // console.log(results);
        alert("success");
      })
      .catch((error) => {
        alert("there was an error in adding the news");
      });
  };

  return (
    <div className="mt-5 p-10">
      <h1 className="text-center text-3xl">MEDIA BLOG</h1>
      <div className="m-auto p-10">
        <form onSubmit={handleSubmit}>
          <div className="text-center   m-10">
            <input
              className="p-2 text-center border-2  w-1/3 border-black "
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter the title of the news"
            />
          </div>
          <div className="text-center m-10">
            <select
              value={topic}
              className="p-2 w-1/3 text-center"
              onChange={(e) => {
                setTopic(e.target.value);
              }}>
              <option>Politics</option>
              <option>Entertainment</option>
              <option>Business</option>
              <option>Fashion</option>
              <option>Sports</option>
            </select>
          </div>
          <div className="text-center  m-10 ">
            <textarea
              type="text"
              className="p-2 text-center border-2 w-1/3  border-black"
              value={content}
              rows={7}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="Enter the content the news"></textarea>
          </div>

          <div className="text-center  m-10">
            <button className="border-2 px-10 py-5  text-2xl w-1/3 border-blue-300 bg-blue-500 rounded-xl">
              add
            </button>
          </div>
        </form>
      </div>
      <Link to="/blogs" className="text-center text-xl text-blue-800">
        Got to news
      </Link>
    </div>
  );
}

export default Create;
