import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { PeopleRounded, Person2Rounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import logo1 from "../static/logo1.png";
import logo2 from "../static/logo2.png";
import logo3 from "../static/logo3.png";
import logo4 from "../static/logo4.png";
const Top = () => {
  return (
    <div className="w-full bg-slate-200 flex  mx-auto p-3  top-0 justify-between ">
      <div className=" flex flex-row md:flex-col">
        <img src={logo2} alt="no image" />
      </div>
      <div className="justify-between m-2 p-2">
        <Link to="/add" className=" text-xl font-medium mx-2">
          Create
        </Link>

        <Link to="/login" className=" text-xl mx-2">
          Login <LoginIcon />
        </Link>
        <Link to="/register" className=" text-xl mx-2">
          Register <HowToRegIcon />
        </Link>
        <Link to="/register" className=" text-xl mx-2">
          Profile <Person2Rounded />
        </Link>
      </div>
    </div>
  );
};

export default Top;
