import{
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage';
import ArticlesList from './pages/ArticlesListPage';
import AboutPage from './pages/AboutPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [{
    path: '/',
    element: <HomePage />
  }, {
    path: '/about',
    element: <AboutPage />
  }, {
    path: '/articles/:name',
    element: <ArticlePage />
  }, {
    path: '/articles',
    element: <ArticlesList />
  }] 

}]


const router = createBrowserRouter(routes);


function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App
