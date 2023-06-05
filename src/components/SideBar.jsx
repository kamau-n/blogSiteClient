import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LoginIcon from "@mui/icons-material/Login";
import { Add, Create } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SideBar({ all, setAll }) {
  return (
    <div className="w-1/5 h-screen bg-blue-300 mt-2 ">
      <h2>Select Topic</h2>
      <div
        onClick={() => {
          setAll(!all);
        }}
        className="px-5 w-full text-left font-bold text-2xl  py-6 bg-white"></div>
      <div
        onClick={() => {
          setAll(!all);
        }}
        className="px-5 w-full text-left font-bold text-2xl  py-6 bg-white">
        POLITICS
      </div>
      <div
        onClick={() => {
          setAll(!all);
        }}
        className="px-5 w-full text-left font-bold text-2xl  py-6 bg-white">
        ENTERTAINMENT
      </div>
      <div
        onClick={() => {
          setAll(!all);
        }}
        className="px-5 w-full text-left font-bold text-2xl  py-6 bg-white">
        SPORTS
      </div>
      <div
        onClick={() => {
          setAll(!all);
        }}
        className="px-5 w-full text-left font-bold text-2xl  py-6 bg-white">
        BUSINESS
      </div>
    </div>
  );
}
