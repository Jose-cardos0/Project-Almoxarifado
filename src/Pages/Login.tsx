//logo
import logo from "../assets/JSSYSTEM.png";
import backgroundvid from "../assets/back.mp4";

//firebase
import { auth } from "../FireBase/FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";

//usestate
import { FormEvent, useState, useRef } from "react";

//toastfy
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//router
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState<string>("teste@teste.com");
  const [password, setPassword] = useState("123456");
  const inputLogin = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (login === "" || password === "") {
      toast.warn("Preencha todos os campos");
      return;
    }

    await signInWithEmailAndPassword(auth, login, password)
      .then(() => {
        toast.success("Logado com sucesso!");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);

        if (error.message) {
          toast.error("Credenciais inválidas");
          inputLogin.current?.focus();
        }
      });
  }

  return (
    <div className=" relative h-screen w-screen flex justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-screen h-screen object-cover"
      >
        <source src={backgroundvid} type="video/mp4" />
      </video>
      <div className="flex h-2/4 w-2/4 flex-col justify-center items-center m-auto z-10">
        <div>
          <img src={logo} alt="JS customized system" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-4 w-full justify-center items-center "
        >
          <label className="w-full">
            <span className="text-black font-bold">Login</span> <br />
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-2 outline-none"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              ref={inputLogin}
            />
          </label>
          <label className="w-full">
            <span className="text-black font-bold">Password:</span> <br />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-700 px-3.5 mt-4 text-white w-full 
            rounded-lg duration-700 cursor-pointer hover:bg-white
             hover:text-black  "
          >
            Entrar
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
