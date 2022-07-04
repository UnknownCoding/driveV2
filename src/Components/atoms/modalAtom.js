import { atom } from "recoil";

export const modalState=atom({
    key:'modalState',
    default: false,
})
export const folderState=atom({
    key:'folderState',
    default: false,
})
export const photoState=atom({
    key:'photoState',
    default: false,
})

export const finalState=atom({
    key:'finalState',
    default: false,
})

export const imgState=atom({ 
    key:'imgState',
    default: {id:null,imgUrl:null,text:""},
})

export const fileState=atom({ 
    key:'fileState',
    default: {id:null,title:null},
})

