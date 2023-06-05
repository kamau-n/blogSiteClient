import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  axios.defaults.withCredentials = true;
  const [inputs, setInputs] = useState({});

  const [res_mess, setRes] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setRes("");
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!"userEmail" || !"password") {
      setRes("Some values are empty");
    } else {
      axios
        .post("http://localhost:8000/login", {
          email: inputs.email,
          password: inputs.password,
        })
        .then((data) => {
          console.log(data.data);
          if (data.data.login) {
            localStorage.setItem("blog_auth_token", data.data.token);
            navigate("/blogs");
          } else {
            setRes(data.data.msg);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="w-4/4 px-10 py-1 mx-auto h-screen bg-slate-300 ">
      {/* <div>
        <h2 className="uppercase font-bold py-10 font-mono text-2xl">
          Digital Produce Report Card
        </h2>
      </div> */}

      <div className="  sm:w-1/4  w-full mx-auto flex items-center justify-center my-20">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-center text-2xl uppercase my-4">Geddit</h2>
          <h2 className="text-xl text-center  font-bold mb-4"> Login</h2>
          <h4 className="text-center  text-xl  py-2 my-4 text-red-500 font-bold">
            {res_mess}
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <input
                type="text"
                name="email"
                value={inputs.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 text-center font-mono text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-8">
              <input
                id="password"
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
                placeholder="password"
                className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded">
              Sign In
            </button>
            <div className="sm:flex gap-3 mx-7 flex flex-col items-center text-l font-semibold justify-center p-3">
              <Link to={"/register"}>Create account</Link>
              <Link to={"/"}>Forgot password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
