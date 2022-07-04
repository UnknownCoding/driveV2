import React from 'react'
import styled from 'styled-components'
import ImageIcon from '@mui/icons-material/Image';
import { useRecoilState } from 'recoil';
import { finalState, imgState } from './atoms/modalAtom';

const Filelist = ({img,title,id}) => {
    const [openFinal ,isOpenFinal] = useRecoilState(finalState)
    const [ids ,isIds] = useRecoilState(imgState)

    return (
        <Container onClick={()=>{
            isOpenFinal(true);
            isIds({id:id,imgUrl:img,text:title})}}>
            <PhotoContainer>
                <img src={img}/>
            </PhotoContainer>
            <PhotoTitle>
                <ImageIcon/>
                <span>{title}</span>
            </PhotoTitle>
        </Container>
        
    )
}

export default Filelist

const Container = styled.div`
    cursor: pointer;
    max-width: 300px;
    max-height: 400px;
    height: 209px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    margin: 10px 0 ;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),0 2px 4px -2px rgb(0 0 0 /0.1);

`
const PhotoContainer = styled.div` 
    background-color: lightgray;
    height: 60%;
    width: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;

    img{
        height: 100%;
        width: 100%;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        object-fit: cover;
        border-bottom:1px solid rgba(0,0,0,0.2);
    }

`
const PhotoTitle = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-left: 10px;
    svg{
        color:#70b5f9
    }
    span{
        color: rgba(0,0,0,0.72);
        margin-left: 15px ;
        padding-bottom: 2px;
        font-size: 13px;
        font-weight: 600;
    }

`
