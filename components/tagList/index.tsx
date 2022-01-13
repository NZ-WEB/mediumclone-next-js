import {TagService} from "../../service/tag";
import {useEffect, useState} from "react";
import ArticleService from "../../service/article";

export const TagList = ({ setArticleByTag }: Function):JSX.Element => {
  const tagService = new TagService();
  const [tags, setTags] = useState([]);

  const getTags = () => {
    tagService.getTagList()
      .then(tagList => setTags(tagList))
      .catch(e => {throw new Error(e)})
  };

  useEffect(() => {
    getTags();
  },[]);


  return (
    <div className="tag-list">
      {tags && tags.map((tag) => <a key={tag} onClick={(e) => setArticleByTag(e, tag)} className="tag-pill tag-default">{tag}</a>)}
    </div>
  )
};