import React, { useState } from 'react'
import Cookies from 'js-cookie';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Upload() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [progress , setProgress] = useState(0);
  const [uploading,setUploading] = useState(false);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', video);
    formData.append('thumbnail', thumbnail);

    try {
      setUploading(true);
      const token = Cookies.get('token')
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
        headers: {
          Authorization : `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: data => {
          setProgress(Math.round((100 * data.loaded) / data.total))
        },
      });

      if (res.status === 200) {
        navigate(`/video/${res.data._id}`)
      }
      setUploading(false);
    } catch (error) {
      console.error(error);
      alert("server error")
      setUploading(false);
    }
  };
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0 text-center">
              <h3 className="text-base font-semibold leading-6 text-fourth p-4">Upload Video</h3>
              <p className="mt-1 text-sm text-fourth p-4">
                This video will be published publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md ">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div>
                    <label htmlFor="Title" className="block text-sm font-medium leading-6 text-gray-900">
                      Title
                    </label>
                    <div className="mt-2">
                    <input className='border-2 rounded-sm border-black border-solid' type="text" name="title" value={title} onChange={handleTitleChange} required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="Title" className="block text-sm font-medium leading-6 text-gray-900">
                      Video
                    </label>
                    <div className="mt-2">
                    <input type="file" name="video" accept="video/*" onChange={handleVideoChange} required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="Title" className="block text-sm font-medium leading-6 text-gray-900">
                      Cover
                    </label>
                    <div className="mt-2">
                    <input type="file" name="thumbnail" accept="image/*" onChange={handleThumbnailChange} required />
                    </div>
                  </div>

                  {uploading ?<div className='flex flex-col p-4 m-4 justify-center gap-4 items-center w-full'>
                    <ProgressBar completed={progress} />
                    <span>Wait until upload....</span>
                    </div> :<button
                  onClick={handleSubmit}
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Publish Video
                  </button>}
                </div>
              </div>
            </form>
          </div>
        </div>
  )
}

export default Upload