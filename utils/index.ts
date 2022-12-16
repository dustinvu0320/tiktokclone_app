import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Create a user if it doesn't exist or fetch user if exists
export const createOrGetUser = async (response: any, addUser: any) => {
  // Get name, picture, and unique identifier sub from user
  const decoded: {name: string, picture:string, sub:string} = jwt_decode(response.credential);

  const {name, picture, sub} = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }

  addUser(user);
  
  // Pass user data
  await axios.post(`${BASE_URL}/api/auth`, user);
};