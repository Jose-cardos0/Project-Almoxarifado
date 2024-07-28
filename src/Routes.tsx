import { createBrowserRouter } from "react-router-dom";

//pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Outlets from "./Components/Outlet";
import Admin from "./Pages/Admin";

//protect
import { Protect } from "./Protect/Protect";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Outlets />,
    children: [
      {
        path: "/",
        element: (
          <Protect>
            <Home />
          </Protect>
        ),
      },
      {
        path: "/admin",
        element: (
          <Protect>
            <Admin />
          </Protect>
        ),
      },
    ],
  },
]);

export default routes;
