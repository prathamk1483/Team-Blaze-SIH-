import React, { useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.gif";
import search from "../assets/search.gif";
import logout from "../assets/logout2.png";
import create from "../assets/create.png";
import profile from "../assets/profiletab.png";
import mail from "../assets/email.png";
import linkedin from "../assets/linkedin.png";
import wp from "../assets/whatsapp.png";
import call from "../assets/call.png";
import insta from "../assets/insta.png";

import profilepic from "../assets/profilepic.webp";
function Doubt_Asker() {
  const navigate = useNavigate();
  const [isAbout, setIsAbout] = useState(true);

  const handleLogout = () =>
  {
    if (localStorage.getItem('doubtify-user'))
    {
      localStorage.removeItem('doubtify-user')
      navigate("/login")
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/5 h-full flex flex-col justify-between border-2 border-r-gray-500">
        <div className="w-full flex flex-col justify-start gap-6 pt-20">
          <div
            className="flex items-center px-8 gap-4 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={home} alt="" className="w-[35px] " />
            Home
          </div>
          <div
            className="flex items-center px-8 gap-4 cursor-pointer"
            onClick={() => {
              navigate("/search");
            }}
          >
            <img src={search} alt="" className="w-[35px] " />
            Search
          </div>
          <div
            className="flex items-center px-8 gap-4 cursor-pointer"
            onClick={() => {
              navigate("/ask-doubt");
            }}
          >
            <img src={create} alt="" className="w-[35px] " />
            Ask Doubt
          </div>
          <div
            className="flex items-center px-8 gap-4 cursor-pointer"
            onClick={() => {
              navigate("/doubt_asker");
            }}
          >
            <img src={profile} alt="" className="w-[35px] " />
            Profile
          </div>
        </div>
        <div className="flex items-center px-8 gap-4 pb-8 cursor-pointer"  onClick={handleLogout}>
          <img src={logout} alt="" className="w-[35px] " />
          Logout
        </div>
      </div>

      <div className="w-4/5 h-full  px-48 pt-4 flex flex-col items-center ">
        <div className="flex items-center gap-20 mb-8">
          <img src={profilepic} alt=".." className="w-44 h-44 rounded-full" />
          <div className="w-full h-full flex flex-col justify-evenly  pt-2">
            <div className="w-full flex gap-8 items-center mb-4">
              <h1 className="font-bold text-lg ">Username</h1>
              <button className="bg-gray-300 py-1 px-3 rounded-lg">
                Edit Profile
              </button>
            </div>
            <h2 className="w-full mb-4 text-xl font-semibold ">
              768 Doubts Solved || 1486 points
            </h2>

            <div className="w-full">
              <h3 className="font-bold">Name Surname</h3>
              <p className="font-semibold text-gray-900">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
                natus, sequi dolorem fugiat quis iusto cum consequuntur ipsam
                deleniti magni molestiae ex earum eos rem mollitia, voluptates
                in molestias libero?
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-evenly ">
          <span
            className={`border-2 w-full p-2 cursor-pointer font-bold text-center ${
              !isAbout ? " border-2 border-" : ""
            }`}
            onClick={() => {
              setIsAbout(false);
            }}
          >
            Doubts Asked
          </span>
        </div>
        <div className="w-full h-[1px] bg-black" />

        <div className="overflow-y-scroll w-full">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-[400px] h-[50px] bg-red-500" />
            <div className="w-[400px] h-[50px] bg-red-500" />
            <div className="w-[400px] h-[50px] bg-red-500" />
            <div className="w-[400px] h-[50px] bg-red-500" />
            <div className="w-[400px] h-[50px] bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doubt_Asker;
