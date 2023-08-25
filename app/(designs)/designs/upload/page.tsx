'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';

interface IFormInput {
  shot: string | File[] | File;
  description: string;
  shotUrl: string;
}

const schema = Joi.object({
  shot: Joi.any().required().label('Shot is Required '),
  description: Joi.string().min(200).max(600).required(),
  shotUrl: Joi.string().required(),
});

const Upload = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setLoading(true);
    setMessage('Uploading...');
    try {
      const { data } = await axios.post('http://localhost:3000/api/shots', {
        role: 'vendor',
        description: val.description,
        images: {
          title: 'Hotel Room',
          url: val.shotUrl,
        },
        tags: ['Minimal', 'Modern', 'Luxurious'],
        category: 'room',
        title: 'Hotel Room',
        owner: localStorage.getItem('v_id'),
      });
      if (!data) {
        setMessage('Some Error!');
        setLoading(false);
        return;
      }
      setMessage('Uploaded Successfully: Redirecting to shot!');
      router.push(`/designs/${data.shot._id}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage('Some Error!');
    }
  };

  return (
    <>
      <Link href='/designs' className='w-full text-center bg-trans px-4 py-2 block '>
        Cancel !
      </Link>
      <header className='my-4 text-center'>
        <h1>What have you been working on?</h1>
        {message && <h1 className='fixed top-5 left-1/2'>{message}</h1>}
      </header>
      <form
        className='flex flex-col gap-4  py-8 text-gray'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex h-[70vh] flex-col items-center justify-center rounded border border-dashed px-16  text-center'>
          <input
            accept='image/*'
            type='file'
            id='shot'
            className='mb-4'
            {...register('shot')}
          />
          <span className='mt-1 text-xs text-red-400'>
            {errors.shot?.message}
          </span>
          <p>
            Drag and drop image or <span className='text-primary'>Browse</span>
          </p>
          <p>
            Minimum 1600px width recommended. Max 10MB each shot High resolution
            (png, jpg, jepg)
          </p>
        </div>
        <input
          type='text'
          id='shotUrl'
          className='rounded bg-dark p-4'
          placeholder='Add the url here...'
          {...register('shotUrl')}
        />
        <textarea
          {...register('description')}
          className='rounded bg-dark p-4'
          id='description'
          cols={30}
          rows={10}
          placeholder='Add the description here...'
        />
        <span className='mt-1 text-xs text-red-400'>
          {errors.description?.message}
        </span>
        <button disabled={loading} className='mt-4 rounded bg-primary p-2 '>
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
