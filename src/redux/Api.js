import axios from 'axios';

axios.defaults.baseURL = 'https://api.chucknorris.io';

export const getChuckNorrisRes = async () => {
  const response = await axios.get(`/jokes/random`);
  return response.data;
};
