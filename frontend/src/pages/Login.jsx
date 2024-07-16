import React, { useEffect, useState } from "react";
import "./Login.css";
import LoginLogo from "../assets/Login.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

  useEffect(() => {
    if (localStorage.getItem('doubtify-user'))
    {
      if(isStudent)
          {
            navigate("/doubt_asker");
            }
          else
          {
            navigate("/doubt_solver");
            }
    }
  
    
  }, [])
  

  const navigate = useNavigate()

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [isStudent, setIsStudent] = useState(true);
  const [url, setUrl] = useState("http://localhost:5000/api/doubt_asker/login");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidations()) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password
          })
        });

        if (!response.ok) {
          toast.error("Please try to login with correct credentials", toastOptions);
        }

        else {
          const responseData = await response.json();
          console.log(responseData);
          localStorage.setItem('doubtify-user',data)
          toast.success(responseData, toastOptions);
          setData({
            username: "",
            password: "",
          })
          if(isStudent)
          {
            navigate("/doubt_asker");
            }
          else
          {
            navigate("/doubt_solver");
            }
        }

        // Redirect the user to another page or show a success message
      } catch (error) {
        console.error("Signup failed:", error.message);
        toast.error("Login Failed", toastOptions);
      }
    }
  };

  const handleValidations = () => {
    const { username, password } = data;
    if (username.length === "") {
      toast.error("Username is required...", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Passowrd is required...", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-3/4 h-3/4  rounded-xl shadow-xl flex ">
        <img src={LoginLogo} alt=".." className="h-4/5" />
        <div className=" h-full w-full flex flex-col justify-evenly items-center">
          <div className="w-full flex justify-center ">
            <button
              className={`button-48 ${isStudent ? "bg-[#27f7357a]" : ""}`}
              role="button"
              onClick={() => {
                setIsStudent(true);
                setUrl("http://localhost:5000/api/doubt_asker/login")
              }}
            >
              <span className="text">Student</span>
            </button>

            <button
              className={`button-48-2 ${!isStudent ? "bg-[#27f7357a]" : ""}`}
              role="button"
              onClick={() => {
                setIsStudent(false);
                setUrl("http://localhost:5000/api/doubt_solver/login")
              }}
            >
              <span className="text">Mentor</span>
            </button>
          </div>

          <div className="w-full flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={data.username}
                onChange={handleChange}
                className="p-3 rounded-lg text-[#000000] outline-none pl-4 w-[300px] shadow1"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={data.password}
                onChange={handleChange}
                className="p-3 rounded-lg text-[#000000] outline-none pl-4 w-[300px] shadow1"
              />
              <button class="button-55" type="submit" >Login</button>
            </form>
          </div>

          <div>
            Don't have an account ?{" "}
            <Link to="/signup">
              <span className="text-[#27ae60]">Create One</span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
