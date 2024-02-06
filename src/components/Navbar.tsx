import React, {useState} from 'react';

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      <div className='top-0 left-0 w-full bg-gray-800 text-white z-40'>
        <div className='flex justify-between items-center p-4'>
          <div className='text-lg font-bold'>Toolage</div>
          <button
            id='hamburger-btn'
            className='flex items-center justify-center h-10 w-10 rounded-full'
            onClick={toggleNavbar}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'></path>
            </svg>
          </button>
        </div>
      </div>

      <nav
        id='side-navbar'
        className={`bg-gray-800 text-white h-full fixed w-64 transition-transform transform ${
          isNavVisible ? 'translate-x-0' : '-translate-x-64'
        } z-30`}>
        <div className='flex flex-col h-full justify-start'>
          <a href='/match-back' className='hover:bg-gray-700 py-2 px-4 rounded mb-2'>
            Matchback Tool
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
