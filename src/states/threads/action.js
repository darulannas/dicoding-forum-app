/* eslint-disable no-alert */
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
  NEUTRALIZE_THREAD_VOTE: 'NEUTRALIZE_THREAD_VOTE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralizeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({
  title, category, body,
}) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({
        title, category, body,
      });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToogleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToogleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToogleNeutralizeThread(threadId) { // Thunk untuk neutralize thread vote
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralizeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralizeThreadVote(threadId); // Panggil fungsi dari API
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpvoteThreadActionCreator,
  toggleDownvoteThreadActionCreator,
  toggleNeutralizeThreadActionCreator,
  asyncAddThread,
  asyncToogleUpvoteThread,
  asyncToogleDownvoteThread,
  asyncToogleNeutralizeThread,
};
