import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = {
  getVideos: () => axios.get(`${API_URL}/videos`),
  
  getVideo: (id) => axios.get(`${API_URL}/videos/${id}`),
  
  createVideo: (videoData) => axios.post(`${API_URL}/videos`, videoData),
  
  updateVideo: (id, videoData) => axios.put(`${API_URL}/videos/${id}`, videoData),
  
  deleteVideo: (id) => axios.delete(`${API_URL}/videos/${id}`),
  
  getCategories: () => axios.get(`${API_URL}/categories`)
};