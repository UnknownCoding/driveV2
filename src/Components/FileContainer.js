import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import styled from 'styled-components'
import { fileState } from './atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const FileContainer = ({title , id}) => {
    const [file,setFile] = useRecoilState(fileState)
    const navigate = useNavigate()
    return (
        <Container onClick={()=>{
            setFile({id:id,title:title})
            navigate(`/folder/${title}/${id}`)
        }}>
            <FolderIcon/>
            <span>{title}</span>
        </Container>
    )
}

export default FileContainer

const Container = styled.div`

    width: 287.5px;
    height: 48px;
    display: flex ;
    align-items: center;
    border: 1px solid rgba(0,0,0,0.35);
    border-radius:4px;

    svg{
        height: 24px;
        width: 24px;
        color:rgba(95, 99 , 104);
        margin-left: 4px;
    }
    
    span{
        font-size: 13px;
        margin-left:10px;
        text-transform: capitalize;
    }
`
