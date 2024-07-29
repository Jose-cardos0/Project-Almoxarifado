import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

//assets
import logo from "../assets/FAVICON.png";

//auth
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/FireBase";

const Headers = () => {
  return (
    <div className="bg-black h-auto flex justify-center gap-2 items-center w-screen">
      <div>
        <Link to={"/"}>
          <img
            src={logo}
            alt=""
            className="w-10 my-2 cursor-pointer hover:scale-90"
          />
        </Link>
      </div>
      <div className="flex gap-3">
        <Link
          to={"/"}
          className="text-white font-light text-xs hover:text-gray-500"
        >
          Home
        </Link>
        <Link
          to={"/funcionarios"}
          className="text-white font-light text-xs hover:text-gray-500"
        >
          Reg. Funcionário
        </Link>
        <button
          onClick={() => {
            signOut(auth);
            return <Navigate to={"/login"} />;
          }}
          className=" text-xs text-white font-light bg-blue-700 px-3.5 rounded-md hover:bg-white hover:text-black"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Headers;
