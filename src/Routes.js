import { useRoutes } from 'react-router-dom'


const Routes = () => {
  let routes = useRoutes([
    {
      path: '/',
      element: (
        <div>
          <h1>Home</h1>
        </div>
      ),
    },
    {
      path: '/bake',
      element: (
        <div>
          <h1>Bake</h1>
          <p>Start timer</p>
        </div>
      ),
    },
    {
      path: '/settings',
      element: (
        <div>
          <h1>Settings</h1>
        </div>
      ),
    }
  ])

  return routes
}

export default Routes