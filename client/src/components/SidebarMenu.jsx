import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { Link } from 'react-router-dom';


function SidebarMenu({setCategory}) {
  return (
    <div className=' flex w-full flex-row items-start md:flex-col justify-evenly md:items-start  mt-10 md:mt-20 md:mb-4 z-20'>
  
      <button onClick={()=>{setCategory('treading')}} 
        className="md:ml-10  text-third mt-5 p-0 cursor-pointer hover:scale-125 hover:text-first flex flex-row gap-1"
      >
        <span className=' mr-3'>
        <WhatshotIcon/>
        </span>
        <span className='hidden md:block'>
          Treading
        </span>
      </button>
      <button onClick={()=>{setCategory('following')}} 
        className="md:ml-10  text-third mt-5 p-0 cursor-pointer hover:scale-125 hover:text-first flex flex-row gap-1"
      >
        <span className=' mr-3'>
        <VideoLibraryIcon/>
        </span>
        <span className='hidden md:block'>
          Following
        </span>
      </button>
      <button onClick={()=>{setCategory('yours')}}
        className="md:ml-10  text-third mt-5 p-0 cursor-pointer hover:scale-125 hover:text-first flex flex-row gap-1"
      >
        <span className=' mr-3'>
        <VideoCameraFrontIcon/>
        </span>
        <span className='hidden md:block'>
          Yours
        </span>
      </button>

      
  
    </div>
  )
}

export default SidebarMenu