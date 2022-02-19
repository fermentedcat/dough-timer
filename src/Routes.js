import { useRoutes } from 'react-router-dom'
import Link from './components/Link/Link'
import Bake from './views/Bake/Bake'


const Routes = () => {
  let routes = useRoutes([
    {
      path: '/',
      element: (
        <div>
          <h1>Home</h1>
          <Link to="/settings" type="button">Settings</Link>
          <Link to="/bake" type="button">Bake</Link>
        </div>
      ),
    },
    {
      path: '/bake',
      element: (
        <Bake />
      ),
    },
    {
      path: '/settings',
      element: (
        <div>
          <h1>Settings</h1>
          <Link to="/" type="button">Home</Link>
          <Link to="/bake" type="button">Bake</Link>
        </div>
      ),
    }
  ])

  return routes
}

export default Routes