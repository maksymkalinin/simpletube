import React from 'react';
import { axios } from '../../utils';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';

function Home (props) {

  const [videos, setVideos] = React.useState([]);
  const [activeVideo, setActiveVideo] = React.useState(null);
  const [firstFilename, setFirstFilename] = React.useState('');

  const getVideos = async() => {
    try {
      const { data: videos } = await axios.get('video');
      if (videos.length) {
        setFirstFilename(videos[0].name);
      }
      setVideos(videos);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getVideos();
  }, [firstFilename])

  return (
    <>
      <main>
        <VideoList
          videos={videos}
          openVideo={setActiveVideo}
        />
      </main>
      <VideoModal
        video={activeVideo}
        handleClose={setActiveVideo.bind(null, null)}
      />
    </>
  )
}

export default Home;