import axios, {AxiosResponse} from "axios";
import {SERVER_BASE_URL} from "../usils/constant";

export default class ArticleService {
  constructor() {
  }

  async getArticleList(params: Object | string[]): Promise<AxiosResponse> {
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/articles`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: params
        }
      );
      console.log(response.data.articles, 'article list response')

      return response.data.articles;
    } catch (error) {
      throw error.response;
      //return error.response.data.message;
    }
  }

  async createArtile(data: Object): Promise<AxiosResponse> {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      console.log(token,'token');

      const body = JSON.stringify({
        article: data
      })

      const response = await axios.post(
        `${SERVER_BASE_URL}/articles`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
        }
      );
      console.log(response, 'article list response')

      return response;
    } catch (error) {
      throw error.response;
      //return error.response.data.message;
    }
  }
}