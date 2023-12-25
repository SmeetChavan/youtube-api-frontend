import React, { useState } from 'react'
import NavBar from './NavBar'
import play from '../assets/play.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useData} from '../context/data.jsx';
import {useNavigate} from 'react-router-dom';

const Home = () => {

  const [url , setUrl] = useState("");
  const [data , setData] = useData();

  const navigate = useNavigate();

  const extractVideoId = (url) => {

    try{

      const urlObject = new URL(url);

      if(urlObject.hostname.includes('youtube.com') || urlObject.hostname.includes('youtu.be')) {

        const searchParams = new URLSearchParams(urlObject.search);

        if (urlObject.hostname.includes('youtu.be')){

          return urlObject.pathname.substring(1); // Return the video ID from the pathname
        }
        else{

          return searchParams.get('v'); // Return the 'v' query parameter (video ID)
        }

      }
      else{
        return null;
      }
    } catch(error){
      console.error('Error extracting video ID:', error);
      return null;
    }
  }

  const handleSubmit = async() => {

    try {

      const videoId = extractVideoId(url);
      if(!videoId){
        return toast.error("Invalid Link");
      }


      const statisticsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${import.meta.env.VITE_API_KEY}`;
      const snippetUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${import.meta.env.VITE_API_KEY}`;


      toast.loading("Fetching...")
      const response = await axios.get(statisticsUrl);
      const response1 = await axios.get(snippetUrl);
      
      const channelId = response1.data.items[0].snippet.channelId;

      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${import.meta.env.VITE_API_KEY}`;

      const response2 = await axios.get(channelUrl);

      toast.dismiss();
      toast.success("Data fetched");

      navigate('/dashboard');

      setData({
        views: response.data.items[0].statistics.viewCount,
        likes: response.data.items[0].statistics.likeCount,
        comments: response.data.items[0].statistics.commentCount,
        thumbnail: response1.data.items[0].snippet.thumbnails.default.url,
        title: response1.data.items[0].snippet.title,
        uploadedAt: response1.data.items[0].snippet.publishedAt,
        subscribers: response2.data.items[0].statistics.subscriberCount
      });

      // console.log(response.data);
      // console.log(response1.data);
      // console.log(response2.data);

    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  }

  return (
    <>

        <NavBar/>

        <div className=' mt-14'>

          <div className='flex flex-col justify-center items-center gap-10 text-center'>

            <h1 className='text-5xl font-bold max-w-lg leading-normal'>Discover your earning potential</h1>

            <h3 className='text-xl text-slate-300 max-w-lg leading-normal'>Turn your Youtube expertise into a lucrative income through resource sharing</h3>

            <div className='flex flex-1 justify-center items-center gap-3'>

              <div className='flex flex-1 justify-center items-center gap-2 border px-5 py-2 rounded-3xl lg:min-w-full'>

                <img
                  src={play}
                  alt="youtube"
                  width={25}
                  height={25}
                  className='object-contain'
                />

                <input type="text" placeholder='Enter youtube video link' className='bg-black focus:outline-none w-full text-sm placeholder:text-slate-500' value={url} onChange={(e) => setUrl(e.target.value)} />

              </div>

              <div className='bg-[#FF2020] rounded-3xl'>
                <button onClick={handleSubmit} className='px-12 py-2'>Submit</button>
              </div>

            </div>

          </div>
          
        </div>

    </>
  )
}

export default Home