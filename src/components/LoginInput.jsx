import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="mb-4">
      <div className="mb-4">
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Email"
        // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
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
        onClick={() => login({ email, password })}
        className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md focus:outline-none focus:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
