import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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

    axios
      .post("http://localhost:8000/user", {
        username: inputs.name,
        email: inputs.email,
        address: inputs.address,
        password: inputs.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.created) {
          axios
            .post("http://localhost:8000/mailer", {
              user_email: inputs.email,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.verfication_sent) {
                navigate("/activate", {
                  state: {
                    verification_code: res.data.verification_code,
                    user_email: inputs.email,
                  },
                });
              } else {
                console.log("there is an error");
                setRes(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setRes(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-4/4 px-10 py-1 mx-auto h-screen bg-slate-300 ">
      {/* <div>
      <h2 className="uppercase font-bold py-10 font-mono text-2xl">
        Digital Produce Report Card
      </h2>
    </div> */}

      <div className="  sm:w-1/3 w-full mx-auto flex  items-center  justify-center p-5 my-20">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-xl text-center  uppercase font-sans font-bold mb-4">
            {" "}
            Register
          </h2>
          <h4 className="text-center  text-xl  py-2 my-4 text-red-500 font-bold">
            {res_mess}
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <input
                type="text"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border border-gray-300 text-center font-mono text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
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
                type="text"
                name="address"
                value={inputs.address || ""}
                onChange={handleChange}
                placeholder="Address"
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
              Sign Up
            </button>
            <div className="flex gap-3 mx-7 justify-center p-3">
              <Link to={"/login"}>Already have account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
