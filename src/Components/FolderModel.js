import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { folderState, modalState, photoState } from './atoms/modalAtom'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { addDoc, collection, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const FolderModel = () => {
    const [folderOpen,setFolder] = useRecoilState(folderState)
    const [open,isOpen] = useRecoilState(modalState)
    const [photoOpen,setPhoto] = useRecoilState(photoState)
    const [input, setInput] = useState('')
    const [selectedPhoto,setSelectedPhoto] = useState(null)
    const [loadings,setLoadings] = useState(false )
    const ImageRef= useRef()
    const [user, loading, error] = useAuthState(auth);
    const [options,setOptions] = useState([])
    const [optionType,setOptionType] = useState("Default")

    console.log(optionType)
    useEffect(()=>{
        return onSnapshot(collection(db,'users',user.uid,'folder'),(snapshot)=>{
            setOptions(snapshot.docs)
        })
    },[db])

    const checker =  ()=>{
        console.log("checkiin")
        if(photoOpen && folderOpen){
            uploadPhoto()
        }else{
            uploadFile()
        }
    }

    const selectedFiled = (e)=>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload=(readerEvent)=>{
            setSelectedPhoto(readerEvent.target.result);
        };
    }

    const uploadPhoto = async ()=>{
        console.log("YESSS IT WORKRRKKRKRKS")
        if(loadings || !input.trim() || !input.length)return
        setLoadings(true)

        if(optionType === "Default" ){

            const docRef=await addDoc(collection(db,'users',user.uid,'images'),{
                username:user.displayName,
                photoTitle:input,
                profileImg:user.photoURL,
                timestamp: serverTimestamp()
            })
    
            console.log("New Doc Added with ID",docRef.id);
            const imageRef = ref(storage,`users/${docRef.id}/image`)
            await uploadString(imageRef,selectedPhoto,'data_url').then(async snapshot=>{
                const downloadURL= await getDownloadURL(imageRef)
                await updateDoc(doc(db,'users',user.uid,'images',docRef.id),{
                    image:downloadURL
                })
            });                 
            setLoadings(false)
            setInput("")
            setFolder(false)
            setPhoto(false)
            setSelectedPhoto(null)
        }else{
            const docRef=await addDoc(collection(db,'users',user.uid,'folder',optionType,'files'),{
                username:user.displayName,
                photoTitle:input,
                profileImg:user.photoURL,
                timestamp: serverTimestamp()
            })
            const imageRef = ref(storage,`users/${docRef.id}/image`)
            await uploadString(imageRef,selectedPhoto,'data_url').then(async snapshot=>{
                const downloadURL= await getDownloadURL(imageRef)
                await updateDoc(doc(db,'users',user.uid,'folder',optionType,'files',docRef.id),{
                    image:downloadURL
                })
            });                 
            setLoadings(false)
            setInput("")
            setFolder(false)
            setPhoto(false)
            setSelectedPhoto(null)
        }
    }


    const uploadFile = async ()=>{
        console.log("UPLOADED A FILE ")
        if(loadings) return;
        if(input){
            setLoadings(true)
            console.log('on the process')
            await addDoc(collection(db,"users",user.uid,"folder"),{
                name:input,
                timestamp:serverTimestamp(),
                uid:user?.uid
            })
            console.log('deadlock')
        }
        
        setLoadings(false)
        setInput("")
        setFolder(false)
        setPhoto(false)


    }   

    return (
    <Container >
        <Wrapper bool={photoOpen}>
            {photoOpen ? (
                null
            ):(
                <Title> {photoOpen ? ("New Photo"):("New Folder")} </Title>
            )}
            {photoOpen ? ( 
                <ContentContainer>
                    <ImageContainer>
                        {selectedPhoto ? (
                            <img src={selectedPhoto} onClick={()=>{setSelectedPhoto(null)}} alt=''/>
                        ) : (
                            <CameraContainer>
                                <CameraAltIcon onClick={()=> ImageRef.current.click()}/>
                            </CameraContainer>
                        )}
                        <input type='file' hidden onChange={selectedFiled} ref={ImageRef}/>
                    </ImageContainer>
                    <TextContainer>
                        <input type='text' placeholder='Enter A Photo Name' disabled={loadings} value={input} onChange={(e)=> setInput(e.target.value)}/>
                    </TextContainer>
                    <OptionList>
                        {options.length ? (
                            <select onChange={(e)=>{setOptionType(e.target.value)}}>
                                <option value='FullDefault'>Default</option>
                                {options.map((data)=>(
                                    <option value={data.id} >{data.data().name}</option>
                                ))}
                            </select>
                        ):(
                            <select onChange={(e)=>{setOptionType(e.target.value)}}>
                                <option value='FullDefault'>Default</option>  
                            </select>
                        )}
                    </OptionList>
                </ContentContainer>

            ) : (
                <InputContainer>
                    {photoOpen ? (<input type='file' placeholder='Pick A File'/>):(<input type='text'  disabled={loadings} onChange={(e)=>setInput(e.target.value)}placeholder='Folder Name'/>)}
                </InputContainer>
            )}
            <Button>
                <button onClick={()=>{
                    setFolder(false)
                    isOpen(false)
                    setPhoto(false)
                }}>Cancel
                
                </button>
                <button onClick={()=> checker()} disabled={loadings} className='create'>{photoOpen ?  ("Upload Photo") : ("Create Folder") }</button>
            </Button>
        </Wrapper>
    </Container>
    )
}

export default FolderModel

const OptionList = styled.div`
    select{
        margin-left: 20px;
        margin-top: 20px;
        width: 100px;
        height: 20px;
    }   
`


const Container = styled.div`
    z-index: 100;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 500px;
    height:${(props)=> props?.bool ? `400px` : `130px` };
    background-color: white;
    border-radius: 20px;
    position: relative;
`
const InputContainer = styled.div`
    display: flex;
    flex: 1;
    margin: 20px;
    input{
        border: none;
        flex: 1;
        :focus{
            outline: none;
        }
    }
    border-bottom: 1px solid rgba(0,0,0,0.2);
`
const Button = styled.div`
    position: absolute;
    bottom: 5px;
    right: 10px;
    display: flex;
    align-items: center;
    button{
        padding: 10px 20px;
        border-radius: 4px;
        background-color: #ef4444;
        border: none;
        color: white;
        margin: 0 15px;
        cursor: pointer;
        :focus{
            outline: none;
        }
    }
    .create{
        background-color: #3b82f6;
    }
`
const Title = styled.div`
    font-size: 20px;
    margin: 20px;
`
const ImageContainer = styled.div`
    height: 50%;
    margin-bottom: 20px;
    width: 100%;
    img{
        width: 100%;
        height: 100%;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        object-fit: cover;
    }
`
const ContentContainer = styled.div`
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
`
const CameraContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;

`

const TextContainer = styled.div`
    flex: 1;
    border-bottom: 1px solid black;
    margin: 0 20px;
    margin-top: 27px;
    input{
        display: flex;
        border: none;
        font-size: 20px;
        text-transform: capitalize;
        width: 100%;
        border: none;
        :focus{
            outline: none;
        }
    }


`


