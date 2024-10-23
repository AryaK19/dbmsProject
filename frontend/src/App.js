import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Hackathon from "./pages/Hackathon";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import the Register component
import NotFound from "./extra/NotFound"; // Import the updated NotFound component
// import ErrorBoundary from "./extra/ErrorBoundary"; // Import the ErrorBoundary component
import { ProtectedRoot, ProtectedRoutes } from "./Auth/ProtectedRoutes";
import AuthContext from "./Auth/AuthContext";
import RootLayout from "./Layout/RootLayout";
import StudentLayout from "./Layout/StudentLayout";
import AdminLayout from "./Layout/AdminLayout";
import Home from "./pages/Home";
import AdminHome from "./Admin/AdminHome";
import HackathonParticipants from './Admin/HackathonParticipants';

import AdminHackathon from "./Admin/AdminHackathon";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile"; // Import the EditProfile component
import CreateEditHackathon from "./Admin/CreateEditHackathon";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
        <Route index element={<ProtectedRoot />}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="student" element={<ProtectedRoutes element={<StudentLayout />} />}>
          <Route index element={<ProtectedRoutes element={<Home />} />} />
          <Route
            path="hackathon/:id"
            element={<ProtectedRoutes element={<Hackathon />} />}
          />
          <Route path="profile" element={<ProtectedRoutes element={<Profile />} />} />
          <Route path="edit-profile" element={<ProtectedRoutes element={<EditProfile />} />} />
        </Route>

        <Route path="admin" element={<ProtectedRoutes element={<AdminLayout />} />}>
          <Route index element={<ProtectedRoutes element={<AdminHome />} />} />
          <Route path="create-edit-hackathon/:id?" element={<CreateEditHackathon />} />
          <Route path="profile" element={<ProtectedRoutes element={<Profile />} />} />
          <Route path="hackathon/:id/participants" element={<HackathonParticipants />} />
    
          <Route path="edit-profile" element={<ProtectedRoutes element={<EditProfile />} />} />
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
  );
};

export default App;