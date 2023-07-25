import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import './index.css';
import Details from './pages/Details';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Provider store={store}>
      <App />
    </Provider>,
    errorElement: <ErrorPage />,
  },
  {
    path: 'details/:pokemonId',
    element: <Details />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);