import axios from "axios"

const API = axios.create({
baseURL:"http://localhost:5000/api/media"
})

export const getMedia = ()=>API.get("/")

export const getMediaById = (id)=>API.get(`/${id}`)

export const createMedia = (data,token)=>
API.post("/",data,{
headers:{Authorization:`Bearer ${token}`}
})

export const updateMedia = (id,data,token)=>
API.put(`/${id}`,data,{
headers:{Authorization:`Bearer ${token}`}
})

export const deleteMedia = (id,token)=>
API.delete(`/${id}`,{
headers:{Authorization:`Bearer ${token}`}
})