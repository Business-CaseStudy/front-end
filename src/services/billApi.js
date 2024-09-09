import axios from 'axios';

const billApi = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
      },
});
export const generatebill = (investor_id, data) => 
    billApi.post(`/bill/generate-bill/${investor_id}/`, data);
export const getBillDetails= (investor_id) => billApi.get(`/bill/investor/${investor_id}/bills/`);
export const groupBills= () => billApi.get('/bill/group-bills/');
export const validateBill = (data) => 
    billApi.post('/bill/validate-bill/', data);
export default billApi;