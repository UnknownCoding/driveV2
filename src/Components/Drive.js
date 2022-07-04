import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Filelist from './Filelist';
import FileContainer from './FileContainer';
import { useRecoilState } from 'recoil';
import { modalState } from './atoms/modalAtom';
import { folderState, photoState } from './atoms/modalAtom';
import { auth, db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Drive = () => {
    const [open,isOpen] = useRecoilState(modalState)
    const [folderOpen,setFolder] = useRecoilState(folderState)
    const [photoOpen,setPhoto] = useRecoilState(photoState)
    const [user, loading, error] = useAuthState(auth);
    const [images,setImages] = useState([])
    const [folders,setFolders] = useState([])

    useEffect(()=>{     
        return onSnapshot(query(collection(db,"users",user.uid,"folder"),orderBy('timestamp','desc')),(snapshot) =>{
            setFolders(snapshot.docs)
        }); 
        },[db]);

    
    useEffect(()=>{
        return onSnapshot(collection(db,'users',user.uid,'images'),orderBy('timestamp','desc'),(snapshot) =>{
            setImages(snapshot.docs)
        }); 
        },[db]);

    return (
    <Container onClick={()=>{isOpen(false); setFolder(false)}}>
        <Title>
            <span> My Drive</span>
            <ArrowDropDownIcon/>
        </Title>
        <FileContent>
            <SemiTitle> Suggested</SemiTitle>
            <GridContent>
                {images?.map((data)=>(
                    <Filelist key={data?.id} img={data?.data()?.image} title={data?.data()?.photoTitle} id={data.id} />
                ))}
            </GridContent>
            <Margin>
                <SemiTitle>Folders</SemiTitle>
                <GridContent>
                    {folders?.map((folder)=>(
                        <FileContainer key={folder.id} title={folder?.data()?.name} id={folder.id}/>
                    ))}
                </GridContent>
            </Margin>
        </FileContent>
    </Container>
)
}

export default Drive

const Margin = styled.div`
    
`


const GridContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3,minmax(0,1fr));
    margin: 20px ;
    margin-left: 1px;
`

const Container = styled.div`
    display: flex;
    flex:1;
    position: relative;
    flex-direction: column;
    padding: 15px 30px;
    width: 100%;

`
const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0,  0, 0.2 );
    padding-bottom: 13px;
    svg{
        margin-left: 10px;
        color: #5f6368;
    }
    span{
        font-family:Google Sans , Roboto , RobotoDraft , Arial, Helvetica, sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: #202124;
    }

`

const FileContent = styled.div`
    display:flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 30px;
    max-height: 100vh;
    overflow-y: scroll;
    padding-top: 20px;

::-webkit-scrollbar {
    width: 15px;
    }

/* Track */
::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.2);
    border-radius: 20px;
    }

/* Handle */
::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 20px;
    transition: all 200ms ease-out;
    max-height: 100px;
    :hover{
        background-color: rgba(0,0,0,0.3);
    }
}


`
const SemiTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
    color: #5f6368;

`

