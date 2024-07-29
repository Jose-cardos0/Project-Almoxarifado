import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Ops..</h1>
      <p>Caminho não encontrato 👉</p>
      <Link to={"/login"}>
        <button
          className="bg-blue-700 px-3 rounded-sm 
          font-light text-xs text-white hover:bg-orange-400"
        >
          Ir para página de Login
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
