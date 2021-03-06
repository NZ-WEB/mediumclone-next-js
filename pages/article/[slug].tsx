import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArticleInterface } from "../../interfaces/article.interface";
import {withLayout} from "../../layout/Layout";
import ArticleService from "../../service/article";
import { getFormateDate } from "../../usils/helpers";

const Article = (): JSX.Element => {
    const articleService = new ArticleService();
    const [article, setArticle] = useState<ArticleInterface>({});
    const router = useRouter();
    const { slug } = router.query;

    const likeArticle = () => {
        articleService.likeArticle(slug)
          .then((newArticle) => setArticle(newArticle))
          .catch((e) => console.log(e))
    };

    useEffect(() => {
        if (slug) {
            articleService.getArticleBySlug(slug)
              .then((article) => setArticle(article))
              .catch((e) => console.log(e));
        }
    }, [slug]);

    return (
        <div className="article-page">

            <div className="banner">
                <div className="container">

                    <h1>{article.title}</h1>

                    <div className="article-meta">
                        <a href=""><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
                        <div className="info">
                            <span className="author">
                                {/* <Link href={`/profile/${article.author.username}`}>
                                    {article.author.username}
                                </Link> */}
                                {article.author && 
                                    <Link href={`/profile/${article.author.username}`}>
                                        {article.author.username}
                                    </Link> 
                                }
                            </span>
                            <span className="date">{getFormateDate(article.createdAt)}</span>
                        </div>
                        <button 
                            className="btn btn-sm btn-outline-secondary"
                        >
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            Follow {article.author && article.author.username} <span className="counter">({article.favoritesCount})</span>
                        </button>
                        &nbsp;&nbsp;
                            
                        <button onClick={() => likeArticle()} className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            Favorite Post <span className="counter">({article.favoritesCount})</span>
                        </button>
                    </div>

                </div>
            </div>

            <div className="container page">

                <div className="row article-content">
                    <div className="col-md-12">
                        <p>
                            {article.description}
                        </p>
                        <h2 id="introducing-ionic">{article.title}</h2>
                        <p>{article.body}</p>
                    </div>
                </div>

                <hr/>
{/* 
                <div className="article-actions">
                    <div className="article-meta">
                        <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
                        <div className="info">
                            <a href="" className="author">Eric Simons</a>
                            <span className="date">January 20th</span>
                        </div>

                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            Follow Eric Simons
                        </button>
                        &nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            Favorite Post <span className="counter">(29)</span>
                        </button>
                    </div>
                </div>

                <div className="row">

                    <div className="col-xs-12 col-md-8 offset-md-2">

                        <form className="card comment-form">
                            <div className="card-block">
                                <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                            </div>
                            <div className="card-footer">
                                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>
                                <button className="btn btn-sm btn-primary">
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        <div className="card">
                            <div className="card-block">
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                            </div>
                            <div className="card-footer">
                                <a href="" className="comment-author">
                                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>
                                </a>
                                &nbsp;
                                <a href="" className="comment-author">Jacob Schmidt</a>
                                <span className="date-posted">Dec 29th</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-block">
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                            </div>
                            <div className="card-footer">
                                <a href="" className="comment-author">
                                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>
                                </a>
                                &nbsp;
                                <a href="" className="comment-author">Jacob Schmidt</a>
                                <span className="date-posted">Dec 29th</span>
                                <span className="mod-options">
                                  <i className="ion-edit"></i>
                                  <i className="ion-trash-a"></i>
                                </span>
                            </div>
                        </div>

                    </div>

                </div> */}

            </div>

        </div>
    );
};

export default withLayout(Article);
