import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../app/App';
import ContactDetails from '../screens/ContactDetails/ContactDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/contact/:contactId',
    element: <ContactDetails />,
  },
]);

export default router;
