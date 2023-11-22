import axios from 'axios';

const client = axios.create({
  baseURL: "http://192.168.100.21:3000", //Cambia la ip
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

export default client;