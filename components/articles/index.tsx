import ArticleService from "../../service/article";
import {useEffect, useState} from "react";
import {ArticleCard} from "../articleCard/ArticleCard";
import {TagService} from "../../service/tag";
import {TagList} from "../tagList";
import {ArticleInterface} from "../../interfaces/article.interface";

export const Articles = (): JSX.Element => {
  const articleService = new ArticleService();
  const [articles, setArticles] = useState<ArticleInterface[] | []>([]);
  const [tag, setTag] = useState<string | null>(null);
  const [feedIsActive, setFeedIsActive] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  

  const getArticleList = (params: string[]): void => {
    articleService.getArticleList(params)
      .then(articleList => setArticles(articleList))
      .then(() => setFeedIsActive(false))
      .catch(e => {
        throw new Error(e)
      });
  };

  const setArticleByTag = (e: MouseEvent, tag: string) => {
    e.preventDefault();
    setTag(tag);
    setFeedIsActive(false);
    
    articleService.getArticleList({tag})
      .then(articleList => setArticles(articleList))
      .catch((e) => {
        throw new Error(e)
      });
  }

  const setArticlesFeed = () => {
    articleService.getArticleFeed([])
      .then((articleList) => setArticles(articleList))
      .then(() => setFeedIsActive(true))
      .catch((e) => console.log(e))
  };

  useEffect(() => {
    if (process.browser) {
      const user = JSON.parse(localStorage.getItem('user'));
  
      user?.token ? setIsAuthorized(true) : false;
    }

    getArticleList([]);
  }, []);

  return (
    <div className="row">

      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            {isAuthorized && 
            <li className="nav-item">
             <span onClick={() => {setArticlesFeed()}} className={feedIsActive ? 'nav-link active' : 'nav-link'} >Your Feed</span>
            </li>
          }
            <li className="nav-item">
              <span onClick={(e) => {getArticleList([])}} className={!feedIsActive ? 'nav-link active' : 'nav-link'}>{tag ? `#${tag}` : 'Global Feed'}</span>
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