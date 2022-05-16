import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import ImagePage from '../IndexPage/IndexPage';
import ImageCorrections from '../ImageCorrections/ImageCorrections';
import NavBar from '../../components/NavBar/NavBar';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import WebcamComponent from '../../components/WebcamComponent/WebcamComponent';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service'
import ImgPreview from '../ImgPreview/ImgPreview';
import ImageCorrectionsSkeleton from '../../components/ImageCorrectionsSkeleton/ImageCorrectionsSkeleton';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [imgSrc, setImgSrc] = useState(null);
  
  return (
    <main className='App'>
      {user ?
          <>
            {/* <NavBar user={user} setUser={setUser}/> */}
            {/* <ResponsiveDrawer user={user} setUser={setUser}/> */}
            <Routes>
              <Route path="/" element={<ImagePage user={user} setUser={setUser}/>} />
              <Route path="/load/corrections" element={<ImageCorrectionsSkeleton />} />
              <Route path="/corrections/:imageId" element={<ImageCorrections setUser={setUser} />} />
              <Route path="/webcam" element={<WebcamComponent imgSrc={imgSrc} setImgSrc={setImgSrc} />} />
              <Route path="/preview" element={<ImgPreview imgSrc={imgSrc} />} />
            </Routes> 
          </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}


