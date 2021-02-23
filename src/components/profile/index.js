import {useEffect} from 'preact/hooks'
import {store} from '/store'
import {url} from '/utils/url'
import {Articles} from '/components/articles'
import {Link} from '/components/router'

export const Profile = () => {
  const [routeDef] = store.use(['route', 'definition'])
  const isFavorites = routeDef.includes('/favorites')
  const [usernameWithAt] = store.use(['route', 'args', 'username'])
  const username = usernameWithAt.slice(1)
  const [profile] = store.useRequest(
    url('api.profile', {args: {username}})
  )
  useEffect(() => {
    store.set(
      ['articlesUrl'], 
      isFavorites
      ? {name: 'api.articles', queries: {limit: 5, offset: 0, favorited: username}}
      : {name: 'api.articles', queries: {limit: 5, offset: 0, author: username}}
    )
  }, [isFavorites, username])
  if (!profile) return null
  return (
    <div className='profile-page'>

      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>

              <img src={profile.image} className='user-img' alt={profile.username} />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              {/* <EditProfileSettings isUser={isUser} /> */}
              {/* <FollowUserButton */}
              {/*   isUser={isUser} */}
              {/*   user={profile} */}
              {/*   follow={this.props.onFollow} */}
              {/*   unfollow={this.props.onUnfollow} */}
              {/*   /> */}

            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>

          <div className='col-xs-12 col-md-10 offset-md-1'>

            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <Link
                    className={`nav-link ${!isFavorites ? 'active' : ''}`}
                    name={'profile'}
                    args={{username: `@${profile.username}`}} >
                    My Articles
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link
                    className={`nav-link ${isFavorites ? 'active' : ''}`}
                    name='profileFavorites'
                    args={{username: `@${profile.username}`}} >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <Articles />

          </div>

        </div>
      </div>

    </div>
  )
}
