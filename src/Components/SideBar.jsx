import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

export default function SideBar() {
  return (
    <div className="w-1/5 h-96 p-2">
      <h3 className="font-serif text-gray-600 text-xl m-4">Availalbe Topics</h3>
      <div className="p-5 my-3 ">
        <HowToVoteIcon fontSize="large" style={{ color: "blue" }} />
        <span className="p-2 text-blue-700">Politics</span>
      </div>
      <div className="p3 my-3 ">
        <AttachMoneyIcon fontSize="large" style={{ color: "blue" }} /> Business
      </div>
      <div className="p-3 my-3 ">
        <SportsFootballIcon fontSize="large" style={{ color: "blue" }} />
        Sports
      </div>
      <div className="p-3 my-3 ">
        <NightlifeIcon fontSize="large" style={{ color: "blue" }} />
        Entertainment
      </div>
      <div className="p-3 my-3 ">
        <AttachMoneyIcon fontSize="large" style={{ color: "blue" }} />
        Business
      </div>
    </div>
  );
}
