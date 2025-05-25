import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Index from "./Pages/Index";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import About from "./Pages/About";
import Administration from "./Pages/AdministrationP";
import Statements from "./Pages/StatementsP";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Apply from "./Pages/Apply";
import AdmissionsProcess from "./Pages/AdmissionProcess";
import FeesStructure from "./Pages/FeesStructure";
import Curriculum from "./Pages/Curriculum";
import Message from "./Pages/Dashboard/Message";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} caseSensitive={false} />
          <Route
            path="/administration"
            element={<Administration />}
            caseSensitive={false}
          />
          <Route
            path="/mission-vision"
            element={<Statements />}
            caseSensitive={false}
          />
          <Route path="/apply" element={<Apply />} caseSensitive={false} />
          <Route path="/contact" element={<Contact />} caseSensitive={false} />
          <Route path="/admission-overview" element={<AdmissionsProcess />} caseSensitive={false} />
          <Route path="/fees-structure" element={<FeesStructure />} caseSensitive={false} />
          <Route path="/curriculum" element={<Curriculum />} caseSensitive={false} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/messages"
            element={
              <RequireAuth>
                <Message />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
