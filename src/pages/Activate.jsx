import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Activate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [response, setResponse] = useState("");

  const [activationCode, setActivationCode] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/activator", {
        user_code: activationCode,
        verification_code: state.verification_code,
        user_email: state.user_email,
      })
      .then((res) => {
        if (res.data.activated) {
          navigate("/login");
        } else {
          setResponse(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // TODO: Handle activation code submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl py-4 px-5 font-bold text-center mb-4">
          Account Activation
        </h2>
        <h2 className="text-2xl text-red-500 text-center">{response}</h2>
        <div>
          <label className="block my-4 text-center   text-xl">
            Activation Code
            <input
              type="text"
              value={activationCode}
              onChange={(e) => {
                setResponse("");
                setActivationCode(e.target.value);
              }}
              className="my-4 mx-3 p-4 border-2 block w-full rounded text-xl text-center border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your activation code"
            />
          </label>
          <button
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 w-full mx-3  text-xl text-center text-white font-semibold py-4 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Activate Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activate;
