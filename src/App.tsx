import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { routes } from 'routes'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider, AuthService } from 'utils'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export interface IRoute {
  path: string
  element: React.ReactNode
}

const App = () => {
  const { publicRoutes, privateRoutes } = routes
  const AuthRoute = (props: { children: React.ReactNode }) => {
    return AuthService.isAuthenticated() ? <>{props.children}</> : <Navigate to='/login' />
  }

  const renderRoutes = () => (
    <>
      <Routes>
        {publicRoutes.map((route: IRoute) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              ['/login', '/register'].includes(route.path) && AuthService.isAuthenticated() ? <Navigate to='/dashboard' /> : route.element
            }
          />
        ))}

        {privateRoutes.map((route: IRoute) => (
          <Route key={route.path} path={route.path} element={<AuthRoute>{route.element}</AuthRoute>} />
        ))}
      </Routes>
    </>
  )

  return (
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
        {renderRoutes()}
        <ToastContainer pauseOnFocusLoss={false} autoClose={3000} draggable={false} />
      </DndProvider>
    </AuthProvider>
  )
}

export default App
