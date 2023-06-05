import {
  Delete,
  Face,
  House,
  Logout,
  MenuBook,
  Message,
  Newspaper,
  Person,
} from "@mui/icons-material";
import { Avatar, Button, Menu } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import timeSince from "../utilities/Functions/convert";
import pic from "../uploads/Screenshot from 2023-05-22 19-36-44.png";
import bars from "../pages/bars.png";

function Profile() {
  const navigation = useNavigate();
  const logout = () => {
    localStorage.removeItem("blog_auth_token");
  };

  const [details, setDetails] = useState({});
  const [update, setUpdate] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [showBlog, setShowBlogs] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const token = localStorage.getItem("blog_auth_token");

  const authenticate = (token) => {
    axios
      .post("http://localhost:8000/token_authenticate", { token: token })
      .then((res) => {
        if (res.data.authenticated) {
          setDetails(res.data.user);
          getBlogs(res.data.user.id);
        } else {
          navigation("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBlogs = (userId) => {
    axios
      .get(`http://localhost:8000/blogs/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log("there is an err");
      });
  };

  useEffect(() => {
    authenticate(token);
  }, [update]);
  return (
    <div className=" bg-slate-100">
      <div className="w-full lg:w-full md:w-full bg-slate-200 flex justify-between py-3 px-2">
        <h2 className="text-2xl font-sans font-bold">Geddit</h2>
        <img
          src={bars}
          className="w-20 h-12 block md:hidden lg:hidden"
          alt=""
          onClick={() => {
            document.getElementById("sidebar").classList.toggle("hidden");
          }}
        />
      </div>

      <div className="w-full h-screen  flex">
        <div
          className="w-2/5 hidden lg:w-1/5 md:w-1/5 px-5 py-5  md:block lg:block bg-slate-800 text-white h-screen"
          id="sidebar">
          <h2 className="text-xl font-bold py-5">Profile</h2>
          <ul className="space-y-6 font-semibold  text-l my-3 py-3">
            <li>
              <House /> <Link to={"/"}>Home</Link>
            </li>
            <li
              role="button"
              onClick={() => {
                setShowProfile(true);
                setShowBlogs(false);
              }}>
              <Person /> Account
            </li>
            <li>
              <Message /> Contact
            </li>
            <li
              role="button"
              onClick={() => {
                setShowProfile(!true);
                setShowBlogs(!false);
              }}>
              <Newspaper /> My Blogs
            </li>
            <li
              className="bottom-2 fixed"
              role="button"
              onClick={() => {
                logout();
              }}>
              <Logout /> Logout
            </li>
          </ul>
        </div>
        <div className="w-full md:w-full lg:w-4/5  px-5 py-5 bg-white-300 h-screen">
          {showProfile && (
            <div className="p-5 m-4 space-y-6">
              <h2 className="text-2xl">User Profile</h2>
              <Avatar sizes="2xl" />
              <h4>Change your profile pic</h4>
              <div className="flex flex-col md:flex-row lg:flex-row lg:space-x-16 font-sans ">
                <div>
                  <h2>First Name</h2>
                  <input
                    type="text"
                    className="p-2 border-2  w-full rounded-md"
                    id=""
                  />
                </div>
                <div>
                  <h2>Last Name</h2>
                  <input
                    type="text"
                    className="p-2 border-2 rounded-md text-xl "
                    id=""
                    value={details.name}
                  />
                </div>
              </div>
              <div>
                <h2>Email</h2>
                <input
                  type="text"
                  className="p-2 border-2 w-full rounded-md text-xl"
                  id=""
                  value={details.email}
                />
              </div>
              <div>
                <h2>Address</h2>
                <input
                  type="text"
                  className="p-2 border-2 w-full  text-xl rounded-md"
                  id=""
                  value={details.address}
                />
              </div>
              <div>
                <button className="w-full p-2 text-xl text-white font-bold bg-green-600">
                  update
                </button>
              </div>
            </div>
          )}

          {showBlog && (
            <div className="p-5 m-4  mb-20 w-3/4 space-y-2">
              <h2 className="text-xl text-blue-400 font-semibold">
                {" "}
                Your Blogs
              </h2>
              <div className=" p-3   mt-12 my-5  h-screen overflow-auto ">
                {blogs.map((news, key = news.id) => {
                  console.log("displaying the blogs");
                  // const likes = news.likes.length;
                  const date = timeSince(news.createdAt);
                  const url_img = `http://localhost:8000/${pic}`;
                  console.log(url_img, pic);

                  return (
                    <div className=" border-2 sm:my-10 my-3  p-10    bg-slate-100  ">
                      <div
                        className="   flex  flex-col md:flex-row lg:flex-row  space-x-7 "
                        // onClick={() => {
                        //   navigation("/Comments", {
                        //     state: { news_id: news.id },
                        //   });
                        // }}
                      >
                        <div className="w-full basis-1/4">
                          <img
                            // src={`/harry/Developer/Projects/News/uploads/${news.image}`}
                            src={pic}
                            alt="no image"
                            className="bg-cover h-44 w-full"
                          />
                        </div>
                        <h2 className="text-sm md:text-l lg:text-l first-letter:uppercase mt-3 mx-2  basis-1/4 font-semibold font-serif">
                          {news.title}
                        </h2>
                        <h2 className="text-sm md:text-l lg:text-l first-letter:uppercase mt-3 mx-2 overflow-auto basis-1/4  font-serif">
                          {news.content}
                        </h2>

                        <div className=" basis-1/4">
                          <Delete
                            fontSize="large"
                            onClick={() => {
                              //alert(news.id);
                              axios
                                .get(
                                  `http://localhost:8000/blog/delete/${news.id}`
                                )
                                .catch((err) => alert(err))
                                .then((res) => {
                                  if (res.data.deleted) {
                                    setUpdate(!update);
                                  }
                                });
                            }}></Delete>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
