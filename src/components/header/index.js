import {Link} from '/components/router'
import {store} from '/store'
import {url} from '/utils/url'

export const Header = ({}) => {
  const [token] = store.use(['token'])
  const [me] = store.useRequest(token && url('api.me'))
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link name='home' class='navbar-brand'>conduit</Link>

        {!token &&
          <ul className='nav navbar-nav pull-xs-right'>
            <li className='nav-item'>
              <Link activeClass name='home' className='nav-link'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link activeClass name='login' className='nav-link'>
                Sign in
              </Link>
            </li>
            <li className='nav-item'>
              <Link activeClass name='register' className='nav-link'>
                Sign up
              </Link>
            </li>
          </ul>
        }
        {me &&
          <ul className='nav navbar-nav pull-xs-right'>
            <li className='nav-item'>
              <Link name='home' className='nav-link'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link name='editor' className='nav-link'>
                <i className='ion-compose'></i>&nbsp;New Post
              </Link>
            </li>
            <li className='nav-item'>
              <Link name='settings' className='nav-link'>
              <i className='ion-gear-a'></i>&nbsp;Settings
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                name='profile'
                args={{username: `@${me.username}`}}
                className='nav-link'>
                <img src={me.image} className='user-pic' alt={me.username} />
                {me.username}
              </Link>
            </li>
          </ul>
        }
      </div>
    </nav>
  )
}


