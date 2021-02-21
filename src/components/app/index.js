import {url} from '/utils/url'
import {Header} from '/components/header'
import {Router} from '/components/router'
import {Home} from '/components/home'
import {Login} from '/components/login'
import {Register} from '/components/register'
import {Editor} from '/components/editor'

const routes = [
  [url('home'), Home],
  [url('login'), Login],
  [url('register'), Register],
  [url('editor'), Editor],
]

export const App = () =>
  <div>
    <Header />
    <Router routes={routes} />
  </div>
