import {ArticleInterface} from "../../interfaces/article.interface";
import Link from 'next/link';
import {data} from "browserslist";
import { getFormateDate } from "../../usils/helpers";
import { useRouter } from "next/router";
import ArticleService from "../../service/article";
import { useEffect, useState } from "react";

export const ArticleCard = (articleProp): JSX.Element => {
  const articleService = new ArticleService();
  const router = useRouter();
  const [article, setArticle] = useState<ArticleInterface>(articleProp.article);
  const [liked, setLiked] = useState<boolean>(false);

  console.log(!!articleProp.article.favoritesCount, 'count');
  

  const {
    slug,
    title,
    description,
    body,
    createdAt,
    favorited,
    favoritesCount,
    tagList,
    updatedAt,
    author
  } = article;

  const likeArticle = (slug: string): void => {
    if (liked) {
      articleService.unlikeArticle(slug)
        .then((newArticle) => setArticle(newArticle))
        .then(() => setLiked(false))
        .catch((e) => console.log(e))
    } else {
      articleService.likeArticle(slug)
      .then(newArticle => setArticle(newArticle))
      .then(newArticle => setLiked(true))
      .catch((e) => console.log(e));
    }
  };

  useEffect(() => {

  }, [favoritesCount]);


  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link href={`/profile/${author.username}`}>
          {author.image ? <img src={author.image}/> : <a href="" className="author"> profile </a>}
        </Link>
        <div className="info">
          <Link href={`/profile/${author.username}`}>
            <a href="" className="author"> {author.username} </a>
          </Link>
          <span className="date">{ getFormateDate(createdAt) }</span>
        </div>
        <button onClick={() => likeArticle(slug)} className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <span className="preview-link">
          <h1>{title}</h1>
          <p>{description}</p>
          <Link href={`/article/${slug}`}>
            <span style={{cursor: "pointer"}} >Read more...</span>
          </Link>
      </span>
    </div>
  )
};