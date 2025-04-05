import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CultivesProvider } from "./context/CultivesContext";
import LoginPage from "./pages/LoginPage";
import Inicio from "./pages/Inicio";
import RegistroCultivos from "./pages/RegistroCultivos/RegistroCultivos";
import NuevoRegistro from "./pages/RegistroCultivos/NuevoRegistro";
import Certificados from "./pages/Certificados";
import Perfil from "./pages/Perfil";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <CultivesProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/registros"
              element={
                <ProtectedRoute>
                  <RegistroCultivos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nuevo-registro"
              element={
                <ProtectedRoute>
                  <NuevoRegistro />
                </ProtectedRoute>
              }
            />
            <Route
              path="/certificados"
              element={
                <ProtectedRoute>
                  <Certificados />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
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
