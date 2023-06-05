import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import logo from "../utilities/images.png";
function Create() {
  const [logged, setLogged] = useState(true);
  const [inputs, setInputs] = useState({});
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState("");
  const handleChange = (event) => {
    setSuccess("");
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const [details, setDetails] = useState({});
  const url = "http://localhost:8000/blogs";
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(image.name);

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("title", inputs.title);
    formdata.append("content", inputs.content);

    formdata.append("userId", details.id);
    formdata.append("topic", inputs.topic);
    formdata.append("image", image.name);

    axios
      .post(url, formdata, config)
      // .post(url, {
      //   title: inputs.title,
      //   content: inputs.content,
      //   topic: inputs.topic,
      //   userId: details.id,
      //   image: image,
      // })
      .then((results) => {
        //  console.log(results.data);
        if (results.data.created) {
          setSuccess(results.data.message);
        } else {
          setSuccess(results.data.message);
        }
      })
      .catch((error) => {
        alert("there was an error in adding the news");
      });
  };

  const token = localStorage.getItem("blog_auth_token");
  const authenticate = (token) => {
    axios
      .post("http://localhost:8000/token_authenticate", { token: token })
      .then((res) => {
        if (res.data.authenticated) {
          setDetails(res.data.user);
          //console.log(res.data.user);
        } else {
          // setLogged(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    authenticate(token);
  }, []);

  return (
    <div className="mt-5 sm:py-10 ">
      <div className="w-full bg-white flex  mx-5 p-3 fixed top-0 justify-between ">
        <div className=" px-5 gap-2 flex">
          <img
            src={logo}
            alt="no image"
            color="red"
            className="sm:w-8 w-6 h-6 sm:h-10"
          />
          <h2 className="sm:text-2xl text-l font-bold sm:py-2  text-black">
            GEDDIT
          </h2>
        </div>
        <div className="justify-between m-2 p-2">
          {logged ? (
            <div>
              <Link to="/register" className=" text-xl mx-2">
                {/* <Person2Rounded fontSize="large" /> {details.email} */}
              </Link>
              {/* <Link
                to="/add"
                className=" text-xl py-3 px-2 font-mono bg-orange-600 rounded uppercase text-white  mx-2">
                Create A Blog
              </Link> */}
              <Link
                to="/login"
                className=" sm:text-xl text-sm py-3 px-2 font-mono bg-orange-600 rounded uppercase text-white  mx-2">
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login" className=" text-xl mx-2">
                Login <LoginIcon />
              </Link>
              <Link to="/register" className=" text-xl mx-2">
                Register <HowToRegIcon />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="m-auto w-full p-10">
        <h3 className="px-2 py-4 text-center text-sm sm:text-xl text-green-500 uppercase font-bold">
          {success}
        </h3>
        <h3 className="sm:text-2xl text-l font-mono text-center font-semibold">
          Create a Blog
        </h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="   m-10">
            <input
              className="px-4 py-4  border-1 text-l  sm:text-xl sm:w-2/3 w-full   border-2 "
              type="text"
              name="title"
              value={inputs.title || ""}
              onChange={handleChange}
              placeholder="Enter the title of the blog"
            />
          </div>
          <div className=" m-10">
            <select
              className=" space-y-5 text-left font-semibold mx-auto my-5 p-5 w-4/5 sm:w-1/4 "
              value={inputs.topic || ""}
              name="topic"
              onChange={handleChange}>
              <option className=" ">Select a Topic</option>
              <option className="">Politics</option>
              <option className=" ">Entertainment</option>
              <option className=" ">Business</option>
              <option className=" ">Fashion</option>
              <option className=" ">Sports</option>
              <option className=" ">Gaming</option>
              <option className=" ">Others</option>
            </select>
          </div>
          <div className="  m-10 ">
            <textarea
              type="text"
              name="content"
              className="p-2 text-l sm:text-2xl border-2 sm:w-2/3 w-full border-blue-400"
              rows={7}
              value={inputs.content || ""}
              onChange={handleChange}
              placeholder="Enter the content the Blog"></textarea>
          </div>

          <label className="flex  flex-col m-10 space-y-5">
            Select an Image
            <input
              className=""
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </label>

          <div className="  m-10">
            <button className="border-1 px-10 sm:py-4  py-3 text-bold  text-white text-l sm:text-2xl sm:w-1/4 border-blue-300 bg-blue-500">
              add
            </button>
          </div>
          <div>
            <Link
              to={"/"}
              className="text-left text-xl font-semibold py-4 my-5 mx-5 px-4 text-blue-700">
              Back to Blogs
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Create;
