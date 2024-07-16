import React, { useEffect } from "react";
import doubtify from "../assets/doubtify.png";
import homepng from "../assets/homepng.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import searchPng from '../assets/search.gif'
import './home.css'


const Home = () => {

  return (
    <div className="w-full h-screen">
      {/* Navbar  */}
      <div className="p-4 bg-white shadow-lg flex justify-between px-20 items-center">
        <div className="w-1/4">
          <NavLink to="/">
            <img src={doubtify} alt="Logo" className="w-20 " />
          </NavLink>
        </div>
        <div className="flex gap-8 text-xl font-semibold">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "text-red-400" : ""
            }
          >
            <span>Home</span>
          </NavLink>

          <NavLink to="/askDoubt">
            <span>Ask Doubt</span>
          </NavLink>

          <NavLink to="/profile">
            <span>Profile</span>
          </NavLink>
        </div>

        <div className="text-lg bg-[#27f735bb] p-4 font-semibold">
          <NavLink to="/login" >
            Login/Signup
          </NavLink>
        </div>
      </div>

      <div className="w-full px-12 mt-2 shadow-lg flex flex-col items-center h-full">
        <div className="w-full flex justify-center ">
          <img src={homepng} alt=".." className="w-80 h-60 " />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold leading-loose ">
            Get All your <span className="text-[#5a4bda]">Doubts cleared</span>
          </h1>
          <h2 className="text-xl font-semibold ">
            Friendly Mentors are here to guide you{" "}
          </h2>
        </div>

        <div className="w-2/4 flex outline-none border-none rounded-md shadow-lg p-2 ">
          <input type="text" className="w-full h-12 outline-none border-none rounded-md text-lg p-2" placeholder="Search Here for Previous Doubts" />
          <img src={searchPng} alt="search" className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

export default Home;
