import React from 'react'
import styled from 'styled-components'
import SidebarList from './SidebarList'
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRecoilState } from 'recoil';
import { modalState } from './atoms/modalAtom';
const Sidebar = () => {
    const [open,isOpen] = useRecoilState(modalState)
    return (
    <Container>
        <Wrapper>
            <NewChannel onClick={()=>{isOpen(true)}}>
                <img src='https://cdn-icons-png.flaticon.com/512/747/747944.png'/>
                <span>New</span>
            </NewChannel>
            <Cont>
                <SidebarList title='title' Icon={<TabletAndroidIcon/>}/>
                <SidebarList title='computer' Icon={<ComputerIcon/>}/>
                <SidebarList title='shared with me' Icon={<PeopleIcon/>}/>
                <SidebarList title='recent' Icon={<AccessTimeFilledIcon/>}/>
                <SidebarList title='starred' Icon={<StarIcon/>}/>
                <SidebarList title='Bin' Icon={<DeleteIcon/>}/>
                <Underline/>
                <SidebarList title='Storage' Icon={<CloudIcon/>}/>

            </Cont>
        </Wrapper>
    </Container>
    )
}

export default Sidebar

const Cont = styled.div`

`


const Underline = styled.hr`
    border-bottom: 1px solid rgba(0,0,0,0.1);
    width: 100%;
    fill: #5f6368;

`

const Container = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 10px;
    overflow-y: scroll;

`

const Wrapper = styled.div`
    display: flex ;
    flex-direction: column;


`

const NewChannel = styled.div`
    width: 118px;
    height: 48px;
    background-color: white;
    border-radius: 24px;
    padding: 2px;
    display: flex;
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 01);
    transition: all 200ms ease-out;

    &:hover{
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) ;
    }

    span{
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-top: 12px;
    }

    img{
        width: 40px;
        height: 36px;
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 5px;
    }


`
