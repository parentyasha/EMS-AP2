import axios from 'axios';

const api = axios.create({
    baseURL: 'https://topicos-backend.herokuapp.com'
});

export default api;

// https://topicos-backend.herokuapp.com
// http://localhost:1512