// src/components/Navbar/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import aluraflixLogo from "../assets/img/aluraflix-logo.png";
import "./Navbar.css";

const Navbar = () => {
    return (
        <header className="navbar">
            <img src={aluraflixLogo} alt="AluraFlix Logo" className="navbar__logo" />
            <nav className="navbar__menu">
                <Link to="/" className="button button--primary">Home</Link>
                <Link to="/Create" className="button button--secondary">Nuevo video</Link>
            </nav>
        </header>
    );
};

export default Navbar;