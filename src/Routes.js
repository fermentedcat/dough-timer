import { useRoutes } from 'react-router-dom'
import Button from './components/Button/Button'
import Link from './components/Link/Link'


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
        <div>
          <h1>Bake</h1>
          <Link to="/" type="button">Home</Link>
          <Link to="/settings" type="button">Settings</Link>
          <Button>Start timer</Button>
        </div>
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