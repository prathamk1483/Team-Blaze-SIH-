import React, { useState,useEffect } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.gif";
import search from "../assets/search.gif";
import logout from "../assets/logout2.png";
import create from "../assets/create.png";
import profile from "../assets/profiletab.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AskDoubt = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('doubtify - user'))
    {
      toast.error("Please Login First", toastOptions);
      setTimeout(() =>
      {
        navigate("/login")
      },2000)
      }
  }, [])


  const formData = {
    title: "",
    description: "",
    category: "",
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [data, setData] = useState(formData);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidations = () => {
    const { title, description, category } = data;

    if (title === "") {
      toast.error("Title is required", toastOptions);
      return false;
    } else if (description === "") {
      toast.error("Description is required", toastOptions);
      return false;
    } else if (category === "") {
      toast.error("Category is required", toastOptions);
      return false;
    }

    return true;
  };

  const postData = async () => {
    if (handleValidations()) {
      const { title, description, category } = data;

      try {
        const response = await fetch("http://localhost:5000/api/doubts/doubt", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: "65d124ccec98bb41c59e98cb",
            title: data.title,
            description: data.description,
            category: data.category
          })
        });

        if (!response.ok) {
          toast.error("User with this Username already exist", toastOptions);
        }

        else {
          const responseData = await response.json();
          console.log(responseData);
          setData({
            title: "",
            description: "",
            category: "",
          })
          navigate("/profile")
          toast.success(responseData, toastOptions);
        }

        // Redirect the user to another page or show a success message
      } catch (error) {
        console.error("Signup failed:", error.message);
        toast.error("Posting The Doubt Failed", toastOptions);
      }
    }
  };

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
              navigate("/doubt_asker");
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
      <div className="w-4/5 h-full bg-[#f9fcff] bg-gradient1 flex flex-col gap-2 items-center">
        <h1 className="text-center text-3xl font-semibold mt-8">
          You can write your doubt/problem here{" "}
        </h1>
        <div className="w-3/4 h-3/4 bg-transparent shadow-xl flex flex-col justify-center items-center gap-8">
          <div className="w-5/6 h-[1px] bg-black" />
          <input
            type="text"
            placeholder="Enter your problem title"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="w-5/6 p-4 rounded-md shadow-lg outline-none border-none"
          />
          <div className="w-5/6 h-[1px] bg-black" />
          <textarea
            className="w-5/6 p-4 h-[100px] rounded-md shadow-lg outline-none border-none"
            type="text"
            placeholder="Enter your problem description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          <div className="w-5/6 h-[1px] bg-black" />
          <input
            type="text"
            placeholder="Enter your problem category"
            name="category"
            value={data.category}
            onChange={handleChange}
            className="w-5/6 p-4 rounded-md shadow-lg outline-none border-none"
          />
          <button
            className="w-1/6 bg-[#27f7357a] p-4 rounded-md shadow-lg outline-none border-none"
            onClick={() => postData()}
          >
            Post Doubt
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AskDoubt;
