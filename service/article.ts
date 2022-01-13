import axios, {AxiosResponse} from "axios";
import {SERVER_BASE_URL} from "../usils/constant";

export default class ArticleService {
  constructor() {}

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
}