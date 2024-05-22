import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import './index.css'

function Main() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            // console.log('Service Worker registered');
          })
          .catch((error) => {
            // console.log('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    // <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    // </React.StrictMode>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(<Main />);