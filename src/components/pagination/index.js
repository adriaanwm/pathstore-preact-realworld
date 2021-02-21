import {store} from '/store'

const makeRange = (from, to) =>
  Array(to - from + 1).fill(0).map((_, i) => i + from)


export const Pagination = ({url, count}) => {
  const [limit] = store.use(['queries', 'limit'], 10)
  const [offset] = store.use(['queries', 'offset'], 0)
  const currentPage = Math.floor(offset / limit) + 1
  const pages = Math.ceil(count / limit)
  const range = makeRange(1, pages)
  return (
    <nav>
      <ul className='pagination'>
        {
          range.map(p =>
            <li
              className={ p === currentPage ? 'page-item active' : 'page-item' }
              onClick={(ev) => {
                ev.preventDefault()
                store.set(['queries', 'offset'], (p - 1) * limit)
              }}
              key={p.toString()}
            >
              <a className='page-link' href=''>{p}</a>
            </li>
          )
        }
      </ul>
    </nav>
  )
}
