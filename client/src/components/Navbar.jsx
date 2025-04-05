import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CertiCampo</Link>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <Link to="/registros">Registros</Link>
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
    </nav>
  );
};

export default Navbar; 