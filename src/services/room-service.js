import axios from 'axios';

import { BACKEND_URL } from '@/constants/backend';

async function fetchRooms() {
  const { data: { data } } = await axios.get(`${BACKEND_URL}/api/rooms`);

  return data;
}

async function createNewRoom(room) {
  return axios.post(`${BACKEND_URL}/api/rooms`, room);
}

export {
  fetchRooms,
  createNewRoom,
};
