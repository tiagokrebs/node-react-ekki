import axios from 'axios';

// instância de HTTP client para API backend v1
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/'
});

export default instance;