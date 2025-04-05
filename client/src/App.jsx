import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CultivesProvider } from "./context/CultivesContext";
import { SocialProvider } from "./context/SocialContext";

import LoginPage from "./pages/LoginPage";
import Inicio from "./pages/Inicio"
import RegistroCultivos from "./pages/RegistroCultivos/RegistroCultivos";
import NuevoRegistro from "./pages/RegistroCultivos/NuevoRegistro";
import Certificados from "./pages/Certificados";
import RedSocial from "./pages/RedSocial";
import Perfil from "./pages/Perfil";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CultivesProvider>
        <SocialProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />}/>

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Inicio />}/>
                <Route path="/registros" element={<RegistroCultivos/>} /> 
                <Route path="/nuevo-registro" element={<NuevoRegistro/>} />
                <Route path="/certificados" element={<Certificados/>} /> 
                <Route path="/red_social" element={<RedSocial/>} /> 
                <Route path="/perfil" element={<Perfil/>} /> 
              </Route>          
            </Routes>
          </BrowserRouter>
        </SocialProvider>
      </CultivesProvider>
    </AuthProvider>
  );
}

export default App;
