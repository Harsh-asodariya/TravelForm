import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://santa-banta-travels-default-rtdb.firebaseio.com/'
})

export default instance;