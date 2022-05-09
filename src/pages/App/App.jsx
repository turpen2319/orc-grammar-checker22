import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import ImageIndex from '../ImageIndex/ImageIndex';
import ImageCorrections from '../ImageCorrections/ImageCorrections';
import NavBar from '../../components/NavBar/NavBar';
import WebcamComponent from '../../components/WebcamComponent/WebcamComponent';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service'
import ImgPreview from '../ImgPreview/ImgPreview';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [imgSrc, setImgSrc] = useState(null);

  return (
    <main className='App'>
      {user ?
          <>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/" element={<ImageIndex />} />
              <Route path="/corrections/:id" element={<ImageCorrections />} />
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


