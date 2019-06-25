import axios from 'axios';

import { BACKEND_WEB_URL } from '@/constants/backend';

async function fetchRooms() {
  const { data: { data } } = await axios.get(`${BACKEND_WEB_URL}/api/rooms`);

  return data;
}

async function fetchRoomByLink(link) {
  const { data: { data } } = await axios.get(`${BACKEND_WEB_URL}/api/rooms/${link}`);

  return data;
}

async function fetchMessagesInRoom(roomId) {
  const { data: { data } } = await axios.get(`${BACKEND_WEB_URL}/api/rooms/${roomId}/messages`);

  return data;
}

async function createNewRoom(room) {
  return axios.post(`${BACKEND_WEB_URL}/api/rooms`, room);
}

export {
  fetchRooms,
  fetchRoomByLink,
  fetchMessagesInRoom,
  createNewRoom,
};
