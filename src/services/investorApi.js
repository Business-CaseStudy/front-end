import axios from 'axios';

const investorApi = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
      },
});
export const getInvestor = () => investorApi.get('/investor/api/investors/');
export const createInvestor = (data) => investorApi.post('/investor/api/investors/', data);
export default investorApi;