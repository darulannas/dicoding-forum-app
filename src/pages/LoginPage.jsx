import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const onLogin = ({ email, password }) => {
    // @TODO: dispatch async action to login
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <LoginInput login={onLogin} />
        <p className="mb-4 text-gray-600">
          Belum punya akun?
          {' '}
          <Link to="/register" className="text-blue-500">
            Daftar di sini
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
