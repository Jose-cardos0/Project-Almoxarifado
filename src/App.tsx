import "./App.css";
import Outlets from "./Components/Outlet";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Outlets />
    </>
  );
}

export default App;
