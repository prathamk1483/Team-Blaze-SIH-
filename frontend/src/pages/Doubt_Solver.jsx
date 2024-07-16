import React, { useState,useEffect } from "react";
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
import EditInfo from "./EditInfo";

import profilepic from "../assets/profilepic.webp";
function Doubt_Solver() {
  const [isAbout, setIsAbout] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('doubtify - user'))
    {
      setTimeout(() =>
      {
        navigate("/login")
      },2000)
      }
  }, [])

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
              navigate("/askDoubt");
            }}
          >
            <img src={create} alt="" className="w-[35px] " />
            Ask Doubt
          </div>
          <div
            className="flex items-center px-8 gap-4 cursor-pointer"
            onClick={() => {
              navigate("/doubt_solver");
            }}
          >
            <img src={profile} alt="" className="w-[35px] " />
            Profile
          </div>
        </div>
        <div className="flex items-center px-8 gap-4 pb-8 cursor-pointer" onClick={handleLogout}>
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
              <button
                className="bg-gray-300 py-1 px-3 rounded-lg"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
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

        <div className="w-full flex justify-between mb-8 ">
          <div className="w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center">
            <img src={mail} alt="Mail" className="w-[35px] h-[35px]" />
          </div>
          <div className="w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center">
            <img src={linkedin} alt="linkedin" className="w-[35px] h-[35px]" />
          </div>
          <div className="w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center">
            <img src={wp} alt="whatsapp" className="w-[35px] h-[35px]" />
          </div>
          <div className="w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center">
            <img src={call} alt="Contact" className="w-[35px] h-[35px]" />
          </div>
          <div className="w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center">
            <img src={insta} alt="Instagram" className="w-[35px] h-[35px]" />
          </div>
        </div>

        {!isEdit ? (
          <div className="w-full h-full">
            <div className="w-full flex justify-evenly ">
              <span
                className={`border-2 w-full p-2 cursor-pointer font-bold text-center ${
                  isAbout ? "bg-gray-200 border-2 border-[#FF0063]" : ""
                }`}
                onClick={() => setIsAbout(true)}
              >
                {" "}
                About
              </span>
              <span
                className={`border-2 w-full p-2 cursor-pointer font-bold text-center ${
                  !isAbout ? "bg-gray-200 border-2 border-[#FF0063]" : ""
                }`}
                onClick={() => {
                  setIsAbout(false);
                }}
              >
                Doubts Solved
              </span>
            </div>
            <div className="w-full h-[1px] bg-black" />

            <div className="overflow-y-scroll w-full">
              {isAbout ? (
                <div className="border-2 py-4 px-8">
                  <div>
                    <h2 className="font-bold mb-2 text-xl text-[#FF0063]">
                      About Me :{" "}
                    </h2>
                    <p className="mb-4 text-md font-semibold">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Eaque blanditiis nulla sed laboriosam dolore voluptatum
                      tempora, incidunt necessitatibus culpa! Dolorum, numquam
                      error iusto repellendus nemo enim, quibusdam omnis, labore
                      esse vitae blanditiis cum. Fuga quia nobis labore earum.
                      Amet est numquam quia reprehenderit recusandae. Esse quam,
                      velit aspernatur officiis sapiente tempore dolorem! Ipsam
                      provident incidunt quas, maiores ut sunt aperiam
                      repudiandae odit temporibus dolores iste autem quod eius
                      dolorum deleniti nulla voluptatem molestias perferendis
                      assumenda excepturi itaque alias ipsum veniam. Atque
                      aspernatur veritatis esse praesentium quisquam illo
                      impedit dolorem! Tempore ipsum molestias ex quisquam
                      blanditiis, eos quod. Debitis, ex modi?
                    </p>
                  </div>

                  <div>
                    <h2 className="font-bold mb-2 text-xl text-[#FF0063]">
                      Expertise In :{" "}
                    </h2>
                    <p className="font-semibold">App Development</p>
                    <p className="font-semibold">Web Development</p>
                    <p className="font-semibold">Machine Learning</p>
                    <p className="font-semibold">Generative AI</p>
                    <p className="font-semibold">Backend Development</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-4 border-2">
                  <div className="w-[400px] h-[50px] bg-red-500" />
                  <div className="w-[400px] h-[50px] bg-red-500" />
                  <div className="w-[400px] h-[50px] bg-red-500" />
                  <div className="w-[400px] h-[50px] bg-red-500" />
                  <div className="w-[400px] h-[50px] bg-red-500" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <EditInfo />
        )}
      </div>
    </div>
  );
}

export default Doubt_Solver;
