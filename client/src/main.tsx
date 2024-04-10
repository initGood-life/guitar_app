import '@/index.css';
import 'swiper/css/bundle';

import { ThemeProvider } from '@material-tailwind/react';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import SetRoutes from '@/Routes';
import store, { persistor } from '@/store/store';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <Router>
              <SetRoutes />
            </Router>
          </CookiesProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
