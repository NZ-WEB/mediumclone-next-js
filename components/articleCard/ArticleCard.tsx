import {ArticleInterface} from "../../interfaces/article.interface";
import Link from 'next/link';
import {data} from "browserslist";
import { getFormateDate } from "../../usils/helpers";
import { useRouter } from "next/router";

export const ArticleCard = (article): JSX.Element => {

  const router = useRouter();

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
  } = article.article;

  

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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
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