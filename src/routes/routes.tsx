import LoginPage from 'pages/Login'
import RegisterPage from 'pages/Register'
import DashboardPage from 'pages/Dashboard'
import HomePage from 'pages/Home'

const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]

const privateRoutes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]

export const routes = { publicRoutes, privateRoutes }
