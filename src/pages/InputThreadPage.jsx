import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function InputThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const onAddThread = (title, category, body) => {
    // @TODO: dispatch async action to add thread
    dispatch(asyncAddThread({ title, category, body }));

    navigate('/');
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto pt-24 max-w-lg md:max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Buat Diskusi Baru</h2>
        <ThreadInput addThread={onAddThread} />
      </div>
    </section>
  );
}

export default InputThreadPage;
