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
import StudentLayout from "./Layout/StudentLayout";
import AdminLayout from "./Layout/AdminLayout";
import Home from "./pages/Home";
import AdminHome from "./Admin/AdminHome";
import AdminHackathon from "./Admin/AdminHackathon";
import Profile from "./pages/Profile";
import CreateEditHackathon from "./Admin/CreateEditHackathon";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* add protected route */}
        <Route index element={<ProtectedRoot />} />
        <Route path="/login" element={<Login />} />

        <Route path="student" element={<ProtectedRoutes element={<StudentLayout />} />}>
          <Route index element={<ProtectedRoutes element={<Home />} />} />
          <Route
            path="hackathon/:id"
            // element={user ? <Hackathon /> : <Navigate to="/login" />}
            element={<ProtectedRoutes element={<Hackathon />} />}
          />
        </Route>

        <Route path="admin" element={<ProtectedRoutes element={<AdminLayout />} />}>
          <Route index element={<ProtectedRoutes element={<AdminHome />} />} />
          <Route path="create-edit-hackathon/:id?" element={<CreateEditHackathon />} />
          <Route path="profile" element={<ProtectedRoutes element={<Profile />} />} />
          <Route path="hackathon/:id" element={<ProtectedRoutes element={<AdminHackathon />} />} />
        </Route>

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
