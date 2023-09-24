import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput'; // Pastikan impor custom hook ini

function ThreadInput({ addThread }) {
  // Gunakan custom hook useInput untuk mengelola nilai input
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');

  const handleAddThread = (e) => {
    e.preventDefault();

    // Kirim objek yang sesuai ke addThread
    addThread(title, category, body);
  };

  return (
    <form className="mb-4">
      <div className="mb-4">
        <input
          type="text"
          id="threadTitle"
          className="w-full max-w-lg md:max-w-4xl px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Judul"
        // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={title}
          onChange={setTitle}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="threadCategory"
          className="w-full max-w-lg md:max-w-4xl px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Kategori"
          value={category}
          onChange={setCategory}
        />
      </div>
      <div className="mb-4">
        <textarea
          id="threadContent"
          className="w-full max-w-lg md:max-w-4xl px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder=""
          rows="4"
          value={body}
          onChange={setBody}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md focus:outline-none focus:bg-blue-600"
        onClick={handleAddThread}
      >
        Buat
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
