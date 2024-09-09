import axios from 'axios';

const capitalcallApi = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
      },
});

export const generateCapitalcall=(investor_id,data)=> capitalcallApi.post(`/capitalcall/generate-capital-call/${investor_id}/`,data);
export const updateCapitalcallStatus=(id,data)=> capitalcallApi.post(`/capitalcall/capitalcall/${id}/update-status/`,data);
export const getCapitalcallDetail=(id)=> capitalcallApi.get(`/capitalcall/capital-calls/${id}/`);
export default capitalcallApi;