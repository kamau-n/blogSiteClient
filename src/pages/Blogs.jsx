import React, { useEffect, useState } from "react";
import axios from "axios";

//import {} from "react-icons";
import logo from "../utilities/images.png";
import jwtDecode from "jwt-decode";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  Add,
  AllInbox,
  Create,
  Email,
  FacebookSharp,
  FavoriteBorderSharp,
  FirstPageRounded,
} from "@mui/icons-material";
import { PeopleRounded, Person2Rounded } from "@mui/icons-material";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import NightlifeIcon from "@mui/icons-material/Nightlife";

import Blog from "../components/Blog";

import person from "./person.jpeg";
import bars from "./bars.png";
import { Link, useNavigate } from "react-router-dom";

import Top from "../components/Top";

import Bottom from "../components/Bottom";
import News from "../components/News";
import Footer from "../components/Footer";

export default function Blogs(route) {
  const [topic, setTopic] = useState("");

  const [logged, setLogged] = useState(false);
  const [details, setDetails] = useState({});
  const [all, setAll] = useState(true);
  const [sports, setSports] = useState(false);

  const token = localStorage.getItem("blog_auth_token");
  const authenticate = (token) => {
    axios
      .post("http://localhost:8000/token_authenticate", { token: token })
      .then((res) => {
        if (res.data.authenticated) {
          setLogged(true);
          setDetails(res.data.user);
          // console.log(res.data.user);
        } else {
          setLogged(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    authenticate(token);
  }, []);

  const navigate = useNavigate();

  return (
    <div className=" mt-1 bg-gray-200">
      <div className="w-full bg-white flex   mx-auto p-3 fixed  top-0 justify-between ">
        <div className=" px-5 gap-2 flex">
          <img
            src={logo}
            alt="no image"
            color="red"
            className="sm:w-8  w-6 sm:block hidden h-8 sm:h-10"
          />
          <img
            onClick={() => {
              document.getElementById("sidebar").classList.toggle("hidden");
            }}
            src={bars}
            alt="no image"
            color="red"
            className="sm:w-8 w-13 my-2 sm:hidden h-10  sm:h-10"
          />
          <h2 className="sm:text-2xl text-xl hidden sm:block font-bold py-2 text-black">
            GEDDIT{" "}
          </h2>
        </div>
        <div className="justify-between m-2 p-2">
          {logged ? (
            <div>
              <Link to="/register" className=" text-sm md:text-xl mx-2">
                {/* <Person2Rounded fontSize="large" /> {details.email} */}
              </Link>
              <Link
                to="/add"
                className=" md:text-l text-xs lg:text-l py-3 px-2 font-bold font-mono bg-orange-600 rounded uppercase text-white  mx-2">
                <Add />
                Create A Blog
              </Link>
              <Link
                to="/profile"
                className=" md:text-l lg:text-l text-xs py-3 px-2 font-mono font-bold bg-orange-600 rounded uppercase text-white  mx-2">
                <Person2Rounded /> Account
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login" className=" sm:text-xl text-sm mx-2">
                Login <LoginIcon />
              </Link>
              <Link to="/register" className=" sm:text-xl test-sm mx-2">
                Register <HowToRegIcon />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row">
        {/* <div
          className="sm:w-1/6 sm:block hidden h-screen bg-gray-300 mt-20 "
          id="sidebar">
          <h2 className="sm:text-xl text-sm font-extrabold p-4 uppercase text-blue-300 m-4">
            Select Topic
          </h2>
          <div
            onClick={() => {
              setAll(!all);
              setSports(false);
            }}
            className="px-5 w-full text-left font-bold sm:text-l text-sm hover:bg-blue-300 hover:text-white py-5 bg-white">
            <BorderAllIcon /> ALL BLOGS
          </div>
          <div
            onClick={() => {
              setSports(!sports);
              setAll(false);
              setTopic("Politics");
            }}
            className="px-5 w-full text-left font-bold sm:text-l text-sm hover:bg-blue-300 hover:text-white py-5 bg-white">
            <HowToVoteIcon /> POLITICS
          </div>
          <div
            onClick={() => {
              setSports(!sports);
              setAll(false);
              setTopic("Entertainment");
            }}
            className="px-4 w-full text-left font-bold sm:text-l text-sm  hover:bg-blue-300 hover:text-white py-5 bg-white">
            <NightlifeIcon /> ENTERTAINMENT
          </div>
          <div
            onClick={() => {
              setSports(!sports);
              setAll(false);
              setTopic("Sports");
            }}
            className="px-5 w-full text-left font-bold sm:text-l text-sm hover:bg-blue-300 hover:text-white py-5 bg-white">
            <SportsFootballIcon /> SPORTS
          </div>
          <div
            onClick={() => {
              setSports(!sports);
              setAll(false);
              setTopic("Business");
            }}
            className="px-5 w-full text-left font-bold sm:text-l text-sm hover:bg-blue-300 hover:text-white py-5 bg-white">
            <CurrencyExchangeIcon /> BUSINESS
          </div>
          <div
            onClick={() => {
              setSports(!sports);
              setAll(false);
              setTopic("Fashion");
            }}
            className="px-5 w-full text-left font-bold sm:text-l text-sm hover:bg-blue-300 hover:text-white py-5 bg-white">
            <CheckroomIcon /> FASHION
          </div>
          <div
            onClick={() => {
              setSports(!sports);
              setAll(false);
              setTopic("Gaming");
            }}
            className="px-5 w-full text-left font-bold sm:text-l text-sm hover:bg-blue-300 hover:text-white py-5 bg-white">
            <SportsEsportsIcon /> GAMING
          </div>
          <div
            onClick={() => {
              setSports(!sports);
              setAll(false);
              setTopic("Others");
            }}
            className="px-5 w-full text-left font-bold sm:text-l text-sm hover:bg-blue-300 hover:text-white py-5 bg-white">
            <AllInbox /> OTHERS
          </div>
          <div className="px-5 py-4 flex  flex-col gap-7">
            <h3 className="font-bold uppercase"> PAGES</h3>
            <div className="flex gap-2">
              <Person2Rounded />
              <h3 className="font-bold sm:text-l text-sm uppercase">
                {" "}
                Profile{" "}
              </h3>
            </div>
            <div className="flex gap-2">
              <Email />
              <h3 className="font-bold sm:text-l text-smuppercase">
                {" "}
                Contact us{" "}
              </h3>
            </div>
          </div>
        </div> */}
        <div className="  sm:mx-5 my-5  w-full">
          <Blog />
        </div>
        {/* <div className="sm:w-2/6 hidden h-screen bg-slate-200 mt-20">
          <h1 className="font-serif text-black text-2xl bg-red-5000 m-4">
            Trending
          </h1>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
