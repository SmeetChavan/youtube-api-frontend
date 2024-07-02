import React, { useState } from 'react'
import logo from '../assets/logo-2.jpeg';
import phone from '../assets/phone.png';
import {useLocation , useNavigate} from 'react-router-dom';
import PortalForm from './PortalForm';

const NavBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [showPortal , setShowPortal] = useState(false);

    const handleClose = () => {
        setShowPortal(false);
    }
    const handleOpen = () => {
        setShowPortal(true);
    }

    const handleNav = () => {
        navigate('/');
    }

  return (
    <>

        <div className='sm:mx-24 mx-4 my-9'>

            <div className='flex justify-between max-sm:flex-col max-sm:gap-10'>

                <div className='flex gap-1 justify-center items-center hover:cursor-pointer' onClick={handleNav}>

                    <img
                        src={logo}
                        alt="Logo"
                        width={60}
                        height={60}
                        className='object-contain'
                    />

                    <div className='flex gap-2'>
                        <h1 className='text-3xl'>Smeet</h1>
                        <div>
                            <h2 className='border rounded-md bg-[#CCCCCC] text-black text-xs p-[1px]'>Beta</h2>
                        </div>
                    </div>

                </div>

                <div className={`flex items-center justify-center gap-2 border border-slate-400 px-4 py-2 rounded-xl hover:cursor-pointer ${location.pathname.includes("dashboard") ? "" : "hidden"} max-w-md max-sm:mx-auto`} onClick={handleOpen}>

                    <img
                        src={phone}
                        alt="Phone"
                        width={15}
                        height={15}
                        className='object-contain'
                    />

                    <h3>Request a call back</h3>

                </div>

            </div>

        </div>

        {showPortal && <PortalForm handleClose={handleClose} />}

    </>
  )
}

export default NavBar