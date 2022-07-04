import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';
import { useRecoilState } from 'recoil';
import { modalState } from './atoms/modalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';



const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    console.log(user)
    const [open,isOpen] = useRecoilState(modalState)
    return (
    <Container onClick={()=>{isOpen(false)}}>
        <Wrapper>
            <Logo>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/512px-Google_Drive_icon_%282020%29.svg.png?20201021201920" alt='' className='svg'/>
                <span>Drive</span>
            </Logo>
            <InputContainer>
                <SearchContainer>
                    <Buttongroup>
                        <SearchIcon/>
                    </Buttongroup>
                    <input type="text" placeholder='Search Your Drive!'/>
                </SearchContainer>
            </InputContainer>
            <RightContiner>
                <Left>
                    <HelpIcon />
                    <SettingsIcon />
                </Left>
                <Right>
                    <AppsIcon className='svg'/>
                    <Avatarr className='svg' src={user?.photoURL} onClick={()=>{signOut(auth)}}/>
                </Right>
            </RightContiner>
        </Wrapper>
    </Container>
    )
}

export default Header

const Avatarr = styled(Avatar)`
    cursor: pointer;

`

const Buttongroup = styled.div`

`

const Right = styled.div`
    display: flex;
    align-items: center;
    svg{
        color: #5f6368;
        padding: 5px;
        cursor: pointer;
        transition: all 200ms ease-out;
        :hover{
            background-color: rgba(0,0,0,0.09);
        }
    }

`

const Left = styled(Right)`
    margin-right: 40px;
    svg{
        margin: 0 10px;
    }

`


const SearchContainer = styled.div`
    display: flex;
    width: 64%;
    /* height: 50%; */
    margin: 0 auto;
    align-items: center;
    background-color: rgba(0,0,0,0.09);
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 /0.05);
    padding-top: 10px;
    padding-bottom: 10px;

    svg{
        margin-top: 2px;
        margin-left: 10px;
        color: #5f6368;
    }

    input{
        width: 90%;
        height: 30px;
        font-family: Sans,Robot,RobotDraft, Arial, Helvetica, sans-serif;
        margin: 0 auto;
        background-color: transparent;
        :focus{
            outline: none;
        }
        border: none;
    }
`


const RightContiner = styled.div`
    display: flex;
    align-items: center;


`


const InputContainer = styled.div`
    flex:1;

`


const Logo = styled.div`
    display: flex;
    align-items: center;
    img{
        width: 40px;
        height: 40px;
    }
    span{
        font-family: "Product Sans",Arial, sans-serif;
        color: #5f6368;
        line-height: 24px;
        font-size: 22px;
        padding-left: 6px;
    }

`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px;

`


const Container = styled.div`
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: #ffffff;
    padding: 2px;
    border-bottom: 1px solid rgba(0,0,0,0.2);

`
