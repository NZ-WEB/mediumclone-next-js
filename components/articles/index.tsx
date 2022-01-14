import ArticleService from "../../service/article";
import {useEffect, useState} from "react";
import {ArticleCard} from "../ArticleCard";
import {TagService} from "../../service/tag";
import {TagList} from "../tagList";
import {ArticleInterface} from "../../interfaces/article.interface";

export const Articles = (): JSX.Element => {
  const articleService = new ArticleService();
  const [articles, setArticles] = useState<ArticleInterface[] | []>([]);
  const [tag, setTag] = useState<string | null>(null);

  const getArticleList = (params: string[]): void => {
    articleService.getArticleList(params)
      .then(articleList => setArticles(articleList))
      .catch(e => {
        throw new Error(e)
      });
  };

  const setArticleByTag = (e: MouseEvent, tag: string) => {
    e.preventDefault();
    setTag(tag);
    articleService.getArticleList({tag})
      .then(articleList => setArticles(articleList))
      .catch((e) => {
        throw new Error(e)
      });
  }

  useEffect(() => {
    getArticleList([]);
  }, []);

  return (
    <div className="row">

      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            <li className="nav-item">
              <a className="nav-link disabled" href="">Your Feed</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="">{tag ? `#${tag}` : 'Global Feed'}</a>
            </li>
          </ul>
        </div>
        {/*Articles Start*/}
        {articles.length > 0
          ?
          articles.map((article) => (
            <div key={Math.random()}>
              <ArticleCard article={article}/>
            </div>
          ))
          :
          (<p style={{margin: "17px"}}>Found nothing</p>)
        }
        {/*  Articles End*/}
      </div>

      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>

          <TagList setArticleByTag={(e, tag) => setArticleByTag(e, tag)}/>
        </div>
      </div>

    </div>
  )
}