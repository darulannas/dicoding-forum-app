import { ActionType } from './action';

function threadReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads]; // Menambahkan thread baru ke awal array
    case ActionType.TOGGLE_UPVOTE_THREAD:
      // Logika untuk menangani upvote thread
      // return threads.map((thread) => (thread.id === action.payload.threadId
      //   ? { ...thread, upvoted: !thread.upvoted }
      //   : thread));
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    case ActionType.TOGGLE_DOWNVOTE_THREAD:
      // Logika untuk menangani downvote thread
      // return threads.map((thread) => (thread.id === action.payload.threadId
      //   ? { ...thread, downvoted: !thread.downvoted }
      //   : thread));
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    case ActionType.NEUTRALIZE_THREAD_VOTE:
      // Logika untuk menangani neutralize thread vote
      // return threads.map((thread) => (thread.id === action.payload.threadId
      //   ? { ...thread, upvoted: false, downvoted: false }
      //   : thread));
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadReducer;
