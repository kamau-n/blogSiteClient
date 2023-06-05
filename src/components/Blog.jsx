import React, { useState } from "react";
import { like } from "../utilities/Functions/like";
import timeSince from "../utilities/Functions/convert";
import VerifiedIcon from "@mui/icons-material/Verified";

import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { FavoriteBorderSharp } from "@mui/icons-material";
import pic from "../uploads/Screenshot from 2023-05-22 19-36-44.png";

import axios from "axios";

export default function () {
  const [data, setData] = useState([]);
  const [blog_id, setBlog] = useState();
  const [likes, setLikes] = useState();
  const url = "http://localhost:8000/blogs";
  useState(() => {
    axios
      .get(url)
      .then((results) => {
        // console.log(results);
        setData(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const navigate = useNavigate();
  return (
    <div className=" p-3  grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-3 sm:w-3/4 mx-auto  mt-12 my-10 pb-20 overflow-auto ">
      {data.map((news, key = news.id) => {
        const likes = news.likes.length;
        const date = timeSince(news.createdAt);
        const url_img = `http://localhost:8000/${pic}`;
        console.log(url_img, pic);

        return (
          <div className=" border-2 sm:my-10 my-3  p-10  bg-slate-100  ">
            <div className="flex flex-row  justify-between">
              <div
                className="  "
                onClick={() => {
                  navigate("/Comments", { state: { news_id: news.id } });
                }}>
                <div className="w-full">
                  <img
                    // src={`/harry/Developer/Projects/News/uploads/${news.image}`}
                    src={pic}
                    alt="no image"
                    className="bg-cover"
                  />
                </div>
                <h2 className="text-sm md:text-l lg:text-xl first-letter:uppercase mt-3 mx-2  font-semibold font-serif">
                  {news.title}
                </h2>
                <div className="flex justify-between m-1">
                  <h1 className="text-sm md:text-l lg:text-l font-black m-1">
                    {news.user.username}
                  </h1>
                  <h1 className="text-sm  md:text-l lg:text-l font-black m-1">
                    {date}
                  </h1>
                </div>

                {/* <h1 className="sm:text-2xl  text-l text-center sm:p-1 bg-orange-300 rounded-full w-6 h-6 sm:w-10 sm:h-10 ">
                  {news.user.username[0]}
                </h1>
                 */}
                {/* <VerifiedIcon style={{ color: "blue" }} fontSize="medium" /> */}
              </div>
              {/* <h1 className="sm:text-l text-sm font-bold">{date}</h1> */}
            </div>
            {/* <p className="  sm:text-xl text-sm  text-center font-bold rounded-md ">
              {news.title}
            </p> */}
            {/* <div className="flex justify-around p-4">
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
            </div> */}
          </div>
        );
      })}
    </div>
  );
}
