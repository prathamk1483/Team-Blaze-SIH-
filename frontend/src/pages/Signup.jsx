import React, { useState } from "react";
import "./Login.css"
import LoginLogo from "../assets/Login.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    name:"",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  let randomFourDigitNumber;
  const [otpOpt, setOtpOpt] = useState(false);
  const [otpVal, setOtpVal] = useState("");
  const [otpVerify, setOtpVerify] = useState(false);
  const [isStudent, setIsStudent] = useState(true);
  const [url, setUrl] = useState("http://localhost:5000/api/doubt_asker/signup");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const sendOtp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(data.email)) {
      randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
      console.log("OTP sent");
      toast.success("OTP sent successfully to given mail ", toastOptions);
      setOtpOpt(true);
    } else {
      setOtpOpt(false);
      toast.error("Enter valid email", toastOptions)
    }
  };

  const handleOtpSubmit = (e) => {
    if (otpVal.length === 4) {
      const enteredOtp = parseInt(otpVal);
      if (enteredOtp === 1111) {
        setOtpVerify(true);
        toast.success("OTP Verified ", toastOptions);
      } else {
        setOtpVerify(false);
        console.log("Hii");
        toast.error("OTP doesn't match!", toastOptions);
      }
    } else {
      setOtpVerify(false);
      toast.error("OTP doesn't match!", toastOptions);
    }
  };

  const handleValidations = () => {
    const {name, username, email, password, confirmPassword } = data;

    if (password != confirmPassword) {
      toast.error("Password & confirm password must be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    }else if (name.length < 3) {
      toast.error("Name should be greater than 5 characters", toastOptions);
      return false;
    }
    else if (password.length < 8) {
      toast.error("Password length should be greater than 8", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (!otpVerify) {
      toast.error("OTP verification is required", toastOptions);
      return false;
    }

    return true;
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
            name:data.name,
            username: data.username,
            email: data.email,
            password: data.password
          })
        });

        if (!response.ok) {
          toast.error("User with this Username already exist", toastOptions);
        }

        else {
          const responseData = await response.json();
          console.log(responseData);
          localStorage.setItem('doubtify-user',data)
          setData({
            name:"",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
          })
          setOtpVal("")
          navigate("/login")
          toast.success(responseData, toastOptions);
        }

        // Redirect the user to another page or show a success message
      } catch (error) {
        console.error("Signup failed:", error.message);
        toast.error("Signup Failed", toastOptions);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-3/4 h-3/4  rounded-xl shadow-xl flex ">
        <img src={LoginLogo} alt=".." className="h-4/5" />
        <div className=" h-full w-full flex flex-col justify-between items-center">

          <div className="w-full flex justify-center ">
            <button
              className={`button-48 ${isStudent ? "bg-[#27f7357a]" : ""}`}
              role="button"
              onClick={() => {
                setIsStudent(true);
                setUrl("http://localhost:5000/api/doubt_asker/signup")
              }}
            >
              <span className="text">Student</span>
            </button>

            <button
              className={`button-48-2 ${!isStudent ? "bg-[#27f7357a]" : ""}`}
              role="button"
              onClick={() => {
                setIsStudent(false);
                setUrl("http://localhost:5000/api/doubt_solver/signup")
              }}
            >
              <span className="text">Mentor</span>
            </button>
          </div>

          <div className="w-full flex justify-center">
            <form className="flex flex-col justify-center items-center gap-8" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={handleChange}
                className="p-2 rounded-lg text-[#000000] outline-none pl-4 w-[300px] shadow1"
              />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={data.username}
                onChange={handleChange}
                className="p-2 rounded-lg text-[#000000] outline-none pl-4 w-[300px] shadow1"
              />

              <div className="pl-28 flex justify-center gap-8">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your Email"
                  className="p-2 rounded-lg text-[#000000] outline-none pl-4 w-[300px] shadow1"
                />
                <div className="button-8" role="button" onClick={sendOtp}>
                  Send OTP
                </div>
              </div>


              {otpOpt ? (
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="text"
                    name="otp"
                    value={otpVal}
                    placeholder="OTP"
                    onChange={(e) => {
                      setOtpVal(e.target.value);
                    }}
                    className="p-2 rounded-lg text-[#000000] outline-none pl-4 w-[200px] shadow1"
                  />
                  <div
                    className="bg-[#27ae60] text-white text-xs cursor-pointer rounded-lg p-2 font-semibold"
                    onClick={(e) => handleOtpSubmit(e)}
                  >
                    Verify OTP
                  </div>
                </div>
              ) : null}
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={data.password}
                onChange={handleChange}
                className="p-2 rounded-lg text-[#000000] outline-none pl-4 w-[300px] shadow1"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your Password"
                value={data.confirmPassword}
                onChange={handleChange}
                className="p-2 rounded-lg text-[#000000] outline-none pl-4 w-[300px] shadow1"
              />
              <button className="button-55" type="submit"> Signup </button>
            </form>
          </div>

          <div className="m-5"> Already have an account ?{" "} <Link to="/login"> <span className="text-[#27ae60]">Login Here</span></Link> </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
