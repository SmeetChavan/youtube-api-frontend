import { useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios'

const PortalForm = ({handleClose}) => {

  const [name , setName] = useState("");
  const [phone , setPhone] = useState("");
  const [address , setAddress] = useState("");

  const [loading , setLoading] = useState(false);

  const handleOnClose = (e) => {

    if(e.target.id === 'container') handleClose();
  }

  const handleRequest = async () => {

    if(loading){
      return;
    }
    
    if(!name || !phone || !address){
      return toast.error("No empty fields allowed");
    }
    
    if(phone.length !== 10){
      return toast.error("Only Indian numbers allowed without prefix");
    }
    
    try {

      setLoading(true);

      toast.loading("Requesting..");
      const response = await axios.post("https://send-email-backend-one.vercel.app/sendemail" , {
        name,
        phone,
        address
      });

      toast.dismiss();
      toast.success("Request Sent!");

      setName("");
      setPhone("");
      handleClose();

    } catch (error) {
      toast.dismiss();
      toast.error("An error occured");
      console.log(error);
      // console.log(error.response.data);
    }
    finally{
      setLoading(false);
    }
  }

  return (

    <div id="container" onClick={handleOnClose} className='text-white fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>

      <div className='bg-[#1b1a1a] px-10 py-8 rounded sm:w-[400px]'>

        <h3 className='text-xl mb-10 text-center'>
          Request a call back
        </h3>

        <div className='flex flex-col gap-3 mb-7'>

          <div>
            <input type="text" placeholder="Enter Name" className='p-2 bg-transparent rounded-md border border-slate-500 focus:outline-none w-full' value={name} onChange={(e) => setName(e.target.value)}  />
          </div>
          <div>
            <input type="number" placeholder="Mobile number" className='p-2 bg-transparent rounded-md border border-slate-500 focus:outline-none w-full' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <input type="email" placeholder="Email address" className='p-2 bg-transparent rounded-md border border-slate-500 focus:outline-none w-full' value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

        </div>

        <div className='bg-white text-black rounded-2xl px-2 py-2 text-center' onClick={handleRequest}>
          <button disabled={loading}>Request a call back</button>
        </div>

      </div>

    </div>
  )
}

export default PortalForm