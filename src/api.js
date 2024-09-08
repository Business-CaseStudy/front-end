import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
      },
});

export const createInvestor = (data) => api.post('/investor/api/investors/', data);
export const generatebill = (investor_id, data) => 
    api.post(`/bill/generate-bill/${investor_id}/`, data);
export const generateCapitalcall=(investor_id,data)=> api.post(`/capitalcall/generate-capital-call/${investor_id}/`,data);
export default api;
