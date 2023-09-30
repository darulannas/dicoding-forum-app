/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import {
  asyncReceiveThreadDetail,
  asyncToogleUpvoteThreadDetail,
  asyncToogleDownvoteThreadDetail,
  asyncToggleNeutralizeThreadDetail,
} from '../states/detailThread/action';
// buat comment action

function DetailThreadPage() {
  const { id } = useParams();
  const {
    detailThread = null,
    authUser,
  } = useSelector((states) => states); // @TODO: get talkDetail and authUser state from store
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to get talk detail by id
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpvoteThread = () => {
    // @TODO: dispatch async action to toggle like talk detail
    dispatch(asyncToogleUpvoteThreadDetail());
  };

  const onDownvoteThread = () => {
    // @TODO: dispatch async action to toggle like talk detail
    dispatch(asyncToogleDownvoteThreadDetail());
  };

  const onNeutralizevoteThread = () => {
    // @TODO: dispatch async action to toggle like talk detail
    dispatch(asyncToggleNeutralizeThreadDetail());
  };

  // buat dispatch comment action

  if (!detailThread) {
    return null;
  }

  return (
    <section className="detail-page bg-gray-100 p-4 min-h-screen">
      <div className="container mx-auto pt-24 max-w-lg md:max-w-4xl">
        <ThreadDetail
          {...detailThread}
          authUser={authUser.id}
          upVoteThread={onUpvoteThread}
          downVoteThread={onDownvoteThread}
          neutralVoteThread={onNeutralizevoteThread}
        />
        <CommentInput />
      </div>

      <CommentList />
    </section>
  );
}

export default DetailThreadPage;
