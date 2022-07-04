import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import { fileState } from './atoms/modalAtom'
import Filelist from './Filelist'

const Folder = () => {
    const [file,setFile] = useRecoilState(fileState)
    const [image ,setImage] = useState([])
    const [user, loading, error] = useAuthState(auth);

    useEffect(()=>{
        return onSnapshot(collection(db,'users',user.uid,'folder',file.id,'files'),(snapshot)=>{
            setImage(snapshot.docs)
        })
    },[])

    return (
    <Container >
        <GridContainer>
            {image.map((data)=>(
                <Filelist key={data?.id} img={data?.data()?.image} title={data?.data()?.photoTitle} id={data.id} />
            ))}
        </GridContainer>
    </Container>
    )
}

export default Folder
const Container = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    padding: 15px 30px;
    flex-direction: column;

`
const GridContainer = styled.div`
    display:grid ;
    grid-template-columns: repeat(3,minmax(0,1fr));
    margin: 20px 0 ;
`


