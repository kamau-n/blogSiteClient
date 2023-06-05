import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, Route, useNavigate, useLocation } from "react-router-dom";
import { data } from "autoprefixer";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import timeSince from "../utilities/Functions/convert";
import {
  Comment,
  HeatPumpRounded,
  Reply,
  HeartBroken,
  FavoriteBorderSharp,
} from "@mui/icons-material";
import pic from "../uploads/SniperLevel.png";

export default function Comments() {
  const location = useLocation();
  const [textarea, setTextarea] = useState("");
  const [article, setArticle] = useState([]);
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState("");

  const id = location.state.news_id;

  const url = "http://localhost:8000/blog/" + id;

  console.log(url);

  const token = localStorage.getItem("blog_auth_token");
  const authenticate = (token) => {
    axios
      .post("http://localhost:8000/token_authenticate", { token: token })
      .then((res) => {
        if (res.data.authenticated) {
          setDetails(res.data.user);
          console.log(res.data.user);
        } else {
          // setLogged(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //getting the post

  const getPost = () => {
    axios
      .get(url)
      .then((results) => {
        setArticle(results.data);
        // console.log(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayPost = () => {
    return article.map((artic) => {
      console.log(artic);
      return (
        <div className="">
          <div className=" border-2  lg:w-3/4 md:w-3/4 md:mx-auto lg:mx-auto mx-5 w-full my-10 px-5 py-6 bg-slate-50  ">
            <div className="flex justify-between">
              <h1 className="sm:text-2xl text-l px-2 py-4 my-4 font-bold text-left">
                {artic.title}
              </h1>

              <h1 className="text-l md:text-xl lg:text-xl px-2 py-4 my-4 font-bold text-left">
                {timeSince(artic.createdAt)}
              </h1>
            </div>
            <div>
              <img
                src={pic}
                alt="no image"
                className="w-full px-2 md:px-5 lg:px-6 h-48 md:h-80 lg:h-96"
              />
            </div>

            <p className="bg-white px-2 py-8  text-sm sm:text-xl text-left  first-letter:uppercase rounded-md m-2">
              {artic.content}
            </p>
          </div>
        </div>
      );
    });
  };

  // a part that display other available comments

  useEffect(() => {
    getPost();
    authenticate(token);

    axios
      .post("http://localhost:8000/blog/comments", {
        blogsId: id,
      })
      .then((comments) => {
        setData(comments.data);
        // console.log("here are the comments " + comments);
      })
      .catch((err) => console.log("there was an error"));
  }, []);

  const displays = () => {
    return data.map((comment) => {
      const date = timeSince(comment.created_at);
      // console.log(date.toDateString());

      return (
        <div className="my-5 py-2 px-3  border-2 rounded-md ">
          <div className="flex flex-row rounded-md justify-between">
            <h2 className="sm:text-l text-sm  font-bold">
              {comment.user.username}
            </h2>
            <h2>{date}</h2>
          </div>
          <h1 className="text-center text-black font-mono">
            {comment.comment}
          </h1>
          <div className="flex justify-around p-4">
            <Reply />
            <FavoriteBorderSharp style={{ color: "red" }} fontSize="medium" />
          </div>
        </div>
      );
    });
  };

  const comments = () => {
    if (textarea === "") {
      setErrors("Some values are empty");
    } else {
      axios
        .post("http://localhost:8000/blog/comment", {
          comment: textarea,
          userId: details.id,
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
    <div className="p-5  w-full  my-2 mx-8 py-5 px-8 bg-slate-100 rounded">
      <div className="p-4">
        <div className="bg-slate-100"> {displayPost()}</div>
        <div className="sm:flex sm:flex-row justify-between ">
          <div className="sm:w-3/4 mt-0  sm:mx-auto p-5  ">
            <div className="text-center">
              <h1 className="text-black sm:text-2xl text-xl text-center sm:text-left">
                Leave A Comment
              </h1>
              <h3 className="text-red-400 text-l md:text-xl lg:text-2xl font-semibold text-center px-2 ">
                {errors}
              </h3>
              <h3 className="text-blue-400 text-xl  px-2 text-left">Comment</h3>
              <textarea
                className="p-4 border-2 rounded-lg outline-none text-left sm:text-xl  text-l mt-5 mx-auto   h-32 md:h-48 lg:h-48 w-full"
                value={textarea}
                cols={20}
                onChange={(e) => {
                  setErrors("");
                  setTextarea(e.target.value);
                }}
                placeholder="Enter Your Comment Here...."></textarea>
            </div>
            <div className="text-left">
              <button
                onClick={comments}
                className="bg-orange-600 px-3 sm:py-4 py-2  text:l sm:text-2xl text-white m-4 ">
                post a comment
              </button>
            </div>

            <div className=" w-full ">
              <h2 className="text-center text-2xl py-2 my-4 text-orange-700">
                Comments
              </h2>
              <div className=" h-96 overflow-auto ">{displays()}</div>
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
