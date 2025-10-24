import React, { useContext } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import StoryContext from '../context/StoryContext';
import { Download, Share2 } from 'lucide-react';

const VideoPage = () => {
  const { story } = useContext(StoryContext);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Your Magical Video</h1>
      <VideoPlayer videoUrl={story?.videoUrl} />
      {story?.videoUrl && (
        <div className="flex justify-center space-x-4 mt-6">
          <a
            href={story.videoUrl}
            download
            className="bg-primary text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-all flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Download</span>
          </a>
          <button className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-all flex items-center space-x-2">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
