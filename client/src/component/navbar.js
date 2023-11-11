import React from 'react';
import "./styles/navbar.css";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Chat</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
