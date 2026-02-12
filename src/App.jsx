import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import Threats from "./pages/Threats";
import Awareness from "./pages/Awareness";
import Premium from "./pages/Premium";
import Admin from "./pages/Admin";

import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

import { getCurrentUser, initAdmin } from "./utils/planUtils";
import Footer from "./Components/Footer";

function AppLayout() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    initAdmin();
  }, []);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location]);

  return (
    <>
      {currentUser && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/threats"
          element={
            <ProtectedRoute>
              <Threats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/awareness"
          element={
            <ProtectedRoute>
              <Awareness />
            </ProtectedRoute>
          }
        />
        <Route
          path="/premium"
          element={
            <ProtectedRoute>
              <Premium />
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />
      </Routes>
            {location.pathname === "/" && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
