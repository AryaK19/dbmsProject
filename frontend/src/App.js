import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Hackathon from "./pages/Hackathon";
import Login from "./pages/Login";

import NotFound from "./extra/NotFound";
import { ProtectedRoot, ProtectedRoutes } from "./Auth/ProtectedRoutes";
import AuthContext from "./Auth/AuthContext";
import RootLayout from "./Layout/RootLayout";
import HomeLayout from "./Layout/HomeLayout";

const App = () => {
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<HomeLayout />}>
        {/* add protected route */}
        <Route index element={<ProtectedRoot />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/hackathon/:id"
          // element={user ? <Hackathon /> : <Navigate to="/login" />}
          element={<ProtectedRoutes element={<Hackathon />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>

    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route
    //       path="/"
    //       element={user ? <Home /> : <Navigate to="/login" />}
    //     />
    //     <Route
    //       path="/hackathon/:id"
    //       // element={user ? <Hackathon /> : <Navigate to="/login" />}
    //       element= {<Hackathon /> }
    //     />
    //   </Routes>
    // </Router>
  );
};

export default App;
