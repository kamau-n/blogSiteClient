import React, { useState } from "react";
import { like } from "../utilities/Functions/like";
import timeSince from "../utilities/Functions/convert";
import VerifiedIcon from "@mui/icons-material/Verified";

import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { FavoriteBorderSharp } from "@mui/icons-material";
import axios from "axios";

export default function ({ topic }) {
  const [data, setData] = useState([]);
  const [blog_id, setBlog] = useState();
  const [likes, setLikes] = useState();
  const url = "http://localhost:8000/blog/topic";
  useState(() => {
    console.log(topic);
    axios
      .post(url, { topic: topic })
      .then((results) => {
        console.log(results);
        setData(results.data.blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const navigate = useNavigate();
  return (
    <div className=" p-3  h-screen mt-12 pb-20 overflow-auto w-full outline:border-2">
      {data.map((news, key = news.id) => {
        // const likes = news.likes.length;
        const date = timeSince(news.createdAt);

        return (
          <div className=" border-2 mx-auto sm:my-5 my-2 p-10  bg-slate-100  ">
            <div className="flex flex-row  justify-between">
              <div className=" flex flex-row ">
                <div>
                  <img src={news.user.image} alt="no image" />
                </div>
                <h1 className="sm:text-2xl text-xl  text-center p-1 bg-orange-300 rounded-full w-6 h-6 sm:w-10 sm:h-10 ">
                  {news.user.username[0]}
                </h1>
                <h1 className="sm:text-xl text-l font-bold m-1">
                  {news.user.username}
                </h1>
                <VerifiedIcon style={{ color: "blue" }} fontSize="medium" />
              </div>
              <h1 className="text-l font-bold">{date}</h1>
            </div>
            <p className="  text-xl  text-center font-bold rounded-md ">
              {news.title}
            </p>
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
                        fontSize="medium"
                      />
                      <h1 className="text-l"> {likes} likes</h1>
                    </div>
                  </button>
                </form>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/Comments", { state: { news_id: news.id } });
                  }}>
                  <CommentIcon style={{ color: "blue" }} fontSize="medium" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
