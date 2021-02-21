import {store} from '/store'
import {url} from '/utils/url'
import {Link} from '/components/router'
import {Pagination} from '/components/pagination'

const ArticlePreview = ({
  article: {
    author,
    tagList,
    createdAt,
    favorited,
    favoritesCount,
    slug,
    title,
    description
  }
}) =>
  <div className='article-preview'>
    <div className='article-meta'>
      <Link name='user' args={{username: `@${author.username}`}} >
        <img src={author.image} alt={author.username} />
      </Link>

      <div className='info'>
        <Link className='author' name='user' args={{username: `/@${author.username}`}}>
          {author.username}
        </Link>
        <span className='date'>
          {new Date(createdAt).toDateString()}
        </span>
      </div>

      <div className='pull-xs-right'>
        <button className={`btn btn-sm ${favorited ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => {}}>
          <i className='ion-heart'></i> {favoritesCount}
        </button>
      </div>
    </div>

    <Link name='article' args={{slug}} className='preview-link'>
      <h1>{title}</h1>
      <p>{description}</p>
      <span>Read more...</span>
      <ul className='tag-list'>
        {
          tagList.map(tag => {
            return (
              <li className='tag-default tag-pill tag-outline' key={tag}>
                {tag}
              </li>
            )
          })
        }
      </ul>
    </Link>
  </div>


export const Articles = () => {
  const [articleUrlName] = store.use(['articleUrlName'], 'api.articles')
  const [queries] = store.use(['queries'], {offset: 0, limit: 10})
  const articlesUrl = url(articleUrlName, {queries})
  const [{articles, articlesCount} = {}] = store.useRequest(articlesUrl)
  return (
    !articles ? <div className='article-preview'>Loading...</div>
    : !articles.length ? (
      <div className='article-preview'>
        No articles are here... yet.
      </div>
    )
    : (
      <div>
        {
          articles.map(article =>
              <ArticlePreview article={article} key={article.slug} />
          )
        }
        <Pagination url={articlesUrl} count={articlesCount} />

      </div>
    )
  )
}

        // <ListPagination
        //   pager={props.pager}
        //   articlesCount={props.articlesCount}
        //   currentPage={props.currentPage} />
