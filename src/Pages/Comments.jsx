import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, Route, useNavigate, useLocation } from "react-router-dom";
import { data } from "autoprefixer";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import timeSince from "../utilities/Functions/convert";

export default function Comments() {
  const location = useLocation();
  const [textarea, setTextarea] = useState("");
  const [article, setArticle] = useState([]);
  const [data, setData] = useState([]);

  const id = location.state.news_id;

  const url = "http://localhost:8000/blog/" + id;

  console.log(url);

  //getting the post

  const getPost = () => {
    axios
      .get(url)
      .then((results) => {
        setArticle(results.data);
        console.log(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayPost = () => {
    return article.map((artic) => {
      return (
        <>
          <div className=" border-2 mx-auto my-10 p-5 bg-slate-50  ">
            <h1 className="text-xl font-bold text-center">{artic.title}</h1>

            <p className="bg-slate-200 p-2 text-xl text-center rounded-md m-2">
              {artic.content}
            </p>
            <div className="flex justify-around p-4"></div>
          </div>
        </>
      );
    });
  };

  // a part that display other available comments

  useEffect(() => {
    getPost();
    console.log("the id for this blog is ");
    axios
      .post("http://localhost:8000/blog/comments", {
        blogsId: id,
      })
      .then((comments) => {
        setData(comments.data);
        console.log("here are the comments " + comments);
      })
      .catch((err) => console.log("there was an error"));
  }, []);

  const displays = () => {
    return data.map((comment) => {
      const date = timeSince(comment.created_at);
      // console.log(date.toDateString());

      return (
        <div className="my-5 p-5 rounded-md ">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-bold">{comment.user.username}</h2>
            <h2>{date}</h2>
          </div>
          <h1 className="text-center text-white">{comment.comment}</h1>
        </div>
      );
    });
  };

  const comments = () => {
    if (textarea === "") {
      alert("some values are empty");
    } else {
      axios
        .post("http://localhost:8000/blog/comment", {
          comment: textarea,
          userId: 2,
          blogsId: id,
        })
        .then((res) => {
          window.location.reload(true);
          console.log(res.msg);
          toast.success("Commented Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          <ToastContainer />;
        })
        .catch((err) => {
          alert("there was an error");
        });
    }
  };

  return (
    <div className="p-10 m-auto w-3/4 bg-black  mt-2 rounded">
      <div>
        <div className="bg-white"> {displayPost()}</div>
        <div className="flex flex-row justify-between ">
          <div className="[&>*:nth-child(odd)]:bg-blue-300 [&>*:nth-child(even)]:bg-gray-500 w-3/5 h-96 overflow-auto  ">
            <h2 className="text-center text-xl text-orange-700">Comments</h2>
            {displays()}
          </div>

          <div className="w-1/4 mt-0 bg-blue-500 p-5  ">
            <div className="text-center">
              <h1 className="text-white text-2xl text-left">Leave A Comment</h1>
              <h3 className="text-white text-xl text-left">Comment</h3>
              <textarea
                className="p-4 border-2 rounded text-center  mt-5 mx-auto  w-full "
                value={textarea}
                cols={12}
                onChange={(e) => {
                  setTextarea(e.target.value);
                }}
                placeholder="Enter Your Comment Here"></textarea>
            </div>
            <div className="text-center">
              <button
                onClick={comments}
                className="bg-orange-300 p-3 m-4 rounded-md">
                post a comment
              </button>
            </div>

            <div className="text-center">
              <button className="bg-blue-800 p-3 m-4">
                Subscribe to our Newsletters
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link to="/blogs" className="text-center text-xl text-blue-800">
            Back to blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
