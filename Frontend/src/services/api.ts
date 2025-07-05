import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const uploadManga = (data: {
  title: string;
  description: string;
  coverUrl?: string;
}) => api.post('/manga', data);

export const fetchManga = () => api.get('/manga');
export const fetchGenres = () => api.get('/genres');
export const fetchMangaById = (id: string) => api.get(`/manga/${id}`);
export const fetchChapters = (mangaId: number) => api.get(`/chapter/list/${mangaId}`);
export default api;
