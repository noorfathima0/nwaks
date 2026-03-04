import axios from "axios"

const API = axios.create({
  baseURL:"http://localhost:5000/api/advertisements"
})

export const getAdvertisements = () => API.get("/")

export const getAllAdvertisements = () => API.get("/admin")

export const createAdvertisement = (data,token)=>
  API.post("/",data,{
    headers:{Authorization:`Bearer ${token}`}
  })

export const updateAdvertisement = (id,data,token)=>
  API.put(`/${id}`,data,{
    headers:{Authorization:`Bearer ${token}`}
  })

export const deleteAdvertisement = (id,token)=>
  API.delete(`/${id}`,{
    headers:{Authorization:`Bearer ${token}`}
  })

export const getAdvertisementById = (id)=>
  API.get(`/${id}`)