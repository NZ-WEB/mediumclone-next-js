import axios from "axios";
import {SERVER_BASE_URL} from "../usils/constant";

export class TagService {
  async getTagList() {
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/tags`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.tags, 'tag list response')

      return response.data.tags;
    } catch (error) {
      throw error.response;
      //return error.response.data.message;
    }
  }
}