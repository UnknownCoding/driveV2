import './App.css';
import styled from 'styled-components'
import Header from './Components/Header';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Sidebar from './Components/Sidebar';
import Drive from './Components/Drive';
import Models from './Components/Models';
import { useRecoilState } from 'recoil';
import { finalState, folderState, modalState } from './Components/atoms/modalAtom';
import FolderModel from './Components/FolderModel';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from './Components/Login';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import Finalmodal from './Components/Finalmodal';
import Folder from './Components/Folder';

function App() {
  const [folderOpen,setFolder] = useRecoilState(folderState)
  const [user, loading, error] = useAuthState(auth);
  const [openFinal ,isOpenFinal] = useRecoilState(finalState)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
          const usersRef=doc(db,'users',user.uid)
          setDoc(usersRef,{
            id:user.uid,
            email:user.email,
            profileImg:user.photoURL,
            lastseen: serverTimestamp()
            },{merge:true})
    }});
    
  },[user])

  return (
    <Router>
      <Header/>
      {user ? (
        <Container>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Drive/>}/>
            <Route path='/folder/:name/:id' element={<Folder/>}/>
          </Routes>
          <Models/>
          {folderOpen && <FolderModel/>}
          {openFinal && <Finalmodal/> }
        </Container>
      ):(
        <Login/>
      )}
    </Router>
  );
}

export default App;

const Container = styled.div`
  display: flex;
`
