import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  axios.defaults.withCredentials = true;
  const [userEmail, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userEmail || !password) {
      alert("some values are empty");
    } else {
      axios
        .post("http://localhost:8000/login", {
          email: userEmail,
          password: password,
        })
        .then((data) => {
          console.log(data.data);
          if (data.data.login) {
            navigate("/blogs");
          } else {
            navigate("/login");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="bg-green-700 p-5">
      <div className="mx-auto p-10 w-1/4 bg-white my-10 ">
        <form onSubmit={handleSubmit}>
          <div className="text-center   m-10">
            <input
              className="p-3 text-center border-1 bg-slate-200 border-black "
              type="text"
              value={userEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email address"
            />
          </div>
          <div className="text-center  m-10 ">
            <input
              type="text"
              className="p-3 text-center border-1 border-black bg-slate-200"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
            />
          </div>

          <div className="text-center  m-10">
            <button className="border-1 px-10 py-3 w-full text-xl border-blue-300 bg-green-500 ">
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/register">Create and account</Link>
        </div>
      </div>
    </div>
  );
}
