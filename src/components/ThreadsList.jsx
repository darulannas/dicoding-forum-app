import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({
  threads, upVote, downVote, neutralVote,
}) {
  return (
    <div>
      {threads.map((thread) => (
        // Tambahkan kelas "mb-4" untuk memberikan margin bawah antara setiap thread item
        <div key={thread.id} className="mb-4">
          <ThreadItem
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...thread}
            upVote={upVote}
            downVote={downVote}
            neutralVote={neutralVote}
          />
        </div>
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
};

ThreadsList.defaultProps = {
  upVote: null,
  downVote: null,
  neutralVote: null,
};

export default ThreadsList;
