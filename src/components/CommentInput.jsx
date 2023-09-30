import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput'; // Pastikan impor custom hook ini

function CommentInput({ addComment }) {
  // Gunakan custom hook useInput untuk mengelola nilai input
  const [content, setContent] = useInput('');

  const handleAddThread = (e) => {
    e.preventDefault();

    // Kirim objek yang sesuai ke addThread
    addComment(content);
  };

  return (
    <div className="bg-white pl-6 pr-6 pb-6 shadow-lg">
      <form className="mb-4">
        <div className="mb-4">
          <p className="text-xl font-semibold pb-2">Beri Komentar</p>
          <textarea
            id="threadContent"
            className="w-full max-w-lg md:max-w-4xl px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder=""
            rows="4"
            value={content}
            onChange={setContent}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md focus:outline-none focus:bg-blue-600"
          onClick={handleAddThread}
        >
          Kirim
        </button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
