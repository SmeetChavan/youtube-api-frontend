import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import badge from '../assets/badge.png';
import view from '../assets/view.png';
import like from '../assets/like.png';
import alt_image from '../assets/alt_image.png';
import comment from '../assets/comment.png';
import { useData } from '../context/data';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const [data , setData] = useData();
  const [earning , setEarning] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {

    if(!data){
      toast.error("Enter link again!");
      navigate("/");
      return;
    }

    setEarning(Math.min(data.subscribers , data.views) + (10 * data.comments) + (5 * data.likes));

  }, [])

  return (
    <div>

      <NavBar/>

      {
        data &&

          <section className='bg-[#1E1E1E] sm:mx-24 flex flex-wrap justify-around gap-4 items-center px-10 py-8 rounded-xl max-lg:flex-col max-lg:gap-20'>

            <div className='flex flex-col gap-6'>

              <div className='bg-[#707070] flex gap-2 px-4 py-2 rounded-md max-w-[200px]'>

                <img 
                  src={badge}
                  alt="badge"
                  width={20}
                  height={20}
                  className='object-contain'
                />

                <h3>Top earner video</h3>

              </div>

              <img 
                src={data.thumbnail} 
                alt={alt_image}
                width={250}
                height="auto"
                className='object-contain rounded-xl' 
              />

              <div className='text-[#8E8E8E] tracking-wide'>
                Uploaded on - {new Date(data.uploadedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>

            </div>

            <div className='flex flex-col gap-3'>

              <h2 className='text-2xl font-semibold max-w-lg'>{data.title}</h2>

              <div className='flex gap-2'>

                <img
                  src={view}
                  alt="view"
                  width={20}
                  height={20}
                  className='object-contain'
                />

                <p className='text-[#8E8E8E] text-lg'>
                  {data.views}
                </p>

              </div>

              <div className='flex gap-2'>

                <img 
                  src={like}
                  alt="like"
                  width={20}
                  height={20}
                  className='object-contain'
                />

                <p className='text-[#8E8E8E] text-lg'>
                  {data.likes}
                </p>

              </div>

              <div className='flex gap-2 mt-1'>

                <img 
                  src={comment}
                  alt="comment"
                  width={20}
                  height={20}
                  className='object-contain'
                />

                <p className='text-[#8E8E8E] text-lg'>
                  {data.comments}
                </p>

              </div>

            </div>

            <div className='bg-[#282828] px-16 py-7 flex flex-col gap-3 rounded-xl'>

              <p className='sm:text-[2.5rem] text-[2rem] font-bold whitespace-nowrap'>₹ {earning}</p>

              <button className='bg-white rounded-xl p-2'>
                blank
              </button>

            </div>

          </section>
      }

    </div>
  )
}

export default Dashboard