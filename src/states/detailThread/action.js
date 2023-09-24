/* eslint-disable no-alert */
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZE_THREAD_VOTE_DETAIL: 'NEUTRALIZE_THREAD_VOTE_DETAIL',
};

function receiveThreadDetailActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      detailThread,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleNeutralizeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_VOTE_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToogleUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(toggleUpvoteThreadDetailActionCreator(authUser.id));

    try {
      await api.upvoteThread(detailThread.id);
    } catch (error) {
      alert(error.message);
      // Jika upvote gagal, kita perlu mengembalikan state ke kondisi semula
      dispatch(toggleUpvoteThreadDetailActionCreator());
    }
  };
}

function asyncToogleDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(toggleDownvoteThreadDetailActionCreator(authUser.id));

    try {
      await api.downvoteThread(detailThread.id);
    } catch (error) {
      alert(error.message);
      // Jika downvote gagal, kita perlu mengembalikan state ke kondisi semula
      dispatch(toggleDownvoteThreadDetailActionCreator());
    }
  };
}

function asyncToggleNeutralizeThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(toggleNeutralizeThreadDetailActionCreator(authUser.id));

    try {
      await api.neutralizeThreadVote(detailThread.id);
    } catch (error) {
      alert(error.message);
      // Jika neutralize gagal, kita perlu mengembalikan state ke kondisi semula
      dispatch(toggleNeutralizeThreadDetailActionCreator());
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpvoteThreadDetailActionCreator,
  toggleDownvoteThreadDetailActionCreator,
  toggleNeutralizeThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToogleUpvoteThreadDetail,
  asyncToogleDownvoteThreadDetail,
  asyncToggleNeutralizeThreadDetail,
};
