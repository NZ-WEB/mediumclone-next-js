import {UserInterface} from "./user.interface";

export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ArticleInterface {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}