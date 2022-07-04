import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { finalState, imgState } from './atoms/modalAtom'

const Finalmodal = () => {
    const [openFinal ,isOpenFinal] = useRecoilState(finalState)
    const [id ,isId] = useRecoilState(imgState)
    return (
        <Container onClick={()=>{isOpenFinal(false)}}>
            <Cont>
                <Wrappertext>
                    <h1>{id.text}</h1>
                </Wrappertext>
                <Wrapperimg>
                    <img src={id.imgUrl}/>
                </Wrapperimg>
            </Cont>
        </Container>
    )
}

export default Finalmodal

const Wrappertext = styled.div`
    h1{
        color: white;
    }
`
const Cont = styled.div`
    display: flex;
    flex-direction:column;
    /* margin-left: 200px; */
    align-items: center;
`

const Wrapperimg = styled.div`
    width: 800px;
    height: 400px;
    margin-bottom: 100px;
    img{
        width: 100%;
        height: 100%;
    }
`

const Container = styled.div`
    z-index: 1000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;

`
