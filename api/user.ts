import axios, {AxiosResponse} from "axios";
import {SERVER_BASE_URL} from "../usils/constant"

const UserAPI = {
  current: async () => {
    const user: any = window.localStorage.getItem("user");
    const token = user?.token;
    try {
      const response = await axios.get(`/user`, {
        headers: {
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      });
      console.log('get res', response)
      return response;
    } catch (error) {
      return error.response;
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
      localStorage.setItem("user", response.data.user.token);

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
      localStorage.setItem('token', response.data.user.token);
      return response.data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  },
  save: async (user:any) => {
    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/user`,
        JSON.stringify({user}),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('update', response)
      return response;
    } catch (error) {
      return error.response;
    }
  },
  follow: async (username: string) => {
    const user: any = JSON.parse(window.localStorage.getItem("user"));
    const token = user?.token;
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/profiles/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      );
      console.log('follow', response)
      return response;
    } catch (error) {
      return error.response;
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
  get: async (username: string) => axios.get(`${SERVER_BASE_URL}/profiles/${username}`),
};

export default UserAPI;