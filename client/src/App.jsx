import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CultivesProvider } from "./context/CultivesContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CultivesForm from "./pages/CultivesForm";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CultivesList from "./pages/CultivesList";
import CultiveDetail from "./pages/CultiveDetail";

function App() {
  return (
    <AuthProvider>
      <CultivesProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cultives"
              element={
                <ProtectedRoute>
                  <CultivesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cultives/new"
              element={
                <ProtectedRoute>
                  <CultivesForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cultives/:id"
              element={
                <ProtectedRoute>
                  <CultiveDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CultivesProvider>
    </AuthProvider>
  );
}

export default App;
