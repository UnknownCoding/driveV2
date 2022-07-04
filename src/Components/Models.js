import React from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import styled from 'styled-components'
import { useRecoilState } from 'recoil';
import { folderState, modalState, photoState } from './atoms/modalAtom';
import FolderModel from './FolderModel';

const Models = () => {
    const [open,isOpen] = useRecoilState(modalState)
    const [folderOpen,setFolder] = useRecoilState(folderState)
    const [photoOpen,setPhoto] = useRecoilState(photoState)

    return (
        <Container bool={open}>
            <Wrapper>
                <Header>
                    <Wraps onClick={()=>{setFolder(true)}} >
                        <CreateNewFolderIcon />
                        <span>Folder</span>
                    </Wraps>
                </Header>
                <Header>
                    <Wraps onClick={()=>{setFolder(true); setPhoto(true)}}>
                        <AddPhotoAlternateIcon/>
                        <span>Photo</span>
                    </Wraps>
                </Header>
            </Wrapper>
        </Container>
    )
}

export default Models

const Container = styled.div`
    position: fixed;
    top: 100px;
    left: 20px;
    background-color: white;
    height: 200px;
    width: 300px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),0 2px 4px -2px rgb(0 0 0 /0.1);
    transition: all 300ms ease-in-out;
    transform: ${(props)=> props?.bool ? `translateX(-0%)` : `translateX(-200%)` };
    
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

`
const Header = styled.div`
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    margin: 5px 0;

`
const Wraps = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;
    padding-left: 20px;
    margin-top: 20px;
    transition: all 200ms;
    :hover{
        background-color: rgba(0,0,0,0.2);
    }
    svg{
        color: rgba(0,0,0,0.5);
    }
    span{
        margin-left: 10px;
    }
`


