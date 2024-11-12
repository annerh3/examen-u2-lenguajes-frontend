import axios from "axios";
const API_URL = 'https://localhost:7166/api';
const journalizeApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
}); 


export {
    journalizeApi,
    API_URL
}