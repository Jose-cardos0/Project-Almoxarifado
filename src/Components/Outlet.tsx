import { Outlet } from "react-router-dom";

//pages
import Headers from "./Headers";

const Outlets = () => {
  return (
    <div>
      <Headers />
      <Outlet />
    </div>
  );
};

export default Outlets;
