import {url} from '/utils/url'
import {Header} from '/components/header'
import {Router} from '/components/router'
import {Home} from '/components/home'
import {Login} from '/components/login'
import {Register} from '/components/register'
import {Editor} from '/components/editor'
import {Article} from '/components/article'
import {Settings} from '/components/settings'
import {Profile} from '/components/profile'

const routes = [
  [url('home'), Home],
  [url('login'), Login],
  [url('register'), Register],
  [url('editor'), Editor],
  [url('article'), Article],
  [url('settings'), Settings],
  [url('profile'), Profile],
  [url('profileFavorites'), Profile],
]

export const App = () =>
  <div>
    <Header />
    <Router routes={routes} />
  </div>
