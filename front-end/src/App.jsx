import{
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ArticlePage, { loader as articleLoader } from './pages/ArticlePage';
import ArticlesList from './pages/ArticlesListPage';
import AboutPage from './pages/AboutPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';

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
    element: <ArticlePage />,
    loader: articleLoader,
  }, {
    path: '/articles/:name', // -> /articles/learn-react
    element: <ArticlePage />,
    loader: async function() {
      const response = await axios.get('/api/articles/learn-node');
      const { upvotes, comments } = response.data;
      return { upvotes, comments };
    }
  }]
}];


const router = createBrowserRouter(routes);


function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App
