import axios, {AxiosResponse} from "axios";
import {SERVER_BASE_URL} from "../usils/constant"

const UserAPI = {
  current: async () => {
    const user: any = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/user`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log('get res', response);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message) ;
    }
  },
  login: async (email:string , password: string) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users/login`,
        JSON.stringify({user: {email, password}}),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data.user;
    } catch (error) {
      throw error.response.data.message;
      //return error.response.data.message;
    }
  },
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users`,
        JSON.stringify({user: {username, email, password}}),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  },
  save: async (user: any) => {
    const userLS: any = JSON.parse(localStorage.getItem("user"));
    const token = userLS?.token;

    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/user`,
        JSON.stringify({user}),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${encodeURIComponent(token)}`
          },
        }
      );
      console.log('update', response)
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  follow: async (username: string) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/profile/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      );
      return response;
    } catch (error) {
     throw new Error(error.response.data.message);
    }
  },
  unfollow: async (username: string) => {
    const user: any = JSON.parse(window.localStorage.getItem("user"));
    const token = user?.token;
    try {
      return await axios.delete(
        `${SERVER_BASE_URL}/profiles/${username}/follow`,
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      );
    } catch (error) {
      return error.response;
    }
  },
  get: async (username: string) => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/profile/${username}`);
      return await res.data.profile;
    } catch (e) {
      throw new Error(e)
    }
  },
};

export default UserAPI;
