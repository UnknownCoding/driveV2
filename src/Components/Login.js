import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {
    const signIn =()=>{
        signInWithPopup(auth,provider)
    }
    return (
        <Container>
            <Button onClick={signIn}>
                Sign in with google
            </Button>
        </Container>
    )
}

export default Login

const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Button = styled.button`
    font-weight: 500;
    padding: 15px 20px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
    transition: all 200ms ease-in-out;
    :hover{
        transform: scale(1.09) ;
        font-weight: bold;
    }
`   
