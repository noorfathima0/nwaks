import axios from "axios"

const API = "http://localhost:5000/api/events"

export const getUpcomingEvents = () => axios.get(`${API}/upcoming`)

export const getPastEvents = () => axios.get(`${API}/past`)