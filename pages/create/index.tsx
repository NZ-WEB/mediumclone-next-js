import {withLayout} from "../../layout/Layout";
import withAuth from "../../HOC/withAuth";
import {useForm} from "react-hook-form";
import {FormEvent, useEffect, useState} from "react";
import {TagService} from "../../service/tag";
import ArticleService from "../../service/article";
import {useRouter} from "next/router";

const Create = (): JSX.Element => {
  const {register, handleSubmit, formState: {errors}} = useForm<{}>({});
  const [tagList, setTagList] = useState<string[]>([]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [sendingTagList, setSendingTagList] = useState<string[]>([]);
  const router = useRouter();
  const articleService = new ArticleService();
  const tagService = new TagService();

  const onSubmit = handleSubmit((data) => {
    data.tagList = sendingTagList;
    delete data.tags;
    articleService.createArtile(data);

    router.push('/')
  });

  const loadTags = () => {
    tagService.getTagList()
      .then((tagList) => setTagList(tagList))
      .catch((e) => {throw new Error(e)});
  };

  const filterTags = (tag: FormEvent<HTMLInputElement>): void => {
    setFilteredTags(tagList.filter(tagItem => tagItem.includes(tag.target.value)));
  };

  const addTagToSubmitState = (e: MouseEvent, tag) => {
    e.preventDefault();

    const arrayWithoutDuplicates = new Set([...sendingTagList, tag]);
    const newArr = [...arrayWithoutDuplicates];
    setSendingTagList(newArr);
  };

  const clearSendingTagLise = () => {
    setSendingTagList([]);
  };


  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={onSubmit}>

              <div className="tag-list" style={{margin: '5px'}}>
                Selected tags:

                {sendingTagList && sendingTagList.map(tag => (
                  <a style={{cursor: "pointer"}} key={tag} className="tag-pill tag-default">{tag}</a>
                ))
                }

                {sendingTagList.length > 0 && (
                  <span style={{cursor: "pointer"}} onClick={() => clearSendingTagLise()}>Clear</span>
                )}

              </div>

              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    {...register("title",
                      {
                        required: true,
                      })}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    {...register("description",
                      {
                        required: true,
                      })}
                  />
                </fieldset>
                <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      {...register("body",
                        {
                          required: true,
                        })}
                    />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onInput={(input: FormEvent<HTMLInputElement>) => filterTags(input)}
                    {...register("tags",)}
                  />
                  <div className="tag-list" style={{marginTop: '5px'}}>
                    {filteredTags && filteredTags.map(tag => (
                      <a style={{cursor: "pointer"}} key={tag} onClick={(e) => addTagToSubmitState(e, tag)} className="tag-pill tag-default">{tag}</a>
                    ))}
                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default withAuth(withLayout(Create));
