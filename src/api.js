// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/items'; // Adjust the URL if your server is hosted elsewhere

export const getItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createItem = async (item) => {
    const response = await axios.post(API_URL, item);
    return response.data;
};

export const getItemById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateItem = async (id, item) => {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
};

export const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};