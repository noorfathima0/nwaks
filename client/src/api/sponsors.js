import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api/sponsors"
})

export const getSponsors = () => API.get("/")

export const createSponsor = (data, token) =>
  API.post("/", data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const updateSponsor = (id, data, token) =>
  API.put(`/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteSponsor = (id, token) =>
  API.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const getSponsorById = (id) =>
  API.get(`/${id}`)