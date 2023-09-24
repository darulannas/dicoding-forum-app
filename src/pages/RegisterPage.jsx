import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const onRegister = ({ name, email, password }) => {
    // @TODO: dispatch async action to register
    dispatch(asyncRegisterUser({ email, name, password }));

    navigate('/');
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Daftar</h2>
        <RegisterInput register={onRegister} />
        <p className="mb-4 text-gray-600">
          Sudah punya akun?
          {' '}
          <Link to="/login" className="text-blue-500">
            Login di sini
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
