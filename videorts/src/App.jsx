import React, { useState,useRef } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const startVideoStream = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/video-stream');
      const stream = await response.blob();
      const videoObject = URL.createObjectURL(stream);

      if (videoRef.current) {
        videoRef.current.src = videoObject;
      }
    } catch (error) {
      console.error('Error fetching video stream:', error);
    }
  };

  return (
    <div>
      <h1>Video File Upload</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>
      <div>
      <h1>Video Streaming</h1>
      <video ref={videoRef} controls width="640" height="360" autoPlay poster='video' muted >
        Your browser does not support the video tag.
      </video>
      <button onClick={startVideoStream}>Start Video Stream</button>
      </div>
    </div>
  );
}

export default App;
