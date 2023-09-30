/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { postedAt } from '../utils/index';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
}) {
  const isThreadUpvoted = upVotesBy.includes(authUser);
  const isThreadDownvoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    switch (true) {
      case isThreadUpvoted && !isThreadDownvoted:
        neutralVoteThread(id);
        break;
      case !isThreadUpvoted && !isThreadDownvoted:
        upVoteThread(id);
        break;
      case !isThreadUpvoted && isThreadDownvoted:
        neutralVoteThread(id);
        upVoteThread(id);
        break;
      default:
        upVoteThread(id);
        // if (isDownvoted) {
        //   downVote(id);
        // }
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    switch (true) {
      case isThreadDownvoted && !isThreadUpvoted:
        neutralVoteThread(id);
        break;
      case !isThreadDownvoted && !isThreadUpvoted:
        downVoteThread(id);
        break;
      case !isThreadDownvoted && isThreadUpvoted:
        neutralVoteThread(id);
        downVoteThread(id);
        break;
      default:
        downVoteThread(id);
        // if (isUpvoted) {
        //   upVote(id);
        // }
    }
  };

  const sanitizedBody = DOMPurify.sanitize(body);

  return (
    <div className="bg-white p-6 shadow-lg">
      <div className="bg-gray-300 p-2 inline-block">
        #
        {category}
      </div>
      <header className="flex items-center justify-between mt-2 pb-4">
        <p className="text-3xl font-semibold">{title}</p>
      </header>
      <article>
        <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
      </article>
      <div className="mt-4">
        <button
          type="button"
          aria-label="upvote"
          onClick={onUpVoteClick}
          className={`mr-2 ${isThreadUpvoted ? 'text-blue-500' : 'text-black'}`}
        >
          <FaRegThumbsUp />
        </button>
        <span className="text-gray-700 pr-2">{upVotesBy.length}</span>
        <button
          type="button"
          aria-label="downvote"
          onClick={onDownVoteClick}
          className={`mr-2 ${isThreadDownvoted ? 'text-red-500' : 'text-black'}`}
        >
          <FaRegThumbsDown />
        </button>
        <span className="text-gray-700 pr-2">{downVotesBy.length}</span>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p className="text-gray-600">
          Dibuat oleh
          <span className="pl-1"><img src={owner.avatar} alt={owner.name} className="inline-block w-8 h-8 rounded-full" /></span>
          <span className="pl-1">{owner.name}</span>
          <span className="pl-3">{postedAt(createdAt)}</span>
        </p>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
  neutralVoteThread: PropTypes.func.isRequired,
};

export default ThreadDetail;
