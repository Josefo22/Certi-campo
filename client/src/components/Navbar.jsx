import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // No mostrar el navbar en la página de login
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CertiCampo</Link>
      </div>
      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <>
            <Link to="/registros">Registro de Cultivos</Link>
            <Link to="/nuevo-registro">Nuevo Registro</Link>
            <Link to="/certificados">Certificados</Link>
            <Link to="/perfil">Perfil</Link>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
          </>
        )}
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar; 