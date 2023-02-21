import React, { useEffect, useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";
//import {} from "react-icons";
import logo from "../static/logo.png";
import logo2 from "../static/logo2.png";
import icon from "./like.jpg";
import jwtDecode from "jwt-decode";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { PeopleRounded, Person2Rounded } from "@mui/icons-material";
import VerifiedIcon from "@mui/icons-material/Verified";
//import { Jwt } from "jsonwebtoken";
import { useJwt } from "react-jwt";

import Cookies from "js-cookie";

import person from "./person.jpeg";
import { Link, useNavigate } from "react-router-dom";
import timeSince from "../utilities/Functions/convert";

import CommentIcon from "@mui/icons-material/Comment";
import { FavoriteBorderSharp } from "@mui/icons-material";
import Top from "../Components/Top";
import SideBar from "../Components/SideBar";
import Bottom from "../Components/Bottom";
import { like } from "../utilities/Functions/like";

export default function Blogs(route) {
  const url = "http://localhost:8000/blogs";
  const [topic, setTopic] = useState("");
  const [data, setData] = useState([]);
  const [blog_id, setBlog] = useState();
  const [likes, setLikes] = useState();
  const [logged, setLogged] = useState(false);

  // const authToken = Cookies.get("authToken");
  // const { decodedToken, isExpired } = useJwt(authToken);
  //console.log(decodedToken);

  // const setDetail = (tokenState, token) => {
  //   if (tokenState) {
  //     setLogged(false);
  //     console.log("loging is false");
  //   } else {
  //     console.log("loggin true");
  //     setLogged(true);
  //     console.log(token);
  //   }
  // };

  const showTrends = () => {};

  useEffect(() => {
    axios
      .get(url)
      .then((results) => {
        setData(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // setDetail(isExpired, decodedToken);

  const navigate = useNavigate();

  return (
    <div className="text-center mt-1">
      <div className="w-full bg-slate-200 flex  mx-auto p-3  top-0 justify-between ">
        <div className=" flex flex-row md:flex-col">
          <img src={logo2} alt="no image" />
        </div>
        <div className="justify-between m-2 p-2">
          {logged ? (
            <div>
              <Link to="/add" className=" text-xl font-medium mx-2">
                Create
              </Link>
              <Link to="/register" className=" text-xl mx-2">
                Profile <Person2Rounded />
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login" className=" text-xl mx-2">
                Login <LoginIcon />
              </Link>
              <Link to="/register" className=" text-xl mx-2">
                Register <HowToRegIcon />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row  mx-auto text-center">
        <SideBar />
        <div className="overflow-auto p-3 h-96 w-3/6">
          {data.map((news, key = news.id) => {
            const likes = news.likes.length;
            const date = timeSince(news.createdAt);

            return (
              <div className=" border-2 mx-auto my-5 p-1 h-36  bg-slate-50  ">
                <div className="flex flex-row justify-between">
                  <div className=" flex flex-row ">
                    <h1 className="text-2xl  text-center p-1 bg-orange-300 rounded-full w-10 h-10 ">
                      {news.user.username[0]}
                    </h1>
                    <h1 className="text-l m-1">{news.user.username}</h1>
                    <VerifiedIcon style={{ color: "blue" }} fontSize="small" />
                  </div>
                  <h1 className="text-l">{date}</h1>
                </div>
                <p className="  text-l  font-bold rounded-md ">{news.title}</p>
                <div className="flex justify-around p-4">
                  <div>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        like(news.id);
                      }}>
                      <button>
                        <div className="flex flex-row">
                          <FavoriteBorderSharp
                            style={{ color: "red" }}
                            fontSize="4xl"
                          />
                          <h1 className="text-sm"> {likes} likes</h1>
                        </div>
                      </button>
                    </form>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/Comments", { state: { news_id: news.id } });
                      }}>
                      <CommentIcon style={{ color: "blue" }} fontSize="4xl" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-1/5">
          <h1 className="font-serif text-gray-600 text-xl m-4">Trending</h1>
        </div>
      </div>

      <Bottom />
    </div>
  );
}
