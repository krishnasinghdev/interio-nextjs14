import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import axios from 'axios';
import { shotData } from '@/types/shotType';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { vendor as vd, isLogin } from '@/context/theme';

export type Props = {
  params: {
    shotId: string;
  };
};


  const getShot = async () => {
    return await axios.get<shotData>(
      `http://localhost:3000/api/shots/${params.shotId}`
    );
  };
 


const ShotId = async() => {
  const shot = await getShot();

  // setMessage("Let's chat")
  const likeHandler = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/shot/like/?shot_id=${router.query.shotId}&v_id=${vendor.v_id}`,
        {},
        {
          headers: {
            'Authorization ': `Bearer ${vendor.token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveHandler = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/shot/save/?shot_id=${router.query.shotId}&v_id=${vendor.v_id}`,
        {},
        {
          headers: {
            'Authorization ': `Bearer ${vendor.token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Image
        src={shot?.images[0]?.url ? shot?.images[0]?.url : '/group1/png'}
        alt='bed'
        height={500}
        width={1400}
        className='rounded'
      />
      <div className='my-8 flex justify-between'>
        <div className='flex gap-x-4'>
          <Image
            src={'/girl.png'}
            height={40}
            width={40}
            alt='man dp'
            className='rounded-lg bg-primary '
          />
          <div>
            <h1>{shot?.title}</h1>
            <p className='text-xs text-gray'>{shot?.owner?.name}</p>
          </div>
        </div>
        <div className='flex gap-x-4 '>
          <button
            className='cborder rounded bg-trans px-4 py-2'
            onClick={saveHandler}
          >
            Save
          </button>
          <button
            className='rounded border border-pink-500 bg-trans px-4 py-2'
            onClick={likeHandler}
          >
            <Image
              src={'/pheart.png'}
              alt='heart-icon'
              height={20}
              width={20}
              className='inline'
            />{' '}
            Like
          </button>
        </div>
      </div>

      <div className='my-8 flex items-center justify-center gap-4'>
        <button className='cborder rounded bg-trans px-4 py-2'>
          <Icons.BsChatDots />
        </button>
        <button className='cborder rounded bg-trans px-4 py-2'>
          <Icons.FiFolderMinus />
        </button>
        <button className='cborder rounded bg-trans px-4 py-2'>
          <Icons.BsShareFill />
        </button>
      </div>
      <p className='my-8 w-full border-[0.5px] border-gray' />

      <p>{shot?.description}</p>

      <h2>I am available for new projects</h2>
      <p className='my-2'>
        📪 Email:
        <span className='text-primary'> {shot?.owner?.email}</span>
      </p>
      <p className='mb-2'>
        🎯 Linkedin: <span className='text-primary'>{} 😀</span>
      </p>
      <p className='mb-2'>
        👋 Instagram: <span className='text-primary'> @uxonfire</span>
      </p>

      {/* {shot?.owner?._id === vendor.v_id && (
            <div className='my-8 flex items-center justify-center gap-4'>
              <button className='cborder rounded bg-trans px-4 py-2'>
                Edit
              </button>
              <button className='cborder rounded bg-trans px-4 py-2'>
                Edit Details
              </button>
              <button className='cborder rounded bg-trans px-4 py-2'>
                Delete
              </button>
            </div>
          )} */}
      <div className='flex flex-col items-center justify-items-center gap-y-2 '>
        <div className='grid  grid-cols-12 '>
          <p className='col-span-5 my-8 w-full border-[0.5px] border-gray' />
          <Image
            src={'/girl.png'}
            height={40}
            width={40}
            alt='man dp'
            className='col-span-2 mx-4 rounded-full bg-primary'
          />
          <p className='col-span-5 my-8 w-full border-[0.5px] border-gray' />
        </div>
        <h1>{shot?.owner?.name}</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <button className='rounded bg-primary px-4 py-2'>
          {/* {message ? message : "Let's chat"} */}
        </button>
      </div>

      <div className='mt-4 flex flex-col gap-y-8'>
        <div className='flex justify-between'>
          <p>More from {shot?.owner?.name}</p>
          <p className='cursor-pointer text-primary hover:underline'>
            View Profile
          </p>
        </div>
        <div className='flex gap-4 overflow-x-auto '>
          {/* {moreShot.map((shot, i) => (
              <div key={i} className='mb-4'>
                <Link href={`/designs/${shot._id}`}>
                  <Image
                    src={`${shot.images[0].url}`}
                    alt='l1img'
                    height={250}
                    quality={100}
                    width={270}
                    className='cursor-pointer transition-all duration-200 hover:scale-105 rounded'
                  />
                </Link>
                <div className='flex justify-between px-4 py-2 text-gray'>
                  <span>
                    <BsChatDots className='inline' /> 1.1k
                  </span>
                  <p className='flex gap-4'>
                    <span>
                      <AiOutlineHeart className='inline' /> 1.1k
                    </span>
                    <span>
                      <AiOutlineEye className='inline' /> 1.1k
                    </span>
                  </p>
                </div>
              </div>
            ))}  */}
        </div>
      </div>
    </>
  );
};

export default ShotId;
