import marked from 'marked'
import {store} from '/store'
import {url} from '/utils/url'
import {Link} from '/components/router'
import {ArticleActions} from '/components/article-actions'
import {Comments} from '/components/comments'

export const Article = () => {
  const [slug] = store.use(['route', 'args', 'slug'])
  const [{user: me} = {}] = store.useRequest(url('api.me'))
  const [{article} = {}] = store.useRequest(url('api.article', {args: {slug}}))
  const [{comments} = {}] = store.useRequest(url('api.articleComments', {args: {slug}}))
  const canModify = false
  if (!article || !comments || !me) return 'Loading ...'
  return (
    <div className='article-page'>

      <div className='banner'>
        <div className='container'>

          <h1>{article.title}</h1>
          <div className='article-meta'>
            <Link name='user' args={{username: article.author.username}}>
              <img src={article.author.image} alt={article.author.username} />
            </Link>

            <div className='info'>
              <Link name='user' args={{username: article.author.username}} className='author'>
                {article.author.username}
              </Link>
              <span className='date'>
                {new Date(article.createdAt).toDateString()}
              </span>
            </div>

            {me.username === article.author.username && <ArticleActions article={article} />}
          </div>
        </div>
      </div>

      <div className='container page'>

        <div className='row article-content'>
          <div className='col-xs-12'>

            <div dangerouslySetInnerHTML={{ __html: marked(article.body) }}></div>

            <ul className='tag-list'>
              {
                article.tagList.map(tag => {
                  return (
                    <li
                      className='tag-default tag-pill tag-outline'
                      key={tag}>
                      {tag}
                    </li>
                  );
                })
              }
            </ul>

          </div>
        </div>

        <hr />

        <div className='article-actions'>
        </div>

        <div className='row'>
          <Comments comments={comments} me={me} slug={slug} />
          {/* <CommentContainer */}
          {/*   comments={comments || []} */}
          {/*   errors={commentErrors} */}
          {/*   slug={match.params.id} */}
          {/*   currentUser={currentUser} /> */}
        </div>
      </div>
    </div>
  )
}
