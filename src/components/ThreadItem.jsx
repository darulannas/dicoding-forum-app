/* eslint-disable no-alert */
/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { postedAt } from '../utils/index';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  ownerId,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUser,
  upVote,
  downVote,
  neutralVote,
}) {
  const navigate = useNavigate();
  const isUpvoted = upVotesBy.includes(authUser);
  const isDownvoted = downVotesBy.includes(authUser);

  const [showFullBody, setShowFullBody] = useState(false);

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote.');
      return;
    }

    switch (true) {
      case isUpvoted && !isDownvoted:
        neutralVote(id);
        break;
      case !isUpvoted && !isDownvoted:
        upVote(id);
        break;
      case !isUpvoted && isDownvoted:
        neutralVote(id);
        upVote(id);
        break;
      default:
        upVote(id);
        // if (isDownvoted) {
        //   downVote(id);
        // }
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote.');
      return;
    }

    switch (true) {
      case isDownvoted && !isUpvoted:
        neutralVote(id);
        break;
      case !isDownvoted && !isUpvoted:
        downVote(id);
        break;
      case !isDownvoted && isUpvoted:
        neutralVote(id);
        downVote(id);
        break;
      default:
        downVote(id);
        // if (isUpvoted) {
        //   upVote(id);
        // }
    }
  };

  const toggleFullBody = () => {
    setShowFullBody(!showFullBody);
  };

  // Batasi tampilan body hingga 100 kata
  const truncatedBody = body.length > 150 && !showFullBody ? `${body.slice(0, 150)}...` : body;

  // Gunakan DOMPurify untuk membersihkan dan memasukkan HTML yang aman ke dalam komponen
  const sanitizedBody = DOMPurify.sanitize(truncatedBody);

  // Tampilkan tombol "Baca Selengkapnya" jika kontennya lebih dari 100 kata
  const readMoreButton = body.length > 150 ? (
    <button
      type="button"
      onClick={toggleFullBody}
      className="text-blue-500 hover:underline mt-2 cursor-pointer"
    >
      {showFullBody ? 'Tutup' : 'Baca Selengkapnya'}
    </button>
  ) : null;

  return (
    <div className="thread-item bg-white rounded-lg shadow-md p-4">
      <div className="bg-gray-300 p-2 inline-block">
        #
        {category}
      </div>
      <header className="flex items-center justify-between mt-2 pb-2">
        <button
          type="button"
          onClick={onThreadClick}
          className="text-2xl font-semibold cursor-pointer hover:underline"
        >
          {title}
        </button>
      </header>
      <article>
        <p className={`thread-item__body text-gray-700 ${showFullBody ? '' : 'max-h-20 overflow-hidden'}`}>
          <span dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
        </p>
        {readMoreButton}
      </article>
      <div className="thread-item__metadata mt-4 text-sm text-gray-500 pb-2">
        <p className="mr-4">
          Dibuat oleh
          <span className="pl-1">{ownerId}</span>
          <span className="pl-3">
            {postedAt(createdAt)}
          </span>
        </p>
      </div>
      <div className="thread-item__votes flex items-center">
        <button
          type="button"
          aria-label="upvote"
          onClick={onUpVoteClick}
          className={`mr-2 ${isUpvoted ? 'text-blue-500' : 'text-black'}`}
        >
          <FaRegThumbsUp />
        </button>
        <span className="text-gray-700 pr-2">{upVotesBy.length}</span>
        <button
          type="button"
          aria-label="downvote"
          onClick={onDownVoteClick}
          className={`mr-2 ${isDownvoted ? 'text-red-500' : 'text-black'}`}
        >
          <FaRegThumbsDown />
        </button>
        <span className="text-gray-700 pr-2">{downVotesBy.length}</span>
        <p className="mr-4">
          Komentar
          <span className="text-gray-700 font-semibold pl-2">{totalComments}</span>
        </p>
      </div>
    </div>
  );
}

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

ThreadItem.defaultProps = {
  upVote: null,
  downVote: null,
  neutralVote: null,
};

export { threadItemShape };

export default ThreadItem;
