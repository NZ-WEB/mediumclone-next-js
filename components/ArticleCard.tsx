import {ArticleInterface} from "../interfaces/article.interface";
import Link from 'next/link';
import {data} from "browserslist";

export const ArticleCard = (article): JSX.Element => {

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

  const getFormateDate = (date) => {
    const curDate = new Date(date);
    const months = ['Jan', 'Feb', 'Mach', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep','Oct', 'Nov'];
    return months[curDate.getMonth()] + ' ' + (curDate.getDate()) + 'th';
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link href={`/profile`}>
          {author.image ? <img src={author.image}/> : <a href="" className="author"> profile </a>}
        </Link>
        <div className="info">
          <a href="" className="author"> {author.username} </a>
          <span className="date">{ getFormateDate(createdAt) }</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <a href="" className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <Link href={'/article'}>
          <span>Read more...</span>
        </Link>
      </a>
    </div>
  )
};