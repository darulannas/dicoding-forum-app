import React, { useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToogleUpvoteThread, asyncToogleDownvoteThread, asyncToogleNeutralizeThread,
} from '../states/threads/action';
import ThreadsList from '../components/ThreadsList';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((state) => state); // Mengambil state threads, users, dan authUser dari store

  const dispatch = useDispatch(); // Mengambil fungsi dispatch dari store

  useEffect(() => {
    // Men-dispatch aksi asinkron untuk mengisi data threads dan users
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (id) => {
    // Men-dispatch aksi asinkron untuk upvote thread
    dispatch(asyncToogleUpvoteThread(id));
  };

  const onDownVote = (id) => {
    // Men-dispatch aksi asinkron untuk downvote thread
    dispatch(asyncToogleDownvoteThread(id));
  };

  const onNeutralVote = (id) => {
    // Men-dispatch aksi asinkron untuk neutral vote thread
    dispatch(asyncToogleNeutralizeThread(id));
  };

  const threadList = threads.map((thread) => {
    const authUserId = authUser ? authUser.id : null; // Pemeriksaan authUser

    return {
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      authUser: authUserId, // Menggunakan authUserId yang telah diperiksa
    };
  });

  return (
    <section className="bg-gray-100 p-4 min-h-screen">

      {/* List Threads */}
      <div className="container mx-auto pt-24 max-w-lg md:max-w-4xl">
        <ThreadsList
          threads={threadList}
          upVote={onUpVote}
          downVote={onDownVote}
          neutralVote={onNeutralVote}
        />
      </div>

      {/* Tombol Add dengan ikon lingkaran */}
      <Link to="/new">
        <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 fixed bottom-8 right-8">
          <FaPlusCircle className="text-2xl" />
          {' '}
          {/* Ikon tambah dari FontAwesome */}
        </button>
      </Link>
    </section>
  );
}

export default HomePage;
