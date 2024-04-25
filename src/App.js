import Frontpage from './frontpage';
import React, { useState } from 'react';
import Heartbeat from './heartbeat';
import logo from './logo.svg';
import VideoPlayer from './video';


const App = () => {
  const [playVideo, setPlayVideo] = useState(false);

  const startVideoPlayback = () => {
    setPlayVideo(true);
  };

  return (
    <div>
      <Frontpage onStartVideoPlayback={startVideoPlayback} />
      <Heartbeat/>
      <VideoPlayer playVideo={playVideo} />
    </div>
  );
};


export default App;
