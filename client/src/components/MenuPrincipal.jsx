import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Logo from '../assets/Logo.png';
import './MenuPrincipal.css';

function MenuPrincipal(){
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <nav className="navbar">
            <div className="logo">
                <button onClick={() => navigate('/')}>
                    <img src={Logo} alt="Logo CertiCampo" className="logo-image"/>
                    <span className="logo-text">CertiCampo</span>
                </button>
            </div>
            <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
                <div className="menu-links">
                    <button onClick={() => navigate('/')}>Inicio</button>
                    <button onClick={() => navigate('/registros')}>Registro Cultivos</button>
                    <button onClick={() => navigate('/certificados')}>Sacar Certificados</button>
                    <button onClick={() => navigate('/red_social')}>Foro</button>
                    <button onClick={() => navigate('/perfil')}>Perfil</button>
                    <button onClick={handleLogout} className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                </div>
            </div>
            <div className="menu-btn" onClick={toggleMenu}>
                <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
        </nav>
    )
}

export default MenuPrincipal;