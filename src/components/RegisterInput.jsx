import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="mb-4">
      <div className="mb-4">
        <input
          type="text"
          id="name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Nama"
        // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={name}
          onChange={onNameChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button
        type="button"
        onClick={() => register({ name, email, password })}
        className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md focus:outline-none focus:bg-blue-600"
      >
        Daftar
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
