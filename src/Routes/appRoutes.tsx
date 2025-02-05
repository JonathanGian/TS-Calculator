import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Calculator from "../Pages/Calculator/Calculator";

const createRoutes = () => {
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <Calculator />,
        errorElement: <ErrorPage />,
        children: [
          {/* new routes go here: 
            path: "/test", element: <TestPage />  */},
       
        ],
      },
    ],
  );
};

export default createRoutes;
