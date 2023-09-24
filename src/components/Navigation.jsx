import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dicodingLogo from '../assets/dicoding-icons.png';

function Navigation({ authUser, signOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 fixed top-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={dicodingLogo} alt="Dicoding Logo" className="w-8 h-8" />
          <Link to="/" className="text-white text-xl font-semibold pl-4">DICODING FORUM APP</Link>
        </div>
        <div className="lg:hidden">
          {menuOpen ? (
            <button
              type="button"
              onClick={toggleMenu}
              className="text-white text-xl focus:outline-none"
              aria-label="Close Menu"
            >
              &times;
              {' '}
              {/* Ini adalah karakter Unicode untuk ikon "X" */}
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleMenu}
              className="text-white text-xl focus:outline-none"
              aria-label="Open Menu"
            >
              &#8801;
            </button>
          )}
        </div>
        <ul className={`lg:flex lg:space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:items-center`}>
          {authUser ? (
            <>
              <img src={authUser.avatar} alt={authUser.id} className="w-6 h-6 rounded-full" />
              <span className="text-white block lg:text-xl">{authUser.name}</span>
              <button
                type="button"
                onClick={signOut}
                className="text-white block lg:text-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <li><Link to="/login" className="text-white block lg:text-xl">Login</Link></li>
          )}
          <li><Link to="/leaderboard" className="text-white block lg:text-xl">Leaderboard</Link></li>
          <li><Link to="/" className="text-white block lg:text-xl">Threads</Link></li>
        </ul>
      </div>
    </nav>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
