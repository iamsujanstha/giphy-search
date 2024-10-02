import GifDetailView from '@/pages/gif-detail-view/GifDetailView';
import HomePage from '@/pages/homepage/HomePage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/gifs/:slug',
    element: <GifDetailView />,
  },
  {
    path: '*',
    element: <p>Not found</p>,
  },
]);

export default router;
